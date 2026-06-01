export const treeSections = {
  soil: {
    title: "Soil: Reading Environment",
    body: "The soil represents the conditions my reading grew from: English class, required logs, reading goals, school expectations, and the pressure to turn reading into something visible and measurable.",
    evidence: [
      "Original reading goals",
      "Weekly reading logs",
      "Independent reading requirements",
      "Quarterly reflections"
    ],
    question: "How did the class structure shape my reading before I fully understood what I wanted reading to do for me?"
  },
  roots: {
    title: "Lateral Roots: Smaller Motivations",
    body: "The smaller roots represent the mixed motivations underneath my reading life: discipline, escape, curiosity, comfort, school obligation, and identity. Some were productive. Some were forced. All of them fed the tree.",
    evidence: [
      "Books I read because I chose them",
      "Books I read because they were assigned or useful",
      "Times reading felt like escape",
      "Times reading felt like work"
    ],
    question: "Which motivations were real, and which ones only existed because I had to prove I was reading?"
  },
  taproot: {
    title: "Taproot: Central Motivation",
    body: "The taproot is the deepest reason I read: to understand people through the information they consume. This year made me more aware that books do not just entertain people. They train patterns of thought, empathy, suspicion, ambition, and identity.",
    evidence: [
      "Looking Forward section of my proposal",
      "Reflection that people are products of the information they consume",
      "Books that made me think about worldview and motivation"
    ],
    question: "What is the deepest reason I keep returning to reading, even when it feels like work?"
  },
  trunk: {
    title: "Trunk: Reading as Intellectual Exercise",
    body: "The trunk is the stable part of my reading identity. I read to think. Even when a book is fantasy or familiar, I am usually drawn to intelligence, worldview, power, morality, and how characters interpret the world around them.",
    evidence: [
      "The Broken Empire series",
      "Reflections about intelligent or darker narrators",
      "Books that made me analyze human behavior rather than just plot"
    ],
    question: "What part of my reading identity stayed stable, even when my books and habits changed?"
  },
  bark: {
    title: "Bark: The Visible Reading Life",
    body: "The bark is what reading looked like from the outside: logs, finished pages, assignments, and evidence. It protected the tree, but it was not the entire tree. The visible record did not always capture why reading mattered.",
    evidence: [
      "Reading logs",
      "Book counts",
      "Visible assignments",
      "Project artifacts"
    ],
    question: "What did my reading life look like from the outside, and what did that miss?"
  },
  cambium: {
    title: "Cambium: Reflection and Growth Layer",
    body: "The cambium represents reflection: the place where reading experiences became self-awareness. This is where logs, books, and frustrations turned into actual growth instead of just evidence of completion.",
    evidence: [
      "Weekly independent reading reflections",
      "Quarterly reflection",
      "Moments where I noticed patterns in myself"
    ],
    question: "When did reading stop being only an activity and start becoming evidence about who I am?"
  },
  branches: {
    title: "Branches: Reading Personality",
    body: "The branches represent the main directions my reading personality grew: study, individuality, escape, community, and friction. These are not separate trees. They are different extensions of the same central reading identity.",
    evidence: [
      "Reading as study",
      "Reading as individuality",
      "Reading as escape",
      "Reading as community",
      "Reading as friction"
    ],
    question: "What repeated patterns shaped my reading life more than any single book did?"
  },
  leaves: {
    title: "Leaves: Specific Books and Artifacts",
    body: "The leaves are the visible evidence of growth. Each cluster represents a book, series, reflection, or artifact. A leaf is not just decoration; it connects a specific reading experience to a larger branch of my reading personality.",
    evidence: [
      "Specific book titles",
      "Quotes from important books",
      "Finished and unfinished books",
      "Quarter 4 reading"
    ],
    question: "Which books or artifacts best prove the kind of reader I became?"
  },
  knots: {
    title: "Knots and Scars: Struggle",
    body: "The knots show that my reading growth was not smooth. Sometimes logs made reading artificial. Sometimes I avoided books, abandoned them, or returned to familiar books because they were easier to enter.",
    evidence: [
      "Unfinished books",
      "Inconsistent reading weeks",
      "Books that did not connect",
      "Moments when reading felt performative"
    ],
    question: "What struggles mattered because they revealed something true about how I read?"
  },
  apical: {
    title: "Apical Meristem: Still Becoming",
    body: "The apical meristem is the active growth point. It represents who I am becoming now, not a finished version of myself. My future reading life is still growing toward sharper interpretation and a better understanding of people.",
    evidence: [
      "Future reading goals",
      "Looking Forward section",
      "Unresolved questions about what role reading will play after this course"
    ],
    question: "What kind of thinker am I still growing into?"
  }
};

export const branchCards = [
  {
    title: "Reading as Study",
    body: "Reading as a tool for learning, discipline, and intellectual development.",
    leaves: ["Textbooks", "School readings", "Annotations", "Reading logs"]
  },
  {
    title: "Reading as Individuality",
    body: "Books that felt closest to my actual taste: sharper, darker, more intelligent, and less sanitized.",
    leaves: ["Prince of Thorns", "The Broken Empire series", "Quotes about worldview", "Character analysis"]
  },
  {
    title: "Reading as Escape",
    body: "Stories that let me step outside school, while still giving me something to analyze.",
    leaves: ["Fantasy series", "Rereads", "Comfort books", "Worldbuilding"]
  },
  {
    title: "Reading as Friction",
    body: "The part of my reading life shaped by inconsistency, abandoned books, and the difference between real reading and performed reading.",
    leaves: ["Unfinished books", "Hard weeks", "Forced reading", "Reading goals I did not fully meet"]
  }
];

export const leafAnatomy = [
  {
    part: "Cuticle",
    meaning: "The surface-level genre and plot: what the book seems to be about at first."
  },
  {
    part: "Upper Epidermis",
    meaning: "My first impression: the visible surface of my reaction before deeper analysis."
  },
  {
    part: "Mesophyll",
    meaning: "The deeper ideas inside the book: worldview, morality, identity, power, or human behavior."
  },
  {
    part: "Veins",
    meaning: "The quotes, scenes, or patterns that carried meaning into the rest of my thinking."
  },
  {
    part: "Stomata",
    meaning: "The places where outside perspectives entered and changed how I interpreted the story."
  },
  {
    part: "Chloroplasts",
    meaning: "The conversion point: where a book became insight instead of just information."
  }
];

export const leafClusters = [
  {
    id: "brokenEmpire",
    section: "leaves",
    branch: "individuality",
    label: "Broken Empire",
    x: 238,
    y: 190,
    count: 18,
    color: "#7ddc67"
  },
  {
    id: "schoolTexts",
    section: "leaves",
    branch: "study",
    label: "School / Logs",
    x: 612,
    y: 186,
    count: 15,
    color: "#b5d96c"
  },
  {
    id: "rereads",
    section: "leaves",
    branch: "escape",
    label: "Rereads",
    x: 163,
    y: 359,
    count: 14,
    color: "#4fc37a"
  },
  {
    id: "quarter4",
    section: "leaves",
    branch: "future",
    label: "Quarter 4",
    x: 710,
    y: 341,
    count: 13,
    color: "#8ce18e"
  },
  {
    id: "unfinished",
    section: "knots",
    branch: "friction",
    label: "Unfinished",
    x: 421,
    y: 322,
    count: 9,
    color: "#d9a441"
  }
];
