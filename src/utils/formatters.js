/**
 * @param {number} ms
 * @returns {string}
 */
export function formatTime(ms) {
  return `${ms} ms`
}

/**
 * @param {string} str
 * @returns {boolean}
 */
export function isJsonString(str) {
  try {
    JSON.parse(str)
    return true
  } catch (e) {
    return false
  }
}

/**
 * @param {object} headers
 * @returns {Array<{ key: string, value: string }>}
 */
export function formatHeaders(headers) {
  if (!headers || typeof headers !== 'object') return []

  return Object.entries(headers).map(([key, value]) => ({
    key,
    value: Array.isArray(value) ? value.join(', ') : value,
  }))
}
