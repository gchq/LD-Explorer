/* (c) Crown Copyright GCHQ */

import type { NavItem } from './types';

export const footerNavItems: NavItem<string>[] = [
	{ id: 'a11y-statement', title: 'Accessibility Statement', href: `/policy/a11y` },
	{ id: 'sitemap', title: 'Sitemap', href: `/sitemap` },
	{ id: 'cookie-policy', title: 'Cookie Policy', href: `/policy/cookies` },
	{ id: 'privacy-policy', title: 'Privacy Policy', href: `/policy/privacy` },
	{
		id: 'source-code-link',
		title: 'Source Code',
		external: true,
		href: `https://github.com/gchq/ld-explorer`
	}
];
