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
      "This branch represents reading as learning, analysis, and intellectual development. It is the part of my reading life connected to school, annotation, structure, and using texts as tools for thought.",
    clusters: ["studyLogs", "studyAnnotations", "studySchoolTexts"]
  },

  discipline: {
    title: "Reading as Discipline",
    biologicalDefinition:
      "Primary growth extends the plant body, while secondary growth thickens stems and roots over time. Growth is gradual, layered, and repeated.",
    significance:
      "This branch represents reading as habit and routine. Logs, goals, and weekly expectations gave my reading structure, but they also created tension because reading became something measurable and sometimes performative.",
    clusters: ["disciplineGoals", "disciplineWeeks"]
  },

  escape: {
    title: "Reading as Escape",
    biologicalDefinition:
      "Leaves are specialized photosynthetic organs. Stems position leaves so they can capture light, while vascular tissues connect the leaves to the rest of the plant.",
    significance:
      "This branch represents reading as escape into another world. Fantasy and rereading gave me distance from school, but the escape was not mindless; it still made me analyze power, survival, loyalty, morality, and identity.",
    clusters: ["escapeFiction", "escapeSeries", "escapeComfort"]
  },

  community: {
    title: "Reading as Community",
    biologicalDefinition:
      "Roots, stems, and leaves are interconnected by a vascular system that transports water and food throughout the plant body.",
    significance:
      "This branch represents reading as connection: connection to earlier versions of myself, to class discussions, to shared stories, and to the communities that form around certain books.",
    clusters: ["communityIdentity", "communityMemory", "communityClass"]
  },

  individuality: {
    title: "Reading as Individuality",
    biologicalDefinition:
      "The shoot apical meristem repeatedly produces leaf primordia and bud primordia; bud primordia develop into lateral shoots.",
    significance:
      "This branch represents the most personal part of my reading life: the books that reflect my actual taste. I am drawn to sharper, darker, more intelligent narrators and stories that do not simplify people into clean heroes or victims.",
    clusters: ["brokenEmpire", "darkNarrators", "booksLeftBehind", "quarter4Reading"]
  }
};

export const leafClusters = {
  studyLogs: {
    title: "Reading Logs",
    branch: "study",
    significance:
      "This cluster shows reading as something measured and tracked. Logs helped create structure, but they also made reading feel like something I had to prove.",
    leaves: [
      {
        id: "studyLogs1",
        title: "Weekly Reading Log",
        type: "Reading log",
        text: "My weekly logs recorded the visible part of my reading life: time, pages, titles, and completion.",
        significance:
          "This matters because the logs show reading as discipline, but they do not fully explain why the reading mattered."
      },
      {
        id: "studyLogs2",
        title: "Quarter Reflection",
        type: "Reflection",
        text: "My reflections helped me move beyond simply recording reading and toward understanding patterns in my habits.",
        significance:
          "This shows the difference between reading as completion and reading as self-awareness."
      }
    ]
  },

  studyAnnotations: {
    title: "Annotations and Reflections",
    branch: "study",
    significance:
      "This cluster shows reading as analysis. Annotations and reflections turned books into objects I could question, dissect, and connect to larger ideas.",
    leaves: [
      {
        id: "studyAnnotations1",
        title: "Analytical Reading",
        type: "Reflection",
        text: "When I annotated or reflected, I was not just reading for plot. I was looking for patterns, meaning, and the author’s choices.",
        significance:
          "This connects to reading as study because it shows how reading became an intellectual exercise."
      },
      {
        id: "studyAnnotations2",
        title: "Marked Passages",
        type: "Annotation",
        text: "Certain passages stood out because they revealed a character’s worldview, an author’s structure, or an idea I wanted to return to.",
        significance:
          "This matters because annotation turned reading into an active process instead of passive consumption."
      }
    ]
  },

  studySchoolTexts: {
    title: "School Texts",
    branch: "study",
    significance:
      "This cluster represents the books and texts I read because school required them. They shaped my reading life even when they were not chosen freely.",
    leaves: [
      {
        id: "studySchoolTexts1",
        title: "Required Reading",
        type: "Book",
        text: "Assigned texts gave my reading life structure and forced me to engage with books I may not have chosen on my own.",
        significance:
          "This matters because school reading expanded my reading life, but also created tension between authentic reading and performed reading."
      }
    ]
  },

  disciplineGoals: {
    title: "Reading Goals",
    branch: "discipline",
    significance:
      "This cluster shows reading as something I tried to control through goals, routines, and expectations.",
    leaves: [
      {
        id: "disciplineGoals1",
        title: "Original Reading Goals",
        type: "Reflection",
        text: "At the beginning of the year, I had goals for my reading life that made reading feel measurable and intentional.",
        significance:
          "This shows discipline because goals helped organize my reading, even when they did not capture the full meaning of it."
      },
      {
        id: "disciplineGoals2",
        title: "Reading as a Habit",
        type: "Reflection",
        text: "Reading was not always something I did naturally. Sometimes it had to be turned into a habit before it could become meaningful.",
        significance:
          "This matters because discipline is not always emotional or inspiring; sometimes it is just the repeated decision to return to the page."
      }
    ]
  },

  disciplineWeeks: {
    title: "Inconsistent Weeks",
    branch: "discipline",
    significance:
      "This cluster shows that my reading life was not perfectly consistent. The inconsistency mattered because it revealed what actually motivated me.",
    leaves: [
      {
        id: "disciplineWeeks1",
        title: "Reading Felt Forced",
        type: "Reflection",
        text: "Some weeks, reading felt more like something I had to report than something I naturally wanted to do.",
        significance:
          "This matters because honest growth includes friction, not just success."
      },
      {
        id: "disciplineWeeks2",
        title: "The Gap Between Logs and Meaning",
        type: "Reflection",
        text: "The number of pages or hours could show that I read, but it could not always show what the reading actually did for me.",
        significance:
          "This explains why discipline alone cannot define my reading life."
      }
    ]
  },

  escapeFiction: {
    title: "Fantasy Worlds",
    branch: "escape",
    significance:
      "This cluster shows reading as escape into other worlds, especially through fantasy.",
    leaves: [
      {
        id: "escapeFiction1",
        title: "Fantasy as Distance",
        type: "Book",
        text: "Fantasy let me step outside ordinary school routines and enter worlds with different rules, conflicts, and stakes.",
        significance:
          "This matters because escape was not mindless. Distance from reality made it easier to think about power, survival, loyalty, and identity."
      }
    ]
  },

  escapeSeries: {
    title: "Series and Sagas",
    branch: "escape",
    significance:
      "This cluster represents long-form reading experiences where I stayed inside one world across multiple books.",
    leaves: [
      {
        id: "escapeSeries1",
        title: "The Broken Empire Series",
        type: "Book",
        text: "Rereading or returning to a series gave me a familiar world to enter while still giving me complex ideas to analyze.",
        significance:
          "This shows that escape and analysis can happen at the same time."
      },
      {
        id: "escapeSeries2",
        title: "Returning to One World",
        type: "Reflection",
        text: "A series lets a reader return to the same world repeatedly instead of starting over every time.",
        significance:
          "This matters because repeated return shows what kinds of worlds and conflicts continue to hold my attention."
      }
    ]
  },

  escapeComfort: {
    title: "Comfort Rereads",
    branch: "escape",
    significance:
      "This cluster shows how rereading can be a form of comfort, control, and return.",
    leaves: [
      {
        id: "escapeComfort1",
        title: "Returning to Familiar Books",
        type: "Reflection",
        text: "Some books were easier to return to because I already knew the world, the voice, and the kind of thinking they demanded.",
        significance:
          "This matters because rereading shows what kinds of stories I continue to find meaningful."
      }
    ]
  },

  communityIdentity: {
    title: "Original Reading Identity",
    branch: "community",
    significance:
      "This cluster connects my current reading life to earlier versions of myself.",
    leaves: [
      {
        id: "communityIdentity1",
        title: "Original Reading Identity Project",
        type: "Reflection",
        text: "My original Reading Identity Project showed how I understood myself as a reader before this final reflection.",
        significance:
          "This matters because it gives the project a starting point and shows what changed or stayed the same."
      }
    ]
  },

  communityMemory: {
    title: "Books Connected to Memory",
    branch: "community",
    significance:
      "This cluster shows that reading is not only private. Some books matter because they connect to earlier memories, younger versions of myself, or shared experiences.",
    leaves: [
      {
        id: "communityMemory1",
        title: "Earlier Reading Self",
        type: "Reflection",
        text: "Some books matter because they connect me to who I was when I first read them.",
        significance:
          "This shows community as connection across time, not just connection with other people."
      }
    ]
  },

  communityClass: {
    title: "Class and Shared Reading",
    branch: "community",
    significance:
      "This cluster represents reading shaped by discussion, assignments, and the shared environment of class.",
    leaves: [
      {
        id: "communityClass1",
        title: "Class Reading Environment",
        type: "Reflection",
        text: "Reading this year happened inside a class structure, where books, logs, and reflections were part of a shared system.",
        significance:
          "This matters because my reading life was shaped by the people and expectations around it."
      }
    ]
  },

  brokenEmpire: {
    title: "The Broken Empire Series",
    branch: "individuality",
    significance:
      "This cluster shows the clearest part of my individual reading taste: sharper, darker, more intelligent, and less sanitized books.",
    leaves: [
      {
        id: "brokenEmpire1",
        title: "Prince of Thorns",
        type: "Book",
        text: "Prince of Thorns stood out because it had a young narrator who was not innocent, simple, or passive.",
        significance:
          "This matters because it showed me that I am drawn to narrators who are intelligent, morally uncomfortable, and difficult to reduce to clean categories."
      },
      {
        id: "brokenEmpire2",
        title: "King of Thorns",
        type: "Book",
        text: "King of Thorns continued the series’ focus on memory, ambition, survival, and power.",
        significance:
          "This showed that my interest was not just in the plot, but in the narrator’s worldview."
      },
      {
        id: "brokenEmpire3",
        title: "Emperor of Thorns",
        type: "Book",
        text: "Emperor of Thorns completed the trilogy and pushed the narrator’s darker worldview toward a larger conclusion.",
        significance:
          "This matters because finishing the trilogy helped me understand why I return to books that refuse to make people morally simple."
      }
    ]
  },

  darkNarrators: {
    title: "Intelligent but Dark Narrators",
    branch: "individuality",
    significance:
      "This cluster represents my preference for narrators who think sharply but do not have clean or comforting moral perspectives.",
    leaves: [
      {
        id: "darkNarrators1",
        title: "Young but Not Naive",
        type: "Reflection",
        text: "I noticed that one reason The Broken Empire stood out to me was that the child narrator was intelligent and negative rather than innocent or simplified.",
        significance:
          "This matters because it helped me understand a specific part of my reading taste: I prefer characters whose minds are complicated, uncomfortable, and difficult to sanitize."
      }
    ]
  },

  booksLeftBehind: {
    title: "Books I Left Behind",
    branch: "individuality",
    significance:
      "This cluster shows that abandoning a book can also reveal reading identity.",
    leaves: [
      {
        id: "booksLeftBehind1",
        title: "Unfinished Book",
        type: "Abandoned book",
        text: "Some books did not connect with me enough to finish.",
        significance:
          "This matters because choosing not to continue a book shows that reading identity is also shaped by rejection, not only completion."
      }
    ]
  },

  quarter4Reading: {
    title: "Quarter 4 Reading",
    branch: "individuality",
    significance:
      "This cluster shows the most recent version of my reading life and points toward where it may continue.",
    leaves: [
      {
        id: "quarter4Reading1",
        title: "Quarter 4 Book",
        type: "Quarter 4 reading",
        text: "My Quarter 4 reading belongs here because it shows the reader I am closest to becoming now.",
        significance:
          "This matters because the final quarter is not just an ending; it is evidence of the direction my reading life is moving."
      }
    ]
  }
};
