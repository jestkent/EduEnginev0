# EduEngine 🎓

**A luxury, middle-school-friendly educational games hub.**
Built to be clean today and backend-ready for tomorrow.

---

## Project Structure

```
eduengine/
├── index.html              ← Main page (no inline styles or scripts)
│
├── css/
│   ├── reset.css           ← Normalize / base reset
│   ├── variables.css       ← All design tokens (colours, spacing, radii)
│   ├── layout.css          ← Page structure, header, hero, footer
│   ├── components.css      ← All UI components (cards, tiles, pills, etc.)
│   ├── animations.css      ← Keyframes and animation utility classes
│   └── responsive.css      ← Breakpoints and mobile layout
│
├── js/
│   ├── data.js             ← Local game data (static fallback)
│   ├── api.js              ← Backend abstraction layer (flip USE_API when ready)
│   ├── render.js           ← All DOM rendering functions
│   └── main.js             ← App entry point
│
└── assets/                 ← Images, icons, game thumbnails (add here)
```

---

## Getting Started in VS Code

1. Open the `eduengine/` folder in VS Code
2. Install the **Live Server** extension (by Ritwick Dey)
3. Right-click `index.html` → **Open with Live Server**
4. The site opens at `http://127.0.0.1:5500`

> No build tools needed. Pure HTML, CSS, and vanilla JS.

---

## How to Add a New Game

Open `js/data.js` and add an object to the relevant subject array:

```js
math: [
  // existing games...
  {
    id: "fraction-frenzy",        // unique slug
    emoji: "🍕",
    name: "Fraction Frenzy",
    description: "Master fractions through fun pizza puzzles",
    grade: "Grades 6–7",
    url: "games/fraction-frenzy/index.html",   // your game's URL
    active: true
  }
]
```

That's it. The count badges, hero stats, and grid all update automatically.

---

## How to Add a New Subject

1. Add game data to `js/data.js`:
```js
const GAME_DATA = {
  // existing subjects...
  science: [
    { id: "lab-quest", emoji: "🔬", name: "Lab Quest", ... }
  ]
};
```

2. Register the subject theme in `js/data.js`:
```js
const SUBJECT_THEMES = {
  // existing themes...
  science: {
    label: "Science",
    emoji: "🔬",
    panelClass: "science-panel",
    pillClass: "science",
    active: true   // ← set true to show it on the page
  }
};
```

3. Add subject colours in `css/variables.css` if needed (e.g. `--green`, `--green-bg`)

4. Add panel colour rules in `css/components.css`:
```css
.science-panel .cat-icon-wrap { background: var(--green-bg); border: 2px solid var(--green-light); }
.science-panel .cat-count-badge { color: var(--green); background: var(--green-light); }
.science-panel .gt-thumb { background: var(--green-bg); border: 1.5px solid var(--green-light); }
.science-panel .grade-tag { color: var(--green); background: var(--green-light); }
.science-panel .game-tile:hover { border-color: var(--green-light); background: var(--green-bg); }
.science-panel .game-tile:hover .play-cta { background: var(--green); border-color: var(--green); }
```

---

## Connecting a Backend

Open `js/api.js` and:

1. Set `USE_API: true`
2. Set `BASE_URL` to your server
3. Make sure your API returns this shape at `GET /api/games`:

```json
{
  "reading": [
    { "id": "story-builder", "emoji": "📚", "name": "Story Builder", "description": "...", "grade": "Grades 6–7", "url": "/games/story-builder", "active": true }
  ],
  "math": [ ... ]
}
```

If the API fails, the app automatically falls back to `data.js`. No crash.

---

## Teacher Login (Future)

Stubs are already in `js/api.js`:
- `loginTeacher(email, password)`
- `logoutTeacher()`
- `isLoggedIn()`

When ready, uncomment those functions and add a login modal or page.
A `<!-- TODO: Teacher login -->` comment in `index.html` marks where to add the nav button.

---

## Tech Stack

| Layer       | Tech                         |
|-------------|------------------------------|
| Markup      | Semantic HTML5               |
| Styling     | Vanilla CSS (no framework)   |
| Scripting   | Vanilla JS (no framework)    |
| Fonts       | Google Fonts (CDN)           |
| Backend     | Any (REST API compatible)    |

---

© 2025 EduEngine
