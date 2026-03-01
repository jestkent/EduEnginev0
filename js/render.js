/**
 * render.js — DOM rendering functions
 *
 * All UI building lives here. Nothing in index.html
 * needs to change when you add new games or subjects.
 */

/**
 * Renders a single game tile <a> element.
 * @param {Object} game
 * @returns {string} HTML string
 */
function renderGameTile(game) {
  return `
    <a class="game-tile" href="${game.url}" target="_blank" rel="noopener noreferrer" aria-label="Play ${game.name} (opens in new tab)">
      <div class="gt-thumb" aria-hidden="true">${game.emoji}</div>
      <div class="gt-info">
        <div class="gt-name">${game.name}</div>
        <div class="gt-desc">${game.description}</div>
      </div>
      <div class="gt-right">
        <span class="grade-tag">${game.grade}</span>
        <div class="play-cta" aria-hidden="true">
          <div class="play-arrow"></div>
        </div>
      </div>
    </a>
  `;
}

/**
 * Renders a full category panel (icon, title, tiles).
 * @param {string} subjectKey  - e.g. "reading"
 * @param {Object} theme       - from SUBJECT_THEMES
 * @param {Array}  games       - array of game objects
 * @param {number} delay       - animation stagger delay (seconds)
 * @returns {string} HTML string
 */
function renderCategoryPanel(subjectKey, theme, games, delay = 0) {
  const count = games.length;
  const tilesHTML = games.map(renderGameTile).join('');

  return `
    <div
      class="cat-panel ${theme.panelClass} animate-fadeup"
      style="--delay: ${delay}s"
      role="listitem"
      aria-label="${theme.label} — ${count} game${count !== 1 ? 's' : ''}"
    >
      <div class="cat-panel-top">
        <div class="cat-icon-wrap" aria-hidden="true">${theme.emoji}</div>
        <div class="cat-count-badge">${count} Game${count !== 1 ? 's' : ''}</div>
      </div>
      <h2 class="cat-title">${theme.label}</h2>
      <p class="cat-desc">${getCategoryDescription(subjectKey)}</p>
      <div class="game-tiles">
        ${tilesHTML}
      </div>
    </div>
  `;
}

/**
 * Renders hero stat items.
 * @param {number} totalGames
 * @param {number} totalSubjects
 */
function renderHeroStats(totalGames, totalSubjects) {
  const statsEl = document.getElementById('heroStats');
  if (!statsEl) return;

  statsEl.innerHTML = `
    <div class="stat">
      <span class="stat-num">${totalGames}</span>
      <span class="stat-label">Games</span>
    </div>
    <div class="stat-divider" aria-hidden="true"></div>
    <div class="stat">
      <span class="stat-num">${totalSubjects}</span>
      <span class="stat-label">Subjects</span>
    </div>
    <div class="stat-divider" aria-hidden="true"></div>
    <div class="stat">
      <span class="stat-num">6–8</span>
      <span class="stat-label">Grade Range</span>
    </div>
  `;
}

/**
 * Renders hero subject pills (active + coming soon).
 * @param {Object} subjects - SUBJECT_THEMES
 */
function renderSubjectPills(subjects) {
  const pillsEl = document.getElementById('subjectPills');
  if (!pillsEl) return;

  const pillsHTML = Object.entries(subjects).map(([, theme]) => {
    const soonTag = !theme.active
      ? `<span class="pill-soon" aria-label="Coming soon">Soon</span>`
      : '';
    return `
      <div class="subj-pill ${theme.pillClass}">
        <span class="pill-icon" aria-hidden="true">${theme.emoji}</span>
        ${theme.label}
        ${soonTag}
      </div>
    `;
  }).join('');

  pillsEl.innerHTML = pillsHTML;
}

/**
 * Renders all active category panels into the grid.
 * @param {Object} gameData   - GAME_DATA
 * @param {Object} subjects   - SUBJECT_THEMES
 */
function renderCategoryGrid(gameData, subjects) {
  const grid = document.getElementById('categoryGrid');
  if (!grid) return;

  const activeSubjects = Object.entries(subjects).filter(([, t]) => t.active);
  let totalGames = 0;

  const panelsHTML = activeSubjects.map(([key, theme], i) => {
    const games = gameData[key] || [];
    totalGames += games.length;
    return renderCategoryPanel(key, theme, games, 0.1 + i * 0.15);
  }).join('');

  grid.innerHTML = panelsHTML;

  // Update badge
  const badge = document.getElementById('totalBadge');
  if (badge) badge.textContent = `${totalGames} Game${totalGames !== 1 ? 's' : ''} Available`;

  // Update hero stats
  renderHeroStats(totalGames, activeSubjects.length);
}

/**
 * Shows skeleton loading placeholders.
 */
function renderLoadingState() {
  const grid = document.getElementById('categoryGrid');
  if (!grid) return;

  grid.innerHTML = `
    <div class="cat-panel">
      <div class="skeleton" style="height:52px;width:52px;margin-bottom:16px;"></div>
      <div class="skeleton" style="height:24px;width:60%;margin-bottom:12px;"></div>
      <div class="skeleton" style="height:14px;width:90%;margin-bottom:6px;"></div>
      <div class="skeleton" style="height:14px;width:70%;margin-bottom:20px;"></div>
      <div class="skeleton" style="height:74px;margin-bottom:10px;border-radius:14px;"></div>
      <div class="skeleton" style="height:74px;border-radius:14px;"></div>
    </div>
    <div class="cat-panel">
      <div class="skeleton" style="height:52px;width:52px;margin-bottom:16px;"></div>
      <div class="skeleton" style="height:24px;width:60%;margin-bottom:12px;"></div>
      <div class="skeleton" style="height:14px;width:90%;margin-bottom:6px;"></div>
      <div class="skeleton" style="height:14px;width:70%;margin-bottom:20px;"></div>
      <div class="skeleton" style="height:74px;margin-bottom:10px;border-radius:14px;"></div>
      <div class="skeleton" style="height:74px;border-radius:14px;"></div>
    </div>
  `;
}

/**
 * Shows an error message in the grid area.
 * @param {string} message
 */
function renderErrorState(message) {
  const grid = document.getElementById('categoryGrid');
  if (!grid) return;
  grid.innerHTML = `<div class="error-message">${message}</div>`;
}

/**
 * Returns a description string per subject key.
 * Extend this when adding new subjects.
 * @param {string} subjectKey
 * @returns {string}
 */
function getCategoryDescription(subjectKey) {
  const descriptions = {
    reading: "Build vocabulary, sharpen comprehension, and level up your writing — one challenge at a time.",
    math:    "From number sense to geometry — tackle real math problems through gameplay that actually sticks.",
    science: "Explore the natural world through experiments, simulations, and discovery.",
    history: "Travel through time and uncover the stories that shaped our world."
  };
  return descriptions[subjectKey] || "Explore this subject through interactive challenges.";
}
