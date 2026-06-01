/* =============================================================================
   Reading Tree — CONTENT FILE
   =============================================================================
   THIS IS THE ONLY FILE YOU NEED TO EDIT TO CHANGE THE CONTENT OF THE SITE.

   Everything the tree displays comes from the three objects below:

     1. treeSections   -> apical meristem, trunk, taproot, lateral roots
     2. branches       -> the five main branches and which clusters live on them
     3. leafClusters   -> the leaf clusters and the individual evidence leaves

   You never have to touch TreeDiagram.js. The diagram lays everything out
   automatically. Add or remove items here and the website updates itself.

   QUICK GUIDE
   -----------
   • Add a NEW EVIDENCE LEAF: add another { ... } object to a cluster's `leaves`
     array. Give it a unique `id`. That's it.
   • Add a NEW LEAF CLUSTER: (a) add a new entry to `leafClusters`, then
     (b) add its key to the `clusters` array of the branch it belongs to.
   • Change wording: edit `title`, `biologicalDefinition`, `significance`, `text`.

   `type` for a leaf can be anything, e.g.:
     "Book", "Quote", "Reading log", "Reflection", "Abandoned book",
     "Quarter 4 reading".
   ============================================================================= */


/* -----------------------------------------------------------------------------
   1) TREE STRUCTURES (not branches)
   These four parts are clickable in the whole-tree view and simply update the
   side panel. Put supporting evidence in `evidence` if you want it listed
   (leave the array empty to hide the list).
   --------------------------------------------------------------------------- */
export const treeSections = {
  apical: {
    title: "Apical Meristem",
    biologicalDefinition:
      "The apical meristem is the region of actively dividing cells at the very tip of the shoot. It is where new growth originates and where the plant decides its future direction.",
    significance:
      "This represents the growing edge of the reader's life — the books not yet read, the questions still forming, and the direction this reader is still choosing to grow toward.",
    evidence: [
      // Optional. Each item: { title, type, text, significance }
      {
        id: "apical1",
        title: "Currently Reading",
        type: "Quarter 4 reading",
        text: "Placeholder for the book this reader is in the middle of right now.",
        significance: "Placeholder explanation of why this in-progress reading shows active growth."
      }
    ]
  },

  trunk: {
    title: "Trunk",
    biologicalDefinition:
      "The trunk is the central supporting axis of the tree. It carries water and nutrients between the roots and the canopy and gives the whole organism its structure.",
    significance:
      "The trunk represents the reader's core identity as a reader — the central self that every branch of their reading life grows out of and connects back to.",
    evidence: []
  },

  taproot: {
    title: "Taproot",
    biologicalDefinition:
      "The taproot is the single dominant root that grows straight down, anchoring the tree and reaching deep water sources.",
    significance:
      "The taproot represents the earliest, deepest reading memory — the first book or first reader who anchored this person's relationship with reading.",
    evidence: [
      {
        id: "taproot1",
        title: "The First Book",
        type: "Reflection",
        text: "Placeholder for the earliest book this reader remembers loving.",
        significance: "Placeholder for why this first reading experience runs deepest."
      }
    ]
  },

  lateralRoots: {
    title: "Lateral Roots",
    biologicalDefinition:
      "Lateral roots spread outward from the base of the tree, drawing in nutrients from a wide area and stabilizing the tree against wind.",
    significance:
      "The lateral roots represent the many people and places that fed this reader early on — family, teachers, libraries, and friends who spread reading through their life.",
    evidence: []
  }
};


/* -----------------------------------------------------------------------------
   2) BRANCHES
   The five main branches. Each branch lists the cluster keys that grow on it
   in `clusters`. Add a key here (that also exists in leafClusters below) and a
   new leaf cluster appears on that branch automatically.
   --------------------------------------------------------------------------- */
export const branches = {
  study: {
    title: "Reading as Study",
    biologicalDefinition:
      "A major branch growing toward strong light — heavily leafed because it does much of the tree's productive work.",
    significance:
      "Reading done to learn, analyze, and understand. This is reading as an academic and intellectual tool.",
    clusters: ["studyLogs", "studyAnnotations", "studySchoolTexts"]
  },

  discipline: {
    title: "Reading as Discipline",
    biologicalDefinition:
      "A sturdy lower branch that thickens steadily over many seasons, adding a ring of growth at a time.",
    significance:
      "Reading as a habit and a practice — the steady, sometimes effortful work of returning to the page again and again.",
    clusters: ["disciplineGoals", "disciplineWeeks"]
  },

  escape: {
    title: "Reading as Escape",
    biologicalDefinition:
      "A tall branch reaching up and away from the trunk, its leaves catching light far from the center.",
    significance:
      "Reading for immersion, comfort, and pleasure — the books that carry this reader out of their own world and into another.",
    clusters: ["escapeFiction", "escapeSeries", "escapeComfort"]
  },

  community: {
    title: "Reading as Community",
    biologicalDefinition:
      "A branch whose leaves overlap with those of neighboring trees, sharing light and shelter.",
    significance:
      "Reading shared with others — books passed between friends, discussed, recommended, and read together.",
    clusters: ["communityBookClub", "communityShared", "communityRecommendations"]
  },

  individuality: {
    title: "Reading as Individuality",
    biologicalDefinition:
      "A branch that grows in its own distinctive direction, unlike any other branch on the tree.",
    significance:
      "Reading that belongs to this reader alone — the personal, unexpected, and even abandoned choices that make this reading life unique.",
    clusters: ["individualityChoices", "individualityAbandoned", "individualityQuarter4"]
  }
};


/* -----------------------------------------------------------------------------
   3) LEAF CLUSTERS + EVIDENCE LEAVES
   Each cluster belongs to one branch (see `branch`). Each leaf is one piece of
   evidence. Add or remove leaves freely — the layout adjusts on its own.

   OPTIONAL: a leaf may include custom { x, y } in the range 0..1 to override
   its automatic position inside the cluster. You almost never need this.
   --------------------------------------------------------------------------- */
export const leafClusters = {
  /* ---- Branch: Reading as Study ---- */
  studyLogs: {
    title: "Reading Logs",
    branch: "study",
    significance: "Logs show reading as measurable, deliberate work over time.",
    leaves: [
      {
        id: "studyLogs1",
        title: "Weekly Log — September",
        type: "Reading log",
        text: "Placeholder for a week's worth of logged pages and titles.",
        significance: "Placeholder for why consistent logging reflects study habits."
      },
      {
        id: "studyLogs2",
        title: "Quarter Reflection",
        type: "Reflection",
        text: "Placeholder evidence text reflecting on a quarter of study reading.",
        significance: "Placeholder explanation of why this evidence matters."
      }
    ]
  },

  studyAnnotations: {
    title: "Annotations",
    branch: "study",
    significance: "Margin notes reveal active, analytical engagement with a text.",
    leaves: [
      {
        id: "studyAnnotations1",
        title: "Annotated Chapter",
        type: "Book",
        text: "Placeholder for a heavily annotated assigned text.",
        significance: "Placeholder for why close annotation demonstrates study."
      },
      {
        id: "studyAnnotations2",
        title: "Key Quote",
        type: "Quote",
        text: "\"Placeholder for a quotation the reader marked and analyzed.\"",
        significance: "Placeholder for why this quotation was worth marking."
      }
    ]
  },

  studySchoolTexts: {
    title: "School Texts",
    branch: "study",
    significance: "Assigned texts anchor the reader in a shared academic canon.",
    leaves: [
      {
        id: "studySchoolTexts1",
        title: "Assigned Novel",
        type: "Book",
        text: "Placeholder for a required reading from class.",
        significance: "Placeholder for why this assigned book shaped the reader."
      }
    ]
  },

  /* ---- Branch: Reading as Discipline ---- */
  disciplineGoals: {
    title: "Reading Goals",
    branch: "discipline",
    significance: "Goals turn reading into an intentional, tracked practice.",
    leaves: [
      {
        id: "disciplineGoals1",
        title: "Books-Per-Month Goal",
        type: "Reflection",
        text: "Placeholder for a personal reading target and progress.",
        significance: "Placeholder for why setting goals shows discipline."
      },
      {
        id: "disciplineGoals2",
        title: "Page Streak",
        type: "Reading log",
        text: "Placeholder for a streak of consecutive days reading.",
        significance: "Placeholder for why consistency matters here."
      }
    ]
  },

  disciplineWeeks: {
    title: "Steady Weeks",
    branch: "discipline",
    significance: "Ordinary weeks of reading add up like growth rings.",
    leaves: [
      {
        id: "disciplineWeeks1",
        title: "An Unremarkable Week",
        type: "Reading log",
        text: "Placeholder for a normal week of reading that still counted.",
        significance: "Placeholder for why even routine reading builds the trunk."
      }
    ]
  },

  /* ---- Branch: Reading as Escape ---- */
  escapeFiction: {
    title: "Worlds to Enter",
    branch: "escape",
    significance: "Immersive fiction offers a doorway out of the everyday.",
    leaves: [
      {
        id: "escapeFiction1",
        title: "A Book I Disappeared Into",
        type: "Book",
        text: "Placeholder for a novel that fully absorbed the reader.",
        significance: "Placeholder for why total immersion mattered."
      },
      {
        id: "escapeFiction2",
        title: "Late-Night Quote",
        type: "Quote",
        text: "\"Placeholder for a line read at 2am that kept the reader turning pages.\"",
        significance: "Placeholder for why this line captured escape."
      }
    ]
  },

  escapeSeries: {
    title: "Series & Sagas",
    branch: "escape",
    significance: "Long series sustain escape across many books.",
    leaves: [
      {
        id: "escapeSeries1",
        title: "The Series I Finished",
        type: "Book",
        text: "Placeholder for a multi-book series the reader stayed with.",
        significance: "Placeholder for why committing to a saga reflects escape."
      }
    ]
  },

  escapeComfort: {
    title: "Comfort Re-Reads",
    branch: "escape",
    significance: "Re-reading a familiar book is escape into a safe place.",
    leaves: [
      {
        id: "escapeComfort1",
        title: "The Book I Re-Read",
        type: "Book",
        text: "Placeholder for a comfort read returned to many times.",
        significance: "Placeholder for why re-reading offers comfort."
      },
      {
        id: "escapeComfort2",
        title: "Why I Return To It",
        type: "Reflection",
        text: "Placeholder reflection on the pull of a comfort book.",
        significance: "Placeholder for why this re-reading matters."
      }
    ]
  },

  /* ---- Branch: Reading as Community ---- */
  communityBookClub: {
    title: "Book Club",
    branch: "community",
    significance: "Reading discussed aloud becomes a shared experience.",
    leaves: [
      {
        id: "communityBookClub1",
        title: "Club Pick",
        type: "Book",
        text: "Placeholder for a book read with a club or group.",
        significance: "Placeholder for why reading together changed the book."
      }
    ]
  },

  communityShared: {
    title: "Shared Reads",
    branch: "community",
    significance: "Books passed between people carry relationships with them.",
    leaves: [
      {
        id: "communityShared1",
        title: "A Friend's Copy",
        type: "Book",
        text: "Placeholder for a book lent by a friend.",
        significance: "Placeholder for why a borrowed book carries meaning."
      },
      {
        id: "communityShared2",
        title: "Quote We Both Loved",
        type: "Quote",
        text: "\"Placeholder for a passage two readers shared.\"",
        significance: "Placeholder for why this shared passage mattered."
      }
    ]
  },

  communityRecommendations: {
    title: "Recommendations",
    branch: "community",
    significance: "Recommendations weave readers' lives together.",
    leaves: [
      {
        id: "communityRecommendations1",
        title: "A Book Someone Pressed On Me",
        type: "Reflection",
        text: "Placeholder for a recommendation that stuck.",
        significance: "Placeholder for why this recommendation mattered."
      }
    ]
  },

  /* ---- Branch: Reading as Individuality ---- */
  individualityChoices: {
    title: "My Own Choices",
    branch: "individuality",
    significance: "Self-chosen books reveal a reader's distinct taste.",
    leaves: [
      {
        id: "individualityChoices1",
        title: "A Book No One Recommended",
        type: "Book",
        text: "Placeholder for a book the reader found entirely on their own.",
        significance: "Placeholder for why this independent choice matters."
      }
    ]
  },

  individualityAbandoned: {
    title: "Books I Left Behind",
    branch: "individuality",
    significance: "Choosing to stop reading is its own act of identity.",
    leaves: [
      {
        id: "individualityAbandoned1",
        title: "The Book I Didn't Finish",
        type: "Abandoned book",
        text: "Placeholder for a book the reader chose to set down.",
        significance: "Placeholder for why abandoning it was the right choice."
      },
      {
        id: "individualityAbandoned2",
        title: "Why I Stopped",
        type: "Reflection",
        text: "Placeholder reflection on deciding to quit a book.",
        significance: "Placeholder for why this decision reflects individuality."
      }
    ]
  },

  individualityQuarter4: {
    title: "Quarter 4 Reading",
    branch: "individuality",
    significance: "The most recent reading shows where this reader is headed.",
    leaves: [
      {
        id: "individualityQuarter41",
        title: "Quarter 4 Pick",
        type: "Quarter 4 reading",
        text: "Placeholder for a book read in the final quarter.",
        significance: "Placeholder for why this recent reading points forward."
      },
      {
        id: "individualityQuarter42",
        title: "Quarter 4 Reflection",
        type: "Reflection",
        text: "Placeholder reflection on reading at the end of the year.",
        significance: "Placeholder for why this closing reflection matters."
      }
    ]
  }
};
