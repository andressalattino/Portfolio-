// Browsers can disable storage; the controls must still work in that case.
export function readPreference(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
export function savePreference(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* Keep the current page usable without persistence. */
  }
}
