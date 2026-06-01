/* =============================================================================
   TreeDiagram.js — draws the realistic SVG tree and handles the three zoom
   levels (whole tree -> branch -> leaf cluster).

   YOU SHOULD NOT NEED TO EDIT THIS FILE TO CHANGE CONTENT.
   All titles, definitions, clusters and evidence come from js/data.js.

   If you want to move a branch or change the look of the tree, the geometry
   knobs are in the CONFIG block just below.
   ============================================================================= */

const SVGNS = "http://www.w3.org/2000/svg";

/* ----------------------------- CONFIG (geometry) ---------------------------- */
// The drawing happens inside a 1000 x 1000 coordinate box (the SVG viewBox).
const VIEW = 1000;
const CENTER = VIEW / 2;

// How far the "camera" zooms in for each level.
const BRANCH_ZOOM = 2.15;
const CLUSTER_ZOOM = 4.6;

// Where each branch starts (on the trunk) and where its tip reaches (canopy).
// `bow` curves the branch; positive/negative just flips the curve direction.
// Drawing order here = the order of the five branches in data.js.
const BRANCH_ORDER = ["study", "discipline", "escape", "community", "individuality"];
const BRANCH_LAYOUT = {
  study:        { origin: { x: 472, y: 470 }, tip: { x: 232, y: 300 }, bow:  46, width: 22 },
  discipline:   { origin: { x: 468, y: 542 }, tip: { x: 292, y: 548 }, bow:  60, width: 26 },
  escape:       { origin: { x: 498, y: 418 }, tip: { x: 372, y: 162 }, bow: -34, width: 20 },
  community:    { origin: { x: 528, y: 452 }, tip: { x: 648, y: 196 }, bow:  40, width: 22 },
  individuality:{ origin: { x: 534, y: 520 }, tip: { x: 772, y: 360 }, bow: -54, width: 24 }
};

const CLUSTER_GAP = 62;   // spacing between clusters near a branch tip
const CLUSTER_R   = 30;   // visual radius of a leaf-cluster blob

/* --------------------------------- helpers ---------------------------------- */
const fmt = (n) => Math.round(n * 10) / 10;
const P = (p) => `${fmt(p.x)} ${fmt(p.y)}`;
const sub = (a, b) => ({ x: a.x - b.x, y: a.y - b.y });
const add = (a, b) => ({ x: a.x + b.x, y: a.y + b.y });
const scale = (a, s) => ({ x: a.x * s, y: a.y * s });
const len = (a) => Math.hypot(a.x, a.y) || 1;
const unit = (a) => scale(a, 1 / len(a));
const perp = (a) => ({ x: -a.y, y: a.x });

// Point on a quadratic Bezier from S (control M) to E.
function pointOnQuad(S, M, E, t) {
  const u = 1 - t;
  return {
    x: u * u * S.x + 2 * u * t * M.x + t * t * E.x,
    y: u * u * S.y + 2 * u * t * M.y + t * t * E.y
  };
}

// Tiny seeded random so the "organic" jitter is stable between page loads.
function hashStr(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Green shades for leaves/foliage so the canopy varies naturally.
const GREENS = [
  "#3f7d2e", "#4f9a37", "#5aa845", "#356e29",
  "#67b352", "#2f6b25", "#73bd5e", "#458a33"
];

// Build a namespaced SVG element with attributes (and optional children).
function el(name, attrs = {}, children = []) {
  const n = document.createElementNS(SVGNS, name);
  for (const k in attrs) n.setAttribute(k, attrs[k]);
  for (const c of children) n.appendChild(c);
  return n;
}

// A tapered, curved "ribbon" path (used for trunk, branches and roots).
// Wide (w1) at S, narrow (w2) at the tip E, curving through control M.
function taperedPath(S, M, E, w1, w2) {
  const n1 = unit(perp(sub(M, S)));
  const n2 = unit(perp(sub(E, M)));
  const nm = unit(add(n1, n2));
  const wm = (w1 + w2) / 2;
  const sL = add(S, scale(n1, w1 / 2)), sR = sub(S, scale(n1, w1 / 2));
  const eL = add(E, scale(n2, w2 / 2)), eR = sub(E, scale(n2, w2 / 2));
  const mL = add(M, scale(nm, wm / 2)), mR = sub(M, scale(nm, wm / 2));
  const tip = add(E, scale(unit(sub(E, M)), w2 * 0.6)); // gently rounded tip
  return `M ${P(sL)} Q ${P(mL)} ${P(eL)} Q ${P(tip)} ${P(eR)} Q ${P(mR)} ${P(sR)} Z`;
}

/* ============================================================================
   TreeDiagram class
   ============================================================================ */
export class TreeDiagram {
  constructor(svg, { data, callbacks = {} }) {
    this.svg = svg;
    this.data = data;
    this.cb = callbacks;

    this.level = 1;
    this.activeBranch = null;
    this.activeCluster = null;
    this.selectedEl = null;

    this.branchEls = {};   // branchId -> <g>
    this.clusterEls = {};  // clusterId -> <g>
    this.cam = { cx: CENTER, cy: CENTER, k: 1 };

    this._computeGeometry();
    this._build();
    this.focusWhole(false); // initial paint, no animation
  }

  /* -------------------- geometry: positions of everything ------------------- */
  _computeGeometry() {
    this.geo = { branches: {}, clusters: {}, leaves: {} };

    for (const id of BRANCH_ORDER) {
      const L = BRANCH_LAYOUT[id];
      const S = L.origin, E = L.tip;
      const mid = { x: (S.x + E.x) / 2, y: (S.y + E.y) / 2 };
      const pl = unit(perp(sub(E, S)));
      const M = add(mid, scale(pl, L.bow));
      const outward = unit(sub(E, M));
      const lateral = perp(outward);

      const clusterIds = (this.data.branches[id] && this.data.branches[id].clusters) || [];
      const N = clusterIds.length;
      const centers = {};
      clusterIds.forEach((cid, i) => {
        const off = i - (N - 1) / 2;
        const rnd = mulberry32(hashStr(cid));
        const jx = (rnd() - 0.5) * 18;
        const jy = (rnd() - 0.5) * 18;
        const c = {
          x: E.x + outward.x * 6 + lateral.x * off * CLUSTER_GAP + jx,
          y: E.y + outward.y * 6 + lateral.y * off * CLUSTER_GAP + jy
        };
        centers[cid] = c;
        this.geo.clusters[cid] = { x: c.x, y: c.y, branch: id };
      });

      // Camera focus for the branch = average of its cluster centers.
      let focus;
      if (N) {
        let sx = 0, sy = 0;
        clusterIds.forEach((cid) => { sx += centers[cid].x; sy += centers[cid].y; });
        focus = { x: sx / N, y: sy / N };
      } else {
        focus = { x: (M.x + E.x) / 2, y: (M.y + E.y) / 2 };
      }

      this.geo.branches[id] = { S, M, E, outward, lateral, width: L.width, centers, focus };
    }
  }

  /* ------------------------------- build the SVG ---------------------------- */
  _build() {
    this.svg.innerHTML = ""; // start clean
    this.svg.appendChild(this._defs());

    this.scene = el("g", { id: "scene" });
    this.svg.appendChild(this.scene);

    this.scene.appendChild(this._ground());
    this.scene.appendChild(this._roots());
    this.scene.appendChild(this._trunk());
    this.scene.appendChild(this._canopyBackground());

    this.branchLayer = el("g", { id: "branches" });
    this.scene.appendChild(this.branchLayer);
    for (const id of BRANCH_ORDER) this.branchLayer.appendChild(this._branch(id));

    this.scene.appendChild(this._apical());

    this.labelLayer = el("g", { id: "labels" });
    this.scene.appendChild(this.labelLayer);
  }

  _defs() {
    const linear = (id, x2, y2, stops) =>
      el("linearGradient",
        { id, x1: "0", y1: "0", x2, y2 },
        stops.map((s) => el("stop", { offset: s[0], "stop-color": s[1] })));

    const bark = linear("barkGrad", "1", "0", [
      ["0%", "#4a2f1b"], ["22%", "#7a4d2c"], ["50%", "#9a6638"],
      ["72%", "#6f4527"], ["100%", "#3f2715"]
    ]);
    const root = linear("rootGrad", "1", "0", [
      ["0%", "#3a2413"], ["50%", "#6b4427"], ["100%", "#2e1c0f"]
    ]);
    const apical = el("radialGradient", { id: "apicalGrad" }, [
      el("stop", { offset: "0%", "stop-color": "#eef7b0" }),
      el("stop", { offset: "55%", "stop-color": "#a9cf5c" }),
      el("stop", { offset: "100%", "stop-color": "#5f9a36" })
    ]);
    return el("defs", {}, [bark, root, apical]);
  }

  _ground() {
    const g = el("g", { id: "ground" });
    // soft shadow under the trunk
    g.appendChild(el("ellipse", {
      cx: 500, cy: 778, rx: 180, ry: 22,
      fill: "#000", opacity: "0.10"
    }));
    return g;
  }

  _roots() {
    const g = el("g", { id: "roots" });

    // Central taproot — clickable as its own section.
    const tap = el("path", {
      class: "taproot section-hit clickable",
      "data-section": "taproot",
      d: taperedPath({ x: 500, y: 770 }, { x: 494, y: 868 }, { x: 508, y: 958 }, 46, 5),
      fill: "url(#rootGrad)"
    });
    tap.appendChild(el("title", {}, [document.createTextNode("Taproot")]));
    g.appendChild(tap);

    // Lateral roots — the whole group is one clickable section.
    const lat = el("g", {
      class: "lateral-roots section-hit section-group clickable",
      "data-section": "lateralRoots"
    });
    const latSpecs = [
      [{ x: 470, y: 776 }, { x: 350, y: 838 }, { x: 196, y: 902 }, 22],
      [{ x: 486, y: 778 }, { x: 380, y: 880 }, { x: 318, y: 956 }, 18],
      [{ x: 514, y: 778 }, { x: 622, y: 880 }, { x: 690, y: 956 }, 18],
      [{ x: 530, y: 776 }, { x: 650, y: 838 }, { x: 806, y: 902 }, 22]
    ];
    for (const [s, m, e, w] of latSpecs) {
      lat.appendChild(el("path", {
        class: "lateral-root",
        d: taperedPath(s, m, e, w, 4),
        fill: "url(#rootGrad)"
      }));
    }
    lat.appendChild(el("title", {}, [document.createTextNode("Lateral roots")]));
    g.appendChild(lat);

    return g;
  }

  _trunk() {
    const g = el("g", { id: "trunk" });

    // Main trunk — irregular, tapering, clickable.
    const trunk = el("path", {
      class: "trunk section-hit clickable",
      "data-section": "trunk",
      d: taperedPath({ x: 500, y: 778 }, { x: 518, y: 470 }, { x: 500, y: 150 }, 112, 16),
      fill: "url(#barkGrad)"
    });
    trunk.appendChild(el("title", {}, [document.createTextNode("Trunk")]));
    g.appendChild(trunk);

    // Subtle bark lines (decorative, never clickable).
    const barkLines = el("g", { class: "bark-lines" });
    const offsets = [-34, -16, 4, 22, 38];
    offsets.forEach((o, i) => {
      barkLines.appendChild(el("path", {
        d: `M ${500 + o} 760 Q ${510 + o * 0.6} 470 ${500 + o * 0.25} 210`,
        fill: "none",
        stroke: "#3c2614",
        "stroke-width": i % 2 ? 2.2 : 1.4,
        "stroke-linecap": "round",
        opacity: 0.35
      }));
    });
    g.appendChild(barkLines);

    return g;
  }

  _apical() {
    const g = el("g", {
      id: "apical",
      class: "section-hit clickable",
      "data-section": "apical"
    });
    // small dividing-cell dome at the very top of the leader
    g.appendChild(el("path", {
      class: "apical-bud",
      d: "M 489 152 C 484 124 500 110 500 110 C 500 110 516 124 511 152 Z",
      fill: "url(#apicalGrad)",
      stroke: "#4d7d2a",
      "stroke-width": 1.2
    }));
    // two tiny leaf primordia
    g.appendChild(el("path", {
      d: "M 491 146 C 476 140 470 150 470 150 C 478 154 488 152 491 146 Z",
      fill: "#7cb24a", opacity: 0.95
    }));
    g.appendChild(el("path", {
      d: "M 509 146 C 524 140 530 150 530 150 C 522 154 512 152 509 146 Z",
      fill: "#7cb24a", opacity: 0.95
    }));
    g.appendChild(el("title", {}, [document.createTextNode("Apical meristem")]));
    return g;
  }

  // Deep canopy foliage behind the branches so the tree reads as one mass.
  _canopyBackground() {
    const g = el("g", { id: "canopy-bg" });
    const anchors = [{ x: 500, y: 168 }, { x: 500, y: 270 }, { x: 410, y: 320 },
                     { x: 590, y: 320 }, { x: 500, y: 400 }];
    for (const id of BRANCH_ORDER) anchors.push(this.geo.branches[id].E);

    let seed = 1;
    for (const a of anchors) {
      const rnd = mulberry32(hashStr("bg" + (seed++) + a.x));
      const count = 8;
      for (let i = 0; i < count; i++) {
        const ang = rnd() * Math.PI * 2;
        const r = rnd() * 58;
        const rx = 26 + rnd() * 26;
        g.appendChild(el("ellipse", {
          cx: fmt(a.x + Math.cos(ang) * r),
          cy: fmt(a.y + Math.sin(ang) * r),
          rx: fmt(rx),
          ry: fmt(rx * (0.78 + rnd() * 0.3)),
          fill: GREENS[Math.floor(rnd() * GREENS.length)],
          opacity: fmt(0.32 + rnd() * 0.22)
        }));
      }
    }
    return g;
  }

  /* ----------------------------- one branch group --------------------------- */
  _branch(id) {
    const B = this.geo.branches[id];
    const bg = el("g", { class: "branch", "data-branch": id });
    this.branchEls[id] = bg;

    // Woody branch (also the click target in whole-tree view).
    const wood = el("path", {
      class: "branch-wood branch-hit clickable",
      "data-branch": id,
      d: taperedPath(B.S, B.M, B.E, B.width, 4),
      fill: "url(#barkGrad)"
    });
    wood.appendChild(el("title", {}, [
      document.createTextNode(this.data.branches[id].title)
    ]));
    bg.appendChild(wood);

    // A couple of organic twigs reaching toward the clusters.
    const twigs = el("g", { class: "twigs" });
    const clusterIds = this.data.branches[id].clusters || [];
    clusterIds.forEach((cid) => {
      const c = B.centers[cid];
      const start = pointOnQuad(B.S, B.M, B.E, 0.7);
      twigs.appendChild(el("path", {
        d: `M ${P(start)} Q ${P(B.E)} ${P(c)}`,
        fill: "none",
        stroke: "#6f4527",
        "stroke-width": 3,
        "stroke-linecap": "round",
        opacity: 0.85
      }));
    });
    bg.appendChild(twigs);

    // Clusters (built automatically from data.js).
    const clusters = el("g", { class: "clusters" });
    clusterIds.forEach((cid) => {
      const def = this.data.leafClusters[cid];
      if (!def) return; // ignore unknown ids gracefully
      clusters.appendChild(this._cluster(id, cid, def));
    });
    bg.appendChild(clusters);

    return bg;
  }

  /* ----------------------------- one leaf cluster --------------------------- */
  _cluster(branchId, clusterId, def) {
    const center = this.geo.clusters[clusterId];
    const cg = el("g", { class: "cluster", "data-cluster": clusterId, "data-branch": branchId });
    this.clusterEls[clusterId] = cg;

    const rnd = mulberry32(hashStr(clusterId));

    // Foliage blob (visible at every level — this is the canopy you see).
    const foliage = el("g", { class: "cluster-foliage" });
    for (let i = 0; i < 7; i++) {
      const ang = rnd() * Math.PI * 2;
      const r = rnd() * (CLUSTER_R - 6);
      const rx = 13 + rnd() * 12;
      foliage.appendChild(el("ellipse", {
        cx: fmt(center.x + Math.cos(ang) * r),
        cy: fmt(center.y + Math.sin(ang) * r),
        rx: fmt(rx),
        ry: fmt(rx * (0.8 + rnd() * 0.25)),
        fill: GREENS[Math.floor(rnd() * GREENS.length)],
        opacity: fmt(0.78 + rnd() * 0.2)
      }));
    }
    cg.appendChild(foliage);

    // Glow ring shown when this cluster's branch is open (level 2).
    cg.appendChild(el("ellipse", {
      class: "cluster-glow",
      cx: fmt(center.x), cy: fmt(center.y),
      rx: CLUSTER_R + 12, ry: CLUSTER_R + 10
    }));

    // Individual evidence leaves (built automatically from the leaves array).
    const leavesG = el("g", { class: "leaves" });
    const leaves = def.leaves || [];
    const spread = Math.min(48, 14 + leaves.length * 7);
    leaves.forEach((leaf, i) => {
      const lr = mulberry32(hashStr(leaf.id || clusterId + i));
      // golden-angle layout -> organic, non-grid spacing (auto, no manual x/y)
      let r, ang;
      if (typeof leaf.x === "number" && typeof leaf.y === "number") {
        // optional custom position (0..1 within the cluster)
        const dx = (leaf.x - 0.5) * 2 * spread;
        const dy = (leaf.y - 0.5) * 2 * spread;
        r = Math.hypot(dx, dy);
        ang = Math.atan2(dy, dx);
      } else {
        r = spread * Math.sqrt((i + 0.6) / Math.max(1, leaves.length));
        ang = i * 2.399963; // ~137.5 degrees
      }
      const lx = center.x + Math.cos(ang) * r;
      const ly = center.y + Math.sin(ang) * r;
      const sizeVar = 0.82 + lr() * 0.34;
      const ll = 26 * sizeVar, lw = 13 * sizeVar;
      this.geo.leaves[leaf.id] = { x: lx, y: ly, ang, branch: branchId, cluster: clusterId };

      const lg = el("g", {
        class: "leaf clickable",
        "data-leaf": leaf.id,
        transform: `translate(${fmt(lx)} ${fmt(ly)}) rotate(${fmt((ang * 180) / Math.PI)})`
      });
      lg.appendChild(el("path", {
        class: "leaf-shape",
        d: `M ${fmt(-ll / 2)} 0 Q 0 ${fmt(-lw / 2)} ${fmt(ll / 2)} 0 Q 0 ${fmt(lw / 2)} ${fmt(-ll / 2)} 0 Z`,
        fill: GREENS[i % GREENS.length],
        opacity: fmt(0.9 + lr() * 0.1)
      }));
      lg.appendChild(el("line", {
        class: "leaf-rib",
        x1: fmt(-ll * 0.42), y1: 0, x2: fmt(ll * 0.48), y2: 0
      }));
      lg.appendChild(el("title", {}, [document.createTextNode(leaf.title || "Evidence")]));
      lg.addEventListener("click", (e) => {
        e.stopPropagation();
        this._select(lg);
        this.cb.onLeaf && this.cb.onLeaf(leaf, clusterId, branchId);
      });
      leavesG.appendChild(lg);
    });
    cg.appendChild(leavesG);

    // Transparent hit area for selecting the whole cluster (level 2).
    const hit = el("ellipse", {
      class: "cluster-hit clickable",
      cx: fmt(center.x), cy: fmt(center.y),
      rx: CLUSTER_R + 12, ry: CLUSTER_R + 10,
      fill: "transparent"
    });
    hit.addEventListener("click", (e) => {
      e.stopPropagation();
      this.cb.onCluster && this.cb.onCluster(branchId, clusterId);
    });
    cg.appendChild(hit);

    return cg;
  }

  /* --------------------------------- events --------------------------------- */
  _bindStaticClicks() {
    // Sections (apical, trunk, taproot, lateral roots) + branches.
    this.svg.querySelectorAll(".section-hit").forEach((node) => {
      node.addEventListener("click", (e) => {
        e.stopPropagation();
        this._select(node);
        this.cb.onSection && this.cb.onSection(node.getAttribute("data-section"));
      });
    });
    this.svg.querySelectorAll(".branch-hit").forEach((node) => {
      node.addEventListener("click", (e) => {
        e.stopPropagation();
        this.cb.onBranch && this.cb.onBranch(node.getAttribute("data-branch"));
      });
    });
  }

  _select(node) {
    if (this.selectedEl) this.selectedEl.classList.remove("selected");
    this.selectedEl = node;
    if (node) node.classList.add("selected");
  }

  _clearSelect() { this._select(null); }

  /* -------------------------------- camera ---------------------------------- */
  _applyCamera() {
    const { cx, cy, k } = this.cam;
    const tx = CENTER - k * cx;
    const ty = CENTER - k * cy;
    this.scene.setAttribute("transform", `translate(${fmt(tx)} ${fmt(ty)}) scale(${fmt(k)})`);
  }

  _animateCamera(to, after) {
    cancelAnimationFrame(this._raf);
    const from = { ...this.cam };
    const dur = 650;
    const t0 = performance.now();
    const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const step = (now) => {
      const p = Math.min(1, (now - t0) / dur);
      const e = ease(p);
      this.cam = {
        cx: from.cx + (to.cx - from.cx) * e,
        cy: from.cy + (to.cy - from.cy) * e,
        k: from.k + (to.k - from.k) * e
      };
      this._applyCamera();
      if (p < 1) this._raf = requestAnimationFrame(step);
      else if (after) after();
    };
    this._raf = requestAnimationFrame(step);
  }

  _setLevelClass() {
    this.svg.setAttribute("class", "tree level-" + this.level);
  }

  /* -------------------------- public navigation API ------------------------- */
  focusWhole(animate = true) {
    this.level = 1;
    this.activeBranch = null;
    this.activeCluster = null;
    this._clearSelect();
    this._setLevelClass();
    for (const id in this.branchEls) this.branchEls[id].classList.remove("active");
    for (const cid in this.clusterEls) this.clusterEls[cid].classList.remove("active");

    if (!this._bound) { this._bindStaticClicks(); this._bound = true; }

    const target = { cx: CENTER, cy: CENTER, k: 1 };
    this._fadeLabels();
    const done = () => this._renderLabels();
    if (animate) this._animateCamera(target, done);
    else { this.cam = target; this._applyCamera(); done(); }
  }

  focusBranch(branchId) {
    if (!this.geo.branches[branchId]) return;
    this.level = 2;
    this.activeBranch = branchId;
    this.activeCluster = null;
    this._clearSelect();
    this._setLevelClass();

    for (const id in this.branchEls)
      this.branchEls[id].classList.toggle("active", id === branchId);
    for (const cid in this.clusterEls) this.clusterEls[cid].classList.remove("active");

    const f = this.geo.branches[branchId].focus;
    this._fadeLabels();
    this._animateCamera({ cx: f.x, cy: f.y, k: BRANCH_ZOOM }, () => this._renderLabels());
  }

  focusCluster(branchId, clusterId) {
    if (!this.geo.clusters[clusterId]) return;
    this.level = 3;
    this.activeBranch = branchId;
    this.activeCluster = clusterId;
    this._clearSelect();
    this._setLevelClass();

    for (const id in this.branchEls)
      this.branchEls[id].classList.toggle("active", id === branchId);
    for (const cid in this.clusterEls)
      this.clusterEls[cid].classList.toggle("active", cid === clusterId);

    const c = this.geo.clusters[clusterId];
    this._fadeLabels();
    this._animateCamera({ cx: c.x, cy: c.y, k: CLUSTER_ZOOM }, () => this._renderLabels());
  }

  /* --------------------------------- labels --------------------------------- */
  _fadeLabels() { this.labelLayer.style.opacity = "0"; }

  _renderLabels() {
    const layer = this.labelLayer;
    layer.innerHTML = "";
    const k = this.cam.k;
    const opts = { fs: 15 / k, sw: 1.4 / k, cr: 4.6 / k, pad: 4 / k };

    if (this.level === 1) {
      const T = this.data.treeSections;
      const defs = [
        { x: 500, y: 124, tx: 662, ty: 120, anchor: "start", text: T.apical.title },
        { x: 506, y: 600, tx: 150, ty: 624, anchor: "end", text: T.trunk.title },
        { x: 508, y: 884, tx: 706, ty: 912, anchor: "start", text: T.taproot.title },
        { x: 318, y: 904, tx: 120, ty: 946, anchor: "end", text: T.lateralRoots.title }
      ];
      const blab = {
        study: { tx: 70, ty: 296, anchor: "end" },
        discipline: { tx: 74, ty: 580, anchor: "end" },
        escape: { tx: 150, ty: 118, anchor: "end" },
        community: { tx: 854, ty: 150, anchor: "start" },
        individuality: { tx: 924, ty: 388, anchor: "start" }
      };
      for (const id of BRANCH_ORDER) {
        const f = this.geo.branches[id].focus;
        defs.push({ x: f.x, y: f.y, tx: blab[id].tx, ty: blab[id].ty,
                    anchor: blab[id].anchor, text: this.data.branches[id].title });
      }
      defs.forEach((d) => layer.appendChild(this._label(d, opts)));
    } else if (this.level === 2 && this.activeBranch) {
      const B = this.geo.branches[this.activeBranch];
      (this.data.branches[this.activeBranch].clusters || []).forEach((cid) => {
        const def = this.data.leafClusters[cid];
        if (!def) return;
        const c = this.geo.clusters[cid];
        const o = B.outward;
        const dist = (CLUSTER_R + 34);
        const tx = c.x + o.x * dist, ty = c.y + o.y * dist;
        layer.appendChild(this._label(
          { x: c.x, y: c.y, tx, ty, anchor: o.x >= 0 ? "start" : "end", text: def.title }, opts));
      });
    } else if (this.level === 3 && this.activeCluster) {
      const def = this.data.leafClusters[this.activeCluster];
      (def.leaves || []).forEach((leaf) => {
        const L = this.geo.leaves[leaf.id];
        if (!L) return;
        const dx = Math.cos(L.ang), dy = Math.sin(L.ang);
        const dist = 30;
        layer.appendChild(this._label(
          { x: L.x, y: L.y, tx: L.x + dx * dist, ty: L.y + dy * dist,
            anchor: dx >= 0 ? "start" : "end", text: leaf.title }, opts));
      });
    }

    requestAnimationFrame(() => { layer.style.opacity = "1"; });
  }

  // One scientific-diagram callout: blue line, blue target dot, black text.
  _label(d, { fs, sw, cr, pad }) {
    const g = el("g", { class: "label" });
    g.appendChild(el("line", {
      class: "label-line",
      x1: fmt(d.tx), y1: fmt(d.ty), x2: fmt(d.x), y2: fmt(d.y),
      "stroke-width": fmt(sw)
    }));
    g.appendChild(el("circle", {
      class: "label-dot", cx: fmt(d.x), cy: fmt(d.y), r: fmt(cr),
      "stroke-width": fmt(sw)
    }));

    const w = d.text.length * fs * 0.56 + pad * 2;
    const h = fs + pad * 2;
    let rx = d.tx - pad;
    if (d.anchor === "end") rx = d.tx - w + pad;
    if (d.anchor === "middle") rx = d.tx - w / 2;
    g.appendChild(el("rect", {
      class: "label-bg",
      x: fmt(rx), y: fmt(d.ty - fs * 0.82 - pad),
      width: fmt(w), height: fmt(h), rx: fmt(pad)
    }));
    const t = el("text", {
      class: "label-text",
      x: fmt(d.tx), y: fmt(d.ty),
      "text-anchor": d.anchor,
      "font-size": fmt(fs)
    });
    t.textContent = d.text;
    g.appendChild(t);
    return g;
  }
}
