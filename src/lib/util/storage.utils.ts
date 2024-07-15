/* (c) Crown Copyright GCHQ */

/**
 * Utilities related to any interactions with the window.Storage API.
 * https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
 */

/**
 * Set a key in local storage to contain an object
 * @param key
 * @param value
 */
export function setObject<T>(key: string, value: T) {
	localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Get a key from local storage and parse it as JSON
 * @param key
 * @returns value from store, parsed
 */
export function getObject(key: string) {
	const value = localStorage.getItem(key);
	return value && JSON.parse(value);
}
