/* (c) Crown Copyright GCHQ */

import { resolve } from '$app/paths';

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
 * the current page the user is viewing.
 *
 * @param {string} navItemPath - The path to the nav item being considered.
 * @param {string} currentPath - The path to the page the user is currently on.
 * @returns {boolean}
 */
export function shouldHighlightSideNav(navItemPath: string, currentPath: string) {
	return navItemPath == resolve('/')
		? currentPath == navItemPath || currentPath == resolve('/')
		: currentPath.startsWith(navItemPath);
}
