export const treeSections = {
  apical: {
    title: "Apical Meristem: Who I Am Still Becoming",
    body: "The apical meristem is a region of actively dividing, undifferentiated cells at the growing tip of a shoot or root. It drives primary growth, letting the plant extend upward toward light and downward into new soil.",
    evidence: [
      "Future reading goals",
      "Looking Forward section of my proposal",
      "Unresolved questions about what role reading will play after this course"
    ],
    significance: "The apical meristem represents the reader I am still becoming. My reading life is not finished; it is still growing toward sharper interpretation, stronger self-awareness, and a better understanding of people."
  },
  trunk: {
    title: "Trunk: My Central Reading Identity",
    body: "The trunk is the main woody axis of a tree. It supports the canopy, elevates leaves toward sunlight, and contains vascular tissues that move water upward and sugars downward.",
    evidence: [
      "The Broken Empire series",
      "Reflections about darker or more intelligent narrators",
      "Books that made me analyze human behavior instead of only following plot"
    ],
    significance: "The trunk is the stable part of my reading identity: I read to think. Even when I read fantasy, rereads, or familiar books, I am usually drawn to intelligence, worldview, power, morality, and how characters interpret the world around them."
  },
  taproot: {
    title: "Taproot: Central Motivation",
    body: "The taproot is the dominant primary root that grows vertically downward from the radicle during germination. It anchors the plant and reaches deeper water reserves than surface roots can access.",
    evidence: [
      "Looking Forward section of my proposal",
      "Reflection that people are products of the information they consume",
      "Books that made me think about worldview, motivation, and identity"
    ],
    significance: "The taproot is the deepest reason I read: to understand people through the information they consume. This year made me more aware that books do not only entertain people; they train patterns of thought, empathy, suspicion, ambition, and identity."
  },
  roots: {
    title: "Lateral Roots: Smaller Motivations",
    body: "Lateral roots are smaller branches that grow outward from the main root. They anchor the plant, increase absorptive surface area, and help the root system interact with the surrounding soil.",
    evidence: [
      "Books I read because I chose them",
      "Books I read because they were assigned or useful",
      "Times reading felt like escape",
      "Times reading felt like work"
    ],
    significance: "The lateral roots represent the mixed motivations underneath my reading life: discipline, escape, curiosity, comfort, school obligation, and identity. Some were productive. Some were forced. All of them still fed the tree."
  }
};

export const branches = [
  {
    id: "discipline",
    label: "Reading as discipline",
    title: "Branch: Reading as Discipline",
    body: "This branch extends from the trunk like a lateral woody axis. It is supported by the same central identity, but it grows toward routine, structure, and self-control.",
    evidence: ["Reading goals", "Weekly logs", "Quarterly reflections", "Attempts to build consistency"],
    significance: "This branch shows reading as practice. Even when the process felt artificial, logs and goals forced me to notice my habits, my inconsistency, and the gap between wanting to be a reader and actually making time to read.",
    path: [430, 345, 345, 325, 275, 305, 160, 250, 28],
    labelX: 86,
    labelY: 258,
    anchorX: 250,
    anchorY: 305,
    zoomCenter: [270, 300]
  },
  {
    id: "escape",
    label: "Reading as escape",
    title: "Branch: Reading as Escape",
    body: "This branch grows away from the trunk into books that offered distance from school, routines, and visible performance.",
    evidence: ["Rereads", "Fantasy worlds", "Comfort books", "Books that felt separate from school pressure"],
    significance: "Escape was not the opposite of thinking. Sometimes distance from school made it easier to analyze power, loyalty, identity, and survival because I was reading by choice instead of obligation.",
    path: [430, 460, 330, 455, 252, 420, 145, 375, 30],
    labelX: 76,
    labelY: 390,
    anchorX: 240,
    anchorY: 420,
    zoomCenter: [260, 420]
  },
  {
    id: "study",
    label: "Reading as study",
    title: "Branch: Reading as Study",
    body: "This lower branch grows from the trunk toward academic reading: texts that are read for learning, interpretation, and intellectual development.",
    evidence: ["School readings", "Annotations", "Reading logs", "Independent reading requirements"],
    significance: "This branch shows the academic version of my reading life. It was useful and structured, but it also created tension because reading became something measured, recorded, and sometimes performed."
    ,path: [425, 575, 315, 565, 230, 555, 115, 520, 32],
    labelX: 78,
    labelY: 516,
    anchorX: 240,
    anchorY: 555,
    zoomCenter: [250, 560]
  },
  {
    id: "community",
    label: "Reading as community",
    title: "Branch: Reading as Community",
    body: "This branch grows outward from the trunk toward books, discussions, and reading experiences connected to other people or earlier versions of myself.",
    evidence: ["Class discussions", "Original Reading Identity Project", "Books connected to earlier memories", "Shared reading experiences"],
    significance: "This branch shows that reading is not always solitary. Some books mattered because they connected me to classmates, past versions of myself, or communities formed around certain stories.",
    path: [470, 445, 565, 410, 640, 385, 770, 345, 28],
    labelX: 710,
    labelY: 335,
    anchorX: 610,
    anchorY: 400,
    zoomCenter: [620, 390]
  },
  {
    id: "individuality",
    label: "Reading as individuality",
    title: "Branch: Reading as Individuality",
    body: "This branch grows toward books that felt closest to my actual taste: sharper, darker, more intelligent, and less sanitized than what I usually associate with school reading.",
    evidence: ["Prince of Thorns", "The Broken Empire series", "Quotes about worldview", "Character analysis"],
    significance: "This branch shows the books that revealed my individual taste. I was drawn to narrators who were young but not innocent, intelligent but morally uncomfortable, and shaped by a more negative view of life.",
    path: [470, 550, 565, 520, 650, 500, 785, 475, 30],
    labelX: 700,
    labelY: 473,
    anchorX: 620,
    anchorY: 515,
    zoomCenter: [640, 515]
  }
];

export const leafClusters = [
  {
    id: "goalTracking",
    branch: "discipline",
    label: "Goals",
    title: "Leaf Cluster: Reading Goals",
    x: 210,
    y: 240,
    count: 18,
    color: "#8bcf62",
    body: "This cluster represents the goals and routines that were supposed to make reading consistent.",
    evidence: ["Original reading goals", "Weekly progress", "Attempts to keep a routine"],
    significance: "The goals mattered because they made reading visible, but they also exposed when motivation was real and when it was only compliance."
  },
  {
    id: "logs",
    branch: "discipline",
    label: "Logs",
    title: "Leaf Cluster: Weekly Reading Logs",
    x: 310,
    y: 300,
    count: 20,
    color: "#a9d96f",
    body: "This cluster represents reading logs and recorded evidence of reading time.",
    evidence: ["Weekly logs", "Time tracking", "Recorded reading habits"],
    significance: "Logs helped me recognize patterns, but they also showed how easily reading can become performance instead of discovery."
  },
  {
    id: "rereads",
    branch: "escape",
    label: "Rereads",
    title: "Leaf Cluster: Rereads and Escape",
    x: 210,
    y: 390,
    count: 22,
    color: "#65c867",
    body: "This cluster represents books I returned to because they were familiar enough to enter easily but still complex enough to think about.",
    evidence: ["Reread books", "Comfort books", "Fantasy worlds"],
    significance: "Rereading showed me that comfort does not mean shallow reading. Familiar books can become clearer because I notice different ideas each time."
  },
  {
    id: "fantasyWorlds",
    branch: "escape",
    label: "Fantasy",
    title: "Leaf Cluster: Fantasy Worlds",
    x: 310,
    y: 440,
    count: 18,
    color: "#4fbf73",
    body: "This cluster represents fantasy books that felt separate from school pressure.",
    evidence: ["Fantasy series", "Worldbuilding", "Stories about power, loyalty, and survival"],
    significance: "Fantasy gave me distance from ordinary school routines, but that distance made it easier to think about human behavior in extreme situations."
  },
  {
    id: "schoolTexts",
    branch: "study",
    label: "School",
    title: "Leaf Cluster: School Reading",
    x: 190,
    y: 550,
    count: 20,
    color: "#b4d86a",
    body: "This cluster represents assigned or structured reading that trained analysis and interpretation.",
    evidence: ["School readings", "Annotations", "Independent reading requirements"],
    significance: "School reading mattered because it gave structure, but it also made me question the difference between reading for understanding and reading because evidence was required."
  },
  {
    id: "reflections",
    branch: "study",
    label: "Reflections",
    title: "Leaf Cluster: Reflections",
    x: 315,
    y: 585,
    count: 18,
    color: "#9ed276",
    body: "This cluster represents weekly and quarterly reflection writing.",
    evidence: ["Independent Reading Reflections", "Quarterly reflection", "Moments where I noticed patterns in myself"],
    significance: "The reflections mattered because they turned reading from a task into evidence of how I think, avoid, choose, and change."
  },
  {
    id: "classDiscussion",
    branch: "community",
    label: "Class",
    title: "Leaf Cluster: Class and Discussion",
    x: 610,
    y: 360,
    count: 18,
    color: "#87d682",
    body: "This cluster represents the part of reading shaped by class expectations and discussion.",
    evidence: ["Class conversations", "Shared assignments", "Hearing other interpretations"],
    significance: "Discussion showed that books do not create one identical response. Different readers absorb different information from the same text."
  },
  {
    id: "earlierSelf",
    branch: "community",
    label: "Earlier self",
    title: "Leaf Cluster: Earlier Reading Identity",
    x: 700,
    y: 395,
    count: 16,
    color: "#92dd8f",
    body: "This cluster connects the current project to my original Reading Identity Project and earlier versions of myself as a reader.",
    evidence: ["Original Reading Identity Project", "Books connected to past identity", "How my ideas changed or stayed the same"],
    significance: "This cluster matters because growth was not total replacement. Some parts of my old reading identity remained, while other parts branched in new directions."
  },
  {
    id: "brokenEmpire",
    branch: "individuality",
    label: "Broken Empire",
    title: "Leaf Cluster: The Broken Empire",
    x: 610,
    y: 515,
    count: 26,
    color: "#78d25f",
    body: "This cluster represents books that felt closest to my actual taste: darker, sharper, more intelligent, and less sanitized.",
    evidence: ["Prince of Thorns", "King of Thorns", "Emperor of Thorns", "Quotes or scenes about worldview and power"],
    significance: "This series mattered because I was drawn to a narrator who was young but not innocent, intelligent but morally uncomfortable, and shaped by a negative view of life."
  },
  {
    id: "darkNarrators",
    branch: "individuality",
    label: "Narrators",
    title: "Leaf Cluster: Intelligent / Dark Narrators",
    x: 710,
    y: 545,
    count: 18,
    color: "#5fc85b",
    body: "This cluster represents the kinds of narrators and minds I find most compelling in fiction.",
    evidence: ["Characters with strong worldview", "Narrators who analyze rather than simply react", "Morally uncomfortable perspectives"],
    significance: "These books made me realize that I often prefer narrators who force interpretation instead of asking for easy sympathy."
  }
];
