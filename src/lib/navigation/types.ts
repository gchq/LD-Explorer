/* (c) Crown Copyright GCHQ */

/**
 * NavItem
 *
 * id: so nav items can be referenced.
 *
 * title: What the user sees.
 *
 * href: Where the navigation takes the user.
 *
 * match: this allows regexes to be used when deciding whether
 * or not a nav item should be highlighted (not always as simple
 * as just making sure the hrefs are the same).
 */
export interface NavItem<Id> {
	id: Id;
	title: string;
	href: string;
	external?: boolean;
	match?: RegExp;
}
