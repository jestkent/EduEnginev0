/**
 * main.js — App entry point
 *
 * Boots EduEngine: fetches data and renders the UI.
 * This is the only file that orchestrates everything.
 */

async function init() {
  try {
    // Show skeletons while loading
    renderLoadingState();

    // Fetch data (from API or local fallback — see api.js)
    const [gameData, subjects] = await Promise.all([
      fetchGames(),
      fetchSubjects()
    ]);

    // Render everything
    renderCategoryGrid(gameData, subjects);
    renderSubjectPills(subjects);

  } catch (err) {
    console.error("[EduEngine] Failed to initialise:", err);
    renderErrorState("Couldn't load games. Please refresh the page.");
  }
}

// Boot when DOM is ready
document.addEventListener("DOMContentLoaded", init);
