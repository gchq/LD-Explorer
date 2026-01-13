/* (c) Crown Copyright GCHQ */

import type { NavItem } from './types';
import { resolve } from '$app/paths';

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
		href: resolve('/'),
		variant: 'primary'
	},
	{
		id: 'explore',
		title: 'Explore',
		href: resolve('/explore'),
		variant: 'primary'
	},
	{
		id: 'sparql-ui',
		title: 'SPARQL',
		href: resolve('/sparql-ui'),
		variant: 'primary'
	},
	{
		id: 'sources',
		title: 'Sources',
		href: resolve('/sources'),
		variant: 'primary'
	},
	{
		id: 'logs',
		title: 'Logs',
		href: resolve('/logs'),
		variant: 'primary'
	}
];

export const secondarySideNavItems: SideNavItem<SecondarySideNavId>[] = [
	{
		id: 'settings',
		title: 'Settings',
		href: resolve('/settings'),
		variant: 'secondary'
	},
	{
		id: 'about',
		title: 'About',
		href: resolve('/about'),
		variant: 'secondary'
	}
];

export const sideNavItems = [...primarySideNavItems, ...secondarySideNavItems];
