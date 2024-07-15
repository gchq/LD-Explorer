/* (c) Crown Copyright GCHQ */

/**
 * Returns whether or not a sub navigation item should be highlighted in the nav based on its URL vs
 * the current page the user is viewing. Additionally, a regular
 * expression can be passed in to handle edge cases where simply
 * comparing the paths isn't enough to determine whether to highlight.
 *
 * @param {string} navHref - The href of the navigation item to check
 * @param {string} actualPath - The full path of the current page the user is browsing
 * @param {RegExp} [match=/navHref(|/)$/] - an optional regular expression to handle edge-cases
 * @returns {boolean}
 */
export function shouldHighlightSubNav(navHref: string, actualPath: string, match?: RegExp) {
	return !!actualPath.match(match || new RegExp(`${navHref}(|/)$`));
}

/**
 * Returns whether or not a sub navigation item should be highlighted in the nav based on its URL vs
 * the current page the user is viewing. Additionally, a regular
 * expression can be passed in to handle edge cases where simply
 * comparing the paths isn't enough to determine whether to highlight.
 *
 * @param {string} base - The base URL of the application (http://...)
 * @param {string} actualPath - The path to the page the user is looking at
 * @param {string} navItemPath - The path to the nav item being tested
 * @returns {boolean}
 */
export function shouldHighlightSideNav(base: string, actualPath: string, navItemPath: string) {
	return actualPath == '/'
		? navItemPath == `${base}${actualPath}` || navItemPath == `${base}`
		: navItemPath.startsWith(`${base}${actualPath}`);
}
