import { treeSections, branches, leafClusters } from "./data.js?v=18";
import { TreeDiagram } from "./TreeDiagram.js";
import { DetailPanel } from "./DetailPanel.js";

const data = { treeSections, branches, leafClusters };

const svg = document.getElementById("tree");
const panelEl = document.getElementById("panel");
const btnWhole = document.getElementById("btn-whole");
const btnBackBranch = document.getElementById("btn-back-branch");
const crumb = document.getElementById("breadcrumb");

// Track where we are so the "Back to branch" button knows what to return to.
let currentBranch = null;

/* ------------------------------ side panel -------------------------------- */
const panel = new DetailPanel(panelEl, data, {
  // Clicking a cluster name in the branch panel zooms into it.
  onClusterPick: (clusterId) => {
    const branchId = (leafClusters[clusterId] || {}).branch || currentBranch;
    enterCluster(branchId, clusterId);
  }
});

/* ------------------------------ tree diagram ------------------------------ */
const tree = new TreeDiagram(svg, {
  data,
  callbacks: {
    onSection: (key) => {
      // Tree parts just update the panel; we stay in whole-tree view.
      panel.showSection(key);
      setButtons(1);
      setCrumb([treeSections[key] ? treeSections[key].title : ""]);
    },
    onBranch: (branchId) => enterBranch(branchId),
    onCluster: (branchId, clusterId) => enterCluster(branchId, clusterId),
    onLeaf: (leaf, clusterId) => {
      panel.showLeaf(leaf, clusterId);
      setButtons(3);
      setCrumb([
        branches[currentBranch] && branches[currentBranch].title,
        leafClusters[clusterId] && leafClusters[clusterId].title,
        leaf.title
      ]);
    }
  }
});

/* ------------------------------ navigation -------------------------------- */
function enterWhole() {
  currentBranch = null;
  tree.focusWhole();
  panel.showIntro();
  setButtons(1);
  setCrumb([]);
}

function enterBranch(branchId) {
  if (!branches[branchId]) return;
  currentBranch = branchId;
  tree.focusBranch(branchId);
  panel.showBranch(branchId);
  setButtons(2);
  setCrumb([branches[branchId].title]);
}

function enterCluster(branchId, clusterId) {
  if (!leafClusters[clusterId]) return;
  currentBranch = branchId;
  tree.focusCluster(branchId, clusterId);
  panel.showCluster(clusterId);
  setButtons(3);
  setCrumb([branches[branchId] && branches[branchId].title, leafClusters[clusterId].title]);
}

/* -------------------------- buttons + breadcrumb -------------------------- */
function setButtons(level) {
  btnWhole.hidden = level === 1;
  btnBackBranch.hidden = level !== 3;
}

function setCrumb(parts) {
  const path = ["Whole tree", ...parts.filter(Boolean)];
  crumb.textContent = path.join("  ›  ");
}

btnWhole.addEventListener("click", enterWhole);
btnBackBranch.addEventListener("click", () => {
  if (currentBranch) enterBranch(currentBranch);
  else enterWhole();
});

/* --------------------------------- start ---------------------------------- */
enterWhole();
