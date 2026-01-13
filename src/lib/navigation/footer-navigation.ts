/* (c) Crown Copyright GCHQ */

import type { NavItem } from './types';
import { resolve } from '$app/paths';

export const footerNavItems: NavItem<string>[] = [
	{ id: 'a11y-statement', title: 'Accessibility Statement', href: resolve(`/policy/a11y`) },
	{ id: 'sitemap', title: 'Sitemap', href: resolve(`/sitemap`) },
	{ id: 'cookie-policy', title: 'Cookie Policy', href: resolve(`/policy/cookies`) },
	{ id: 'privacy-policy', title: 'Privacy Policy', href: resolve(`/policy/privacy`) },
	{
		id: 'source-code-link',
		title: 'Source Code',
		external: true,
		href: `https://github.com/gchq/ld-explorer`
	}
];
