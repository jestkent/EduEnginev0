/**
 * api.js — Backend API abstraction layer
 *
 * When USE_API is false  → uses local data from data.js (static mode)
 * When USE_API is true   → fetches from your real backend API
 *
 * To connect your backend:
 *   1. Set USE_API = true
 *   2. Set API_BASE_URL to your server URL
 *   3. Make sure your API returns the same shape as GAME_DATA in data.js
 *
 * Expected API response shape for GET /api/games:
 * {
 *   "reading": [ { id, emoji, name, description, grade, url, active }, ... ],
 *   "math":    [ { id, emoji, name, description, grade, url, active }, ... ]
 * }
 */

const API_CONFIG = {
  USE_API: false,                          // ← flip to true when backend is ready
  BASE_URL: "https://your-api.com",        // ← replace with your backend URL
  ENDPOINTS: {
    games: "/api/games",
    subjects: "/api/subjects"
  }
};

/**
 * fetchGames()
 * Returns game data — either from the backend API or local data.js fallback.
 * @returns {Promise<Object>} — game data keyed by subject
 */
async function fetchGames() {
  if (!API_CONFIG.USE_API) {
    // Static mode: return local data immediately
    return Promise.resolve(GAME_DATA);
  }

  try {
    const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.games}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
        // Add auth headers here when teacher login is implemented:
        // "Authorization": `Bearer ${getToken()}`
      }
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;

  } catch (err) {
    console.warn("[EduEngine] API fetch failed, falling back to local data.", err);
    return GAME_DATA; // Graceful fallback
  }
}

/**
 * fetchSubjects()
 * Returns subject metadata — either from API or local SUBJECT_THEMES.
 * @returns {Promise<Object>}
 */
async function fetchSubjects() {
  if (!API_CONFIG.USE_API) {
    return Promise.resolve(SUBJECT_THEMES);
  }

  try {
    const res = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.subjects}`);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn("[EduEngine] Subject fetch failed, using local themes.", err);
    return SUBJECT_THEMES;
  }
}

/* ── Auth helpers (stubbed — wire up when teacher login is ready) ──
 *
 * function getToken() {
 *   return localStorage.getItem("eduengine_token") || null;
 * }
 *
 * function isLoggedIn() {
 *   return !!getToken();
 * }
 *
 * async function loginTeacher(email, password) {
 *   const res = await fetch(`${API_CONFIG.BASE_URL}/api/auth/login`, {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify({ email, password })
 *   });
 *   const data = await res.json();
 *   localStorage.setItem("eduengine_token", data.token);
 *   return data;
 * }
 *
 * function logoutTeacher() {
 *   localStorage.removeItem("eduengine_token");
 *   window.location.reload();
 * }
 */
