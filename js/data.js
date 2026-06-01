export const treeSections = {
  apical: {
    title: "Apical Meristem",
    biologicalDefinition:
      "Apical meristems are growth regions at the tips of roots and shoots. They produce primary growth, extending the plant body as roots reach new water and minerals and shoots extend toward light.",
    significance:
      "The apical meristem represents the part of my reading life that is still actively growing. I am not a finished reader. My future reading is still extending toward new questions, new genres, and a sharper understanding of how people think.",
    evidence: [
      {
        id: "apical1",
        title: "Future Reading Direction",
        type: "Reflection",
        text: "In the future, I want reading to remain an intellectual exercise that helps me understand people through the information they consume.",
        significance:
          "This shows that my reading life is still developing rather than ending with this course."
      }
    ]
  },

  trunk: {
    title: "Trunk",
    biologicalDefinition:
      "The stem supports the leaves and places them in favorable positions for exposure to light. It also conducts water and minerals upward through xylem and transports substances made in the leaves through phloem.",
    significance:
      "The trunk represents the stable center of my reading identity: I read to think. Whether I am reading fantasy, school texts, or reflections, my reading usually returns to analysis, worldview, intelligence, morality, and how people interpret the world.",
    evidence: [
      {
        id: "trunk1",
        title: "Reading as Intellectual Exercise",
        type: "Reflection",
        text: "My proposal explains that reading this year became less about fulfilling logs and more about figuring out why I read.",
        significance:
          "This is the central axis of the project: reading is not just completion, but a way of forming thought."
      }
    ]
  },

  taproot: {
    title: "Taproot",
    biologicalDefinition:
      "A taproot system forms from a strongly developed primary root and its branches. The primary root develops from the embryo’s radicle and anchors the plant deeply.",
    significance:
      "The taproot represents my deepest motivation for reading: understanding people through the information they consume. This year made me more aware that books do not just entertain people; they shape patterns of thought, empathy, suspicion, ambition, and identity.",
    evidence: [
      {
        id: "taproot1",
        title: "Central Motivation",
        type: "Reflection",
        text: "People are products of the information they consume, and a lot of that information comes from books.",
        significance:
          "This idea is the deepest root of the project because it explains why reading matters beyond school."
      }
    ]
  },

  lateralRoots: {
    title: "Lateral Roots",
    biologicalDefinition:
      "Lateral roots arise from inner tissues of roots. Together, roots anchor the plant and absorb water and minerals from the soil.",
    significance:
      "The lateral roots represent the smaller motivations that fed my reading life: school obligation, curiosity, escape, discipline, comfort, and identity. Some motivations were genuine, and some were forced, but all of them affected how I grew as a reader.",
    evidence: [
      {
        id: "lateralRoots1",
        title: "Mixed Motivations",
        type: "Reflection",
        text: "Some books were read because I chose them, while others were read because they were assigned, useful, or part of a goal.",
        significance:
          "These smaller reasons supported the larger reading identity even when they conflicted with each other."
      }
    ]
  }
};

export const branches = {
  study: {
    title: "Reading as Study",
    biologicalDefinition:
      "Branches are part of the shoot system, which includes stems and leaves. Stems raise leaves toward light and connect them to the plant’s vascular system.",
    significance:
      "This branch represents reading as learning, analysis, and intellectual development. These books shaped how I understand biology, chemistry, physics, medicine, history, psychology, and the world beyond English class.",
    clusters: ["scienceTextbooks", "readingToThink", "medicineNarrative"]
  },

  discipline: {
    title: "Reading as Discipline",
    biologicalDefinition:
      "Primary growth extends the plant body, while secondary growth thickens stems and roots over time. Growth is gradual, layered, and repeated.",
    significance:
      "This branch represents reading as habit, requirement, and effort. Not every book began with genuine interest. Some were assigned, logged, expensive enough that I felt obligated to read them, or interrupted before I could finish.",
    clusters: ["forcedReading", "moneyAndMotivation", "unfinishedReading"]
  },

  escape: {
    title: "Reading as Escape",
    biologicalDefinition:
      "Leaves are specialized photosynthetic organs. Stems position leaves so they can capture light, while vascular tissues connect the leaves to the rest of the plant.",
    significance:
      "This branch represents reading as entering another world. Fantasy and long series gave me distance from ordinary pressure, but escape was not the opposite of thinking. Often, distance made analysis easier.",
    clusters: ["fantasyWorlds", "seriesAndRereads", "optionalReading"]
  },

  community: {
    title: "Reading as Community",
    biologicalDefinition:
      "Roots, stems, and leaves are interconnected by a vascular system that transports water and food throughout the plant body.",
    significance:
      "This branch represents reading as connection: connection to childhood, my brother, classmates, school, shared fandoms, and inherited identity.",
    clusters: ["childhoodReading", "booksThroughFamily", "sharedReadingCultures", "identityAndHistory"]
  },

  individuality: {
    title: "Reading as Individuality",
    biologicalDefinition:
      "The shoot apical meristem repeatedly produces leaf primordia and bud primordia; bud primordia develop into lateral shoots.",
    significance:
      "This branch represents the most personal part of my reading life: the books that reveal my actual taste. I am drawn to darker, sharper, more psychologically realistic narratives that do not pretend people are perfectly righteous.",
    clusters: ["brokenEmpire", "darkNarrators", "transformationNarratives", "currentGrowth"]
  }
};

export const leafClusters = {
  scienceTextbooks: {
    title: "Science and Study Textbooks",
    branch: "study",
    significance:
      "This cluster shows reading as technical training. These books were not mainly emotional reading, but they shaped how I think: mechanistically, biologically, chemically, and structurally.",
    leaves: [
      {
        id: "scienceTextbooks1",
        title: "Campbell Biology",
        type: "Study book",
        text: "Campbell Biology was part of my biology background and helped build the broad conceptual base I use when thinking about life science.",
        significance:
          "This shows reading as study because it trained me to understand living systems through mechanisms, not just memorized facts."
      },
      {
        id: "scienceTextbooks2",
        title: "Raven Biology of Plants",
        type: "Study book",
        text: "Raven Biology of Plants became directly connected to this project because the tree metaphor comes from real plant anatomy and development.",
        significance:
          "This matters because my project does not use a tree only as decoration. The biology gives structure to the reflection."
      },
      {
        id: "scienceTextbooks3",
        title: "Anatomy and Physiology Texts",
        type: "Study book",
        text: "Patton & Thibodeau Anatomy and Physiology and Vander’s Human Physiology helped me read the body as a system of connected structures and functions.",
        significance:
          "These books connect to my interest in medicine and show reading as preparation for the kind of thinker I want to become."
      },
      {
        id: "scienceTextbooks4",
        title: "Genetics and Molecular Biology",
        type: "Study book",
        text: "Brooker Genetics and Alberts Molecular Biology helped me think about biology at the level of genes, cells, and molecular systems.",
        significance:
          "This shows how reading built the scientific framework I use outside English class."
      },
      {
        id: "scienceTextbooks5",
        title: "Chemistry and Physics Texts",
        type: "Study book",
        text: "Klein Organic Chemistry, Maitland Jones Organic Chemistry, Zumdahl Chemistry, Organic Chemistry for Dummies, and Walker Physics expanded my reading into chemistry and physics.",
        significance:
          "This matters because my reading life includes textbooks that help me build models of the world, not only novels that tell stories."
      },
      {
        id: "scienceTextbooks6",
        title: "The Unfinished Nation",
        type: "Study book",
        text: "The Unfinished Nation was part of my APUSH reading and helped connect my reading life to history.",
        significance:
          "This shows that study reading was not limited to science, even though science is the strongest part of my academic identity."
      }
    ]
  },

  readingToThink: {
    title: "Reading to Think Better",
    branch: "study",
    significance:
      "This cluster represents books I read because I wanted to understand reasoning, prediction, psychology, and how people make decisions.",
    leaves: [
      {
        id: "readingToThink1",
        title: "Causal Models",
        type: "Book",
        text: "I bought Causal Models on a trip to Brown University because it was written by a professor there and connected to my growing interest in psychology and decision-making.",
        significance:
          "This book shows reading as intellectual self-construction. Even though part of my motivation was that I did not want a forty-dollar book to go to waste, it became part of my interest in how people reason."
      }
    ]
  },

  medicineNarrative: {
    title: "Medicine, Narrative, and Identity",
    branch: "study",
    significance:
      "This cluster shows how assigned reading became personally meaningful because it connected to medicine, writing, and the life I imagine for myself.",
    leaves: [
      {
        id: "medicineNarrative1",
        title: "When Breath Becomes Air",
        type: "Assigned book",
        text: "When Breath Becomes Air was assigned, but it mattered to me because Paul Kalanithi was a neurosurgeon and I also have an interest in medicine and neuroscience.",
        significance:
          "The book taught me about medicine and mortality, but it also taught me how a scientific life can become an emotionally powerful narrative."
      },
      {
        id: "medicineNarrative2",
        title: "Narrative Strategy",
        type: "Reflection",
        text: "After reading Kalanithi’s writing, I kept using some of his narrative strategies in my practice college essays.",
        significance:
          "This matters because the book changed not only what I thought about medicine, but also how I thought about writing."
      }
    ]
  },

  forcedReading: {
    title: "Forced Reading That Became Real",
    branch: "discipline",
    significance:
      "This cluster shows that required or pressured reading can still become authentic interest.",
    leaves: [
      {
        id: "forcedReading1",
        title: "Six of Crows",
        type: "Forced reading",
        text: "Six of Crows began as forced reading. I recognized it in the school library and ended up liking it more than I expected.",
        significance:
          "This matters because it shows that school pressure and real interest are not always separate. Sometimes a required book becomes a book I actually care about."
      },
      {
        id: "forcedReading2",
        title: "Spoiled Sequel",
        type: "Reflection",
        text: "I did not read the next book partly because a classmate spoiled parts of it, which made me less motivated even though I still want to read it.",
        significance:
          "This shows that reading motivation is fragile and social. Other people can shape not only what I read, but whether I keep reading."
      }
    ]
  },

  moneyAndMotivation: {
    title: "Money and Motivation",
    branch: "discipline",
    significance:
      "This cluster shows that reading motivation is not always noble. Sometimes discipline comes from not wanting effort, money, or opportunity to go to waste.",
    leaves: [
      {
        id: "moneyAndMotivation1",
        title: "Causal Models",
        type: "Book",
        text: "Causal Models was a relatively small book that cost around forty dollars, so part of my motivation was that I did not want the money to be wasted.",
        significance:
          "This is honest evidence of discipline: sometimes I read because of curiosity, and sometimes I read because I already committed resources to the book."
      }
    ]
  },

  unfinishedReading: {
    title: "Books Interrupted or Left Unfinished",
    branch: "discipline",
    significance:
      "This cluster shows that unfinished reading still matters. A book can reveal something about identity, history, or circumstance even if I do not finish it.",
    leaves: [
      {
        id: "unfinishedReading1",
        title: "The Hidden History of Burma",
        type: "Unfinished book",
        text: "The Hidden History of Burma mattered because I am Burmese and did not grow up with a strong knowledge of Burmese history, but difficult circumstances made me drop the book.",
        significance:
          "This shows that reading growth is not always clean or complete. Sometimes an unfinished book still reveals a gap I want to understand."
      }
    ]
  },

  fantasyWorlds: {
    title: "Fantasy Worlds",
    branch: "escape",
    significance:
      "This cluster shows how fantasy lets me enter worlds outside ordinary school pressure while still thinking about power, identity, and conflict.",
    leaves: [
      {
        id: "fantasyWorlds1",
        title: "Wings of Fire",
        type: "Book",
        text: "Wings of Fire connects to childhood reading and the kind of fantasy world I entered when I was younger.",
        significance:
          "This matters because childhood fantasy did not disappear from my reading identity. It became one root of how I understand reading as escape."
      },
      {
        id: "fantasyWorlds2",
        title: "Keeper of the Lost Cities",
        type: "Book",
        text: "Keeper of the Lost Cities connected to childhood, fantasy, and the feeling of returning to a long-running fictional world.",
        significance:
          "This shows reading as escape because the series created a world that people could keep returning to over time."
      }
    ]
  },

  seriesAndRereads: {
    title: "Series and Rereads",
    branch: "escape",
    significance:
      "This cluster represents long-form reading experiences where returning to a world matters as much as the plot itself.",
    leaves: [
      {
        id: "seriesAndRereads1",
        title: "The Broken Empire Series",
        type: "Series",
        text: "The Broken Empire series gave me a world I could return to, even though it was darker and less comforting than most fantasy.",
        significance:
          "This shows that escape does not have to mean comfort. Sometimes I escape into books because they are intense, intelligent, and morally uncomfortable."
      },
      {
        id: "seriesAndRereads2",
        title: "Keeper of the Lost Cities Delay",
        type: "Reflection",
        text: "Shannon Messenger took so long to release the last book that I forgot parts of the plot.",
        significance:
          "This shows the strange community and memory side of long series: they can become part of your life long enough that waiting itself becomes part of the reading experience."
      }
    ]
  },

  optionalReading: {
    title: "Optional Reading",
    branch: "escape",
    significance:
      "This cluster shows what I chose when reading became less required and more voluntary.",
    leaves: [
      {
        id: "optionalReading1",
        title: "The Count of Monte Cristo",
        type: "Optional Q4 reading",
        text: "I chose The Count of Monte Cristo because reading was optional in Quarter 4 and my physics teacher told me classics were worth reading.",
        significance:
          "This matters because it shows what I chose when I had more freedom: a classic about betrayal, revenge, patience, and transformation."
      }
    ]
  },

  childhoodReading: {
    title: "Childhood Reading",
    branch: "community",
    significance:
      "This cluster connects my present reading life to younger versions of myself.",
    leaves: [
      {
        id: "childhoodReading1",
        title: "Wings of Fire",
        type: "Childhood book",
        text: "Wings of Fire belongs here because it connects to childhood reading and an earlier version of my reading identity.",
        significance:
          "This matters because reading is not only about the books I choose now. It also includes books that shaped what reading felt like when I was younger."
      },
      {
        id: "childhoodReading2",
        title: "Keeper of the Lost Cities",
        type: "Childhood book",
        text: "Keeper of the Lost Cities connects to childhood and to the experience of growing up with a series over time.",
        significance:
          "This shows how a book can become part of memory, not just entertainment."
      }
    ]
  },

  booksThroughFamily: {
    title: "Books Through Family",
    branch: "community",
    significance:
      "This cluster shows that reading can spread through family, not just school or private choice.",
    leaves: [
      {
        id: "booksThroughFamily1",
        title: "Let the Sky Fall",
        type: "Book",
        text: "I read Let the Sky Fall because my brother was reading it.",
        significance:
          "This matters because the book entered my reading life through family, showing that reading can be social even before discussion."
      },
      {
        id: "booksThroughFamily2",
        title: "Keeper of the Lost Cities",
        type: "Book",
        text: "My brother was also reading Keeper of the Lost Cities, which made the series part of a shared reading environment.",
        significance:
          "This shows reading as community because the book connected my reading life with someone close to me."
      }
    ]
  },

  sharedReadingCultures: {
    title: "Shared Reading Cultures",
    branch: "community",
    significance:
      "This cluster shows that some books matter because a lot of people read them, remember them, and talk about them.",
    leaves: [
      {
        id: "sharedReadingCultures1",
        title: "Keeper of the Lost Cities Community",
        type: "Book community",
        text: "I realized there was a real community around Keeper of the Lost Cities because so many people had read it.",
        significance:
          "This matters because reading was not only private. The series connected to a larger group of readers who shared the same world."
      },
      {
        id: "sharedReadingCultures2",
        title: "Six of Crows in School",
        type: "School-library book",
        text: "Six of Crows was a book I recognized in the school library, and it became connected to school and classmates.",
        significance:
          "This shows how a book can move through a school community, even when that community also affects the reading experience through spoilers."
      }
    ]
  },

  identityAndHistory: {
    title: "Identity and Inherited History",
    branch: "community",
    significance:
      "This cluster shows reading as a way to recover history and identity that family or school did not fully transmit.",
    leaves: [
      {
        id: "identityAndHistory1",
        title: "The Hidden History of Burma",
        type: "Identity-history book",
        text: "I am Burmese, but because the Burmese education system separated students into STEM and humanities tracks, my mother did not learn much history, so neither did I.",
        significance:
          "This matters because the book represented an attempt to understand a part of my identity that I did not automatically inherit."
      }
    ]
  },

  brokenEmpire: {
    title: "The Broken Empire Series",
    branch: "individuality",
    significance:
      "This cluster shows the clearest part of my individual reading taste: darker, sharper, more intelligent, and less sanitized books.",
    leaves: [
      {
        id: "brokenEmpire1",
        title: "Prince of Thorns",
        type: "Book",
        text: "Prince of Thorns introduces Jorg as a young narrator who is not innocent, simple, or passive.",
        significance:
          "This matters because it showed me that I am drawn to narrators who are intelligent, morally uncomfortable, and difficult to reduce to clean categories."
      },
      {
        id: "brokenEmpire2",
        title: "King of Thorns",
        type: "Book",
        text: "King of Thorns continues the series’ focus on memory, ambition, survival, and power.",
        significance:
          "This showed that my interest was not just in the plot. I was returning to the narrator’s worldview."
      },
      {
        id: "brokenEmpire3",
        title: "Emperor of Thorns",
        type: "Book",
        text: "Emperor of Thorns was the book I chose myself and loved most from the series because it felt filled with more realistic life lessons.",
        significance:
          "This matters because it helped me understand why I prefer books that do not pretend people are morally simple or perfectly righteous."
      }
    ]
  },

  darkNarrators: {
    title: "Dark Narrators and Realistic Worldviews",
    branch: "individuality",
    significance:
      "This cluster represents my preference for narrators who think sharply but do not have clean or comforting moral perspectives.",
    leaves: [
      {
        id: "darkNarrators1",
        title: "Unrealistic Righteous Heroes",
        type: "Reflection",
        text: "Many books rely on a righteous hero who always chooses the morally clean path, but that kind of character often feels unrealistic to me.",
        significance:
          "This matters because it reveals one of my strongest reading preferences: I am more interested in characters who feel psychologically possible than characters who are morally perfect."
      },
      {
        id: "darkNarrators2",
        title: "Not a Righteous Hero",
        type: "Reflection",
        text: "I do not see myself as a perfectly righteous hero either, which may be part of why darker narrators feel more believable to me.",
        significance:
          "This connects reading to self-understanding because my taste in narrators reflects how I see people and myself."
      }
    ]
  },

  transformationNarratives: {
    title: "Transformation and Loss of Naivety",
    branch: "individuality",
    significance:
      "This cluster shows my interest in characters who change from naive or open into darker, more suspicious versions of themselves.",
    leaves: [
      {
        id: "transformationNarratives1",
        title: "The Count of Monte Cristo",
        type: "Optional Q4 reading",
        text: "I enjoyed The Count of Monte Cristo partly because Edmond Dantès begins as naive and good but becomes darker after betrayal.",
        significance:
          "This mattered to me because I connected to the idea of losing some earlier openness and becoming more guarded over time."
      }
    ]
  },

  currentGrowth: {
    title: "Current Growth",
    branch: "individuality",
    significance:
      "This cluster shows what I am reading now and where my reading life is still growing.",
    leaves: [
      {
        id: "currentGrowth1",
        title: "The Dancing Wu Li Masters",
        type: "Currently reading",
        text: "The Dancing Wu Li Masters was recommended by an Organic Chemistry professor at Northwestern because it makes quantum physics more accessible to the general public.",
        significance:
          "This matters because it shows my reading moving toward interdisciplinary thinking: physics, chemistry, perspective, and the attempt to understand abstract ideas in a more intuitive way."
      }
    ]
  }
};
