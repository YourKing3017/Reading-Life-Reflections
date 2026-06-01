import { treeSections, branchCards, leafAnatomy } from "./TreeData.js";

export class DetailPanel {
  constructor() {
    this.title = document.querySelector("#panelTitle");
    this.body = document.querySelector("#panelBody");
    this.evidence = document.querySelector("#panelEvidence");
    this.question = document.querySelector("#panelQuestion");
    this.branchCards = document.querySelector("#branchCards");
    this.leafAnatomyList = document.querySelector("#leafAnatomyList");
  }

  init() {
    this.renderBranchCards();
    this.renderLeafAnatomy();
    this.show("trunk");
  }

  show(sectionId) {
    const data = treeSections[sectionId] || treeSections.trunk;
    this.title.textContent = data.title;
    this.body.textContent = data.body;
    this.question.textContent = data.question;
    this.evidence.innerHTML = "";

    data.evidence.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      this.evidence.appendChild(li);
    });
  }

  renderBranchCards() {
    this.branchCards.innerHTML = "";

    branchCards.forEach((card) => {
      const article = document.createElement("article");
      article.className = "branch-card";

      const title = document.createElement("h3");
      title.textContent = card.title;

      const body = document.createElement("p");
      body.textContent = card.body;

      const list = document.createElement("ul");
      card.leaves.forEach((leaf) => {
        const li = document.createElement("li");
        li.textContent = leaf;
        list.appendChild(li);
      });

      article.append(title, body, list);
      this.branchCards.appendChild(article);
    });
  }

  renderLeafAnatomy() {
    this.leafAnatomyList.innerHTML = "";

    leafAnatomy.forEach((item) => {
      const row = document.createElement("div");
      row.className = "anatomy-item";

      const title = document.createElement("h3");
      title.textContent = item.part;

      const meaning = document.createElement("p");
      meaning.textContent = item.meaning;

      row.append(title, meaning);
      this.leafAnatomyList.appendChild(row);
    });
  }
}
