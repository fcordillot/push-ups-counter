/**
 * Add / Update hash in current Url and update browser history
 * @param hash
 */
export const updateHashInUrl = (hash) => history.pushState(null, null, `#${hash}`)

/**
 * Remove hash inside url and update browser history
 */
export const removeHashInUrl = () => history.pushState(null, null, window.location.pathname)

/**
 * Get current hash inside url
 * @returns {string}
 */
export const getHash = () => window.location.hash
