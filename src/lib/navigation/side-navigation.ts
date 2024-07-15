/* (c) Crown Copyright GCHQ */

import type { NavItem } from './types';

export type PrimarySideNavId = 'home' | 'explore' | 'sparql-ui' | 'sources' | 'logs';
export type SecondarySideNavId = 'settings' | 'about';
export type SideNavId = PrimarySideNavId | SecondarySideNavId;

/**
 * variant: Side navigation has a "primary" and "secondary"
 * setting, which determines whether the items appear on the
 * top or the bottom of the sidebar respectively.
 */
interface SideNavItem<Id> extends NavItem<Id> {
	variant: 'primary' | 'secondary';
}

export const primarySideNavItems: SideNavItem<PrimarySideNavId>[] = [
	{
		id: 'home',
		title: 'Home',
		href: '/',
		variant: 'primary'
	},
	{
		id: 'explore',
		title: 'Explore',
		href: '/explore',
		variant: 'primary'
	},
	{
		id: 'sparql-ui',
		title: 'SPARQL',
		href: '/sparql-ui',
		variant: 'primary'
	},
	{
		id: 'sources',
		title: 'Sources',
		href: '/sources',
		variant: 'primary'
	},
	{
		id: 'logs',
		title: 'Logs',
		href: '/logs',
		variant: 'primary'
	}
];

export const secondarySideNavItems: SideNavItem<SecondarySideNavId>[] = [
	{
		id: 'settings',
		title: 'Settings',
		href: '/settings',
		variant: 'secondary'
	},
	{
		id: 'about',
		title: 'About',
		href: '/about',
		variant: 'secondary'
	}
];

export const sideNavItems = [...primarySideNavItems, ...secondarySideNavItems];
