import { treeSections } from "./TreeData.js";

export class DetailPanel {
  constructor() {
    this.kicker = document.querySelector("#panelKicker");
    this.title = document.querySelector("#panelTitle");
    this.body = document.querySelector("#panelBody");
    this.evidence = document.querySelector("#panelEvidence");
    this.evidenceHeading = document.querySelector("#evidenceHeading");
    this.significance = document.querySelector("#panelQuestion");
  }

  init() {
    this.show("trunk");
  }

  show(sectionId) {
    const data = treeSections[sectionId] || treeSections.trunk;
    this.kicker.textContent = "Selected Growth Zone";
    this.evidenceHeading.textContent = "Evidence / Artifacts";
    this.render(data);
  }

  showCluster(cluster) {
    this.kicker.textContent = "Selected Leaf Cluster";
    this.evidenceHeading.textContent = "Books / Evidence";
    this.render({
      title: cluster.title || cluster.label,
      body: cluster.body || "This cluster represents one set of books, quotes, reflections, or artifacts attached to a branch of my reading personality.",
      evidence: cluster.evidence || [cluster.label],
      question: cluster.significance || cluster.question || "This cluster connects a specific reading experience to the larger tree."
    });
  }

  render(data) {
    this.title.textContent = data.title;
    this.body.textContent = data.body;
    this.significance.textContent = data.question;
    this.evidence.innerHTML = "";

    data.evidence.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      this.evidence.appendChild(li);
    });
  }
}
