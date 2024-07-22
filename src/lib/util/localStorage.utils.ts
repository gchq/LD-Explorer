/* (c) Crown Copyright GCHQ */

/**
 * Utilities related to any interactions with the browser's localStorage API.
 * https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
 */

/**
 * Set a key in local storage to contain an object. No-op if a non-JSON
 * value is passed in.
 * @param key
 * @param value
 */
export function storeJSONObject<T>(key: string, value: T) {
	localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Get a key from local storage and parse it as JSON. If for some reason the
 * local storage is corrupt, an empty object is returned.
 * @param key
 * @returns value from store, parsed
 */
export function retrieveJSONObject(key: string) {
	const value = localStorage.getItem(key);

	try {
		return value && JSON.parse(value);
	} catch (e) {
		console.warn('Unable to read value from local storage.', e);
		return {};
	}
}
