/**
 * data.js — Local game data (static fallback)
 *
 * This is the source of truth when running WITHOUT a backend.
 * When you connect a backend (see api.js), this data will be
 * replaced by the API response automatically.
 *
 * HOW TO ADD A NEW GAME:
 *   1. Add a new object to the relevant subject array below.
 *   2. That's it. The UI renders everything dynamically.
 *
 * HOW TO ADD A NEW SUBJECT:
 *   1. Add a new key to `GAME_DATA` below.
 *   2. Register its accent colours in SUBJECT_THEMES.
 *   3. The category panel will render automatically.
 */

const GAME_DATA = {
  reading: [
    {
      id: "reading-rush",
      emoji: "📚",
      name: "Reading Rush",
      description: "Challenge yourself in an exciting reading adventure",
      grade: "Grades 6–8",
      url: "https://dishchiibikoh-community-school.github.io/READING-RUSH/",
      active: true
    },
    {
      id: "mythos-mender",
      emoji: "✏️",
      name: "Mythos Mender",
      description: "Explore mythology while mastering reading and writing skills",
      grade: "Grades 6–8",
      url: "https://mythosmender-819585899618.us-west1.run.app/",
      active: true
    }
  ],

  math: [
    {
      id: "math-mayhem",
      emoji: "🔢",
      name: "Math Mayhem",
      description: "Master arithmetic, algebra, and problem-solving through exciting challenges",
      grade: "Grades 6–8",
      url: "https://dishchiibikoh-community-school.github.io/math-mayhem/",
      active: true
    },
    {
      id: "math-maze-masters",
      emoji: "📐",
      name: "Math Maze Masters",
      description: "Navigate mathematical puzzles and conquer geometry challenges",
      grade: "Grades 6–8",
      url: "https://mathmazemasters.lovable.app",
      active: true
    }
  ]
};

/**
 * Subject metadata — controls panel labels, colours, and hero pills.
 * Add a new entry here when you add a new subject to GAME_DATA.
 */
const SUBJECT_THEMES = {
  reading: {
    label: "Reading & Writing",
    emoji: "📖",
    panelClass: "reading-panel",
    pillClass: "reading",
    active: true
  },
  math: {
    label: "Mathematics",
    emoji: "📐",
    panelClass: "math-panel",
    pillClass: "math",
    active: true
  },
  // ── Coming soon subjects (shown greyed out in hero card) ──
  science: {
    label: "Science",
    emoji: "🔬",
    panelClass: "science-panel",
    pillClass: "science",
    active: false
  },
  history: {
    label: "History",
    emoji: "🏛️",
    panelClass: "history-panel",
    pillClass: "history",
    active: false
  }
};
