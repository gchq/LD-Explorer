/* (c) Crown Copyright GCHQ */

import type { NavItem } from './types';
import type { SideNavId } from './side-navigation';
import { resolve } from '$app/paths';

/**
 * parentId: Sub nav items need to reference their parent
 * nav, which will be one of the SideNav items.
 */
interface SubNavItem<Id> extends NavItem<Id> {
	parentId: SideNavId;
}

export const subNavItems: SubNavItem<string>[] = [
	{ id: 'subnav-explore', parentId: 'explore', title: 'Explore', href: resolve('/explore') },
	{
		id: 'subnav-explore-classes',
		parentId: 'explore',
		title: 'Classes',
		href: resolve('/explore/classes'),
		match: /\/explore\/classes/
	},
	{
		id: 'subnav-explore-properties',
		parentId: 'explore',
		title: 'Properties',
		href: resolve('/explore/properties')
	},
	{
		id: 'subnav-explore-individuals',
		parentId: 'explore',
		title: 'Individuals',
		href: resolve('/explore/individuals')
	},
	{
		id: 'subnav-explore-metadata',
		parentId: 'explore',
		title: 'Metadata',
		href: resolve('/explore/metadata/labels'),
		match: /\/explore\/metadata/
	},
	{
		id: 'subnav-explore-triples',
		parentId: 'explore',
		title: 'Triples',
		href: resolve('/explore/triples')
	},
	{
		id: 'subnav-explore-named-graphs',
		parentId: 'explore',
		title: 'Named Graphs',
		href: resolve('/explore/named-graphs')
	},
	{
		id: 'subnav-explore-iris',
		parentId: 'explore',
		title: 'IRI Search',
		href: resolve('/explore/iris'),
		match: /\/explore\/iris/
	},
	{ id: 'subnav-about-overview', parentId: 'about', title: 'About', href: resolve('/about') },
	{
		id: 'subnav-settings-general',
		parentId: 'settings',
		title: 'General',
		href: resolve('/settings')
	},
	{
		id: 'subnav-settings-terms',
		parentId: 'settings',
		title: 'Terms',
		href: resolve('/settings/terms')
	},
	{
		id: 'subnav-settings-prefixes',
		parentId: 'settings',
		title: 'Prefixes',
		href: resolve('/settings/prefixes')
	},
	{
		id: 'subnav-sources-data-sources',
		parentId: 'sources',
		title: 'Data Sources',
		href: resolve('/sources'),
		match: /\/sources(?!\/catalog).*/
	},
	{
		id: 'subnav-soruces-catalog',
		parentId: 'sources',
		title: 'Catalog',
		href: resolve('/sources/catalog')
	}
];

export const exploreSubNavItems = subNavItems.filter((n) => n.parentId == 'explore');
export const sourcesSubNavItems = subNavItems.filter((n) => n.parentId == 'sources');
export const aboutSubNavItems = subNavItems.filter((n) => n.parentId == 'about');
export const settingsSubNavItems = subNavItems.filter((n) => n.parentId == 'settings');
