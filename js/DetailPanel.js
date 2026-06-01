/* =============================================================================
   DetailPanel.js — renders the right-hand side panel.

   It only reads from the data objects passed in from main.js (which come from
   js/data.js). You should not need to edit this file to change content.
   ============================================================================= */

export class DetailPanel {
  constructor(root, { treeSections, branches, leafClusters }, callbacks = {}) {
    this.root = root;
    this.treeSections = treeSections;
    this.branches = branches;
    this.leafClusters = leafClusters;
    this.cb = callbacks; // { onClusterPick(clusterId) }
  }

  /* ---------------------------- small DOM helpers --------------------------- */
  _clear() { this.root.innerHTML = ""; }

  _add(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    this.root.appendChild(node);
    return node;
  }

  // A labelled block, e.g. "Significance" + paragraph.
  _block(label, text) {
    const wrap = document.createElement("section");
    wrap.className = "panel-block";
    const h = document.createElement("h3");
    h.className = "panel-label";
    h.textContent = label;
    const p = document.createElement("p");
    p.className = "panel-text";
    p.textContent = text;
    wrap.appendChild(h);
    wrap.appendChild(p);
    this.root.appendChild(wrap);
    return wrap;
  }

  // Evidence list used by tree-section panels (only shown when non-empty).
  _evidenceList(items) {
    if (!items || !items.length) return;
    const wrap = document.createElement("section");
    wrap.className = "panel-block";
    const h = document.createElement("h3");
    h.className = "panel-label";
    h.textContent = "Evidence";
    wrap.appendChild(h);
    const ul = document.createElement("ul");
    ul.className = "evidence-list";
    items.forEach((it) => {
      const li = document.createElement("li");
      const strong = document.createElement("strong");
      strong.textContent = it.title;
      li.appendChild(strong);
      if (it.type) {
        const badge = document.createElement("span");
        badge.className = "type-badge";
        badge.textContent = it.type;
        li.appendChild(badge);
      }
      if (it.text) {
        const p = document.createElement("p");
        p.className = "panel-text";
        p.textContent = it.text;
        li.appendChild(p);
      }
      ul.appendChild(li);
    });
    wrap.appendChild(ul);
    this.root.appendChild(wrap);
  }

  /* -------------------------------- views ----------------------------------- */

  // Default content shown in whole-tree view before anything is clicked.
  showIntro() {
    this._clear();
    this._add("p", "panel-kicker", "Reading Tree");
    this._add("h2", "panel-title", "A reading life, grown as a tree");
    this._block(
      "How to explore",
      "Click a labelled structure to learn what it represents. Click one of the " +
      "five branches to zoom in, then open a leaf cluster to see the individual " +
      "pieces of evidence growing on it."
    );
    const ul = document.createElement("ul");
    ul.className = "intro-list";
    [
      "Apical meristem, trunk, taproot and lateral roots describe the reader.",
      "The five branches are five ways of reading.",
      "Each leaf is one piece of evidence."
    ].forEach((t) => {
      const li = document.createElement("li");
      li.textContent = t;
      ul.appendChild(li);
    });
    this.root.appendChild(ul);
  }

  // Apical / trunk / taproot / lateral roots.
  showSection(key) {
    const s = this.treeSections[key];
    if (!s) return;
    this._clear();
    this._add("p", "panel-kicker", "Tree structure");
    this._add("h2", "panel-title", s.title);
    if (s.biologicalDefinition) this._block("Biological definition", s.biologicalDefinition);
    if (s.significance) this._block("Significance", s.significance);
    this._evidenceList(s.evidence);
  }

  // A branch (level 2): title, definition, significance, list of cluster titles.
  showBranch(branchId) {
    const b = this.branches[branchId];
    if (!b) return;
    this._clear();
    this._add("p", "panel-kicker", "Branch");
    this._add("h2", "panel-title", b.title);
    if (b.biologicalDefinition) this._block("Biological definition", b.biologicalDefinition);
    if (b.significance) this._block("Significance", b.significance);

    const ids = (b.clusters || []).filter((id) => this.leafClusters[id]);
    if (ids.length) {
      const wrap = document.createElement("section");
      wrap.className = "panel-block";
      const h = document.createElement("h3");
      h.className = "panel-label";
      h.textContent = "Leaf clusters on this branch";
      wrap.appendChild(h);
      const ul = document.createElement("ul");
      ul.className = "cluster-list";
      ids.forEach((id) => {
        const li = document.createElement("li");
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "cluster-link";
        btn.textContent = this.leafClusters[id].title;
        btn.addEventListener("click", () => this.cb.onClusterPick && this.cb.onClusterPick(id));
        li.appendChild(btn);
        ul.appendChild(li);
      });
      wrap.appendChild(ul);
      this.root.appendChild(wrap);
    }
  }

  // A leaf cluster (level 3 header): title + significance + how many leaves.
  showCluster(clusterId) {
    const c = this.leafClusters[clusterId];
    if (!c) return;
    this._clear();
    this._add("p", "panel-kicker", "Leaf cluster");
    this._add("h2", "panel-title", c.title);
    if (c.significance) this._block("Significance", c.significance);
    const n = (c.leaves || []).length;
    this._block(
      "Evidence",
      n
        ? `This cluster holds ${n} ${n === 1 ? "leaf" : "leaves"}. Click any leaf on the diagram to read it.`
        : "No evidence leaves yet. Add some in js/data.js."
    );
  }

  // A single evidence leaf (clicked in level 3).
  showLeaf(leaf, clusterId) {
    if (!leaf) return;
    this._clear();
    this._add("p", "panel-kicker", "Evidence");
    this._add("h2", "panel-title", leaf.title);
    if (leaf.type) {
      const badge = this._add("span", "type-badge type-badge--solo", leaf.type);
      badge.setAttribute("aria-label", "Evidence type");
    }
    if (leaf.text) this._block("Evidence", leaf.text);
    if (leaf.significance) this._block("Significance", leaf.significance);

    const c = this.leafClusters[clusterId];
    if (c) this._add("p", "panel-context", `From “${c.title}”.`);
  }
}
