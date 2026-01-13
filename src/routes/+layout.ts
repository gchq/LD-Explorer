/* (c) Crown Copyright GCHQ */

// This line essentially puts the whole app into "SPA mode" (https://kit.svelte.dev/docs/single-page-apps) which
// is a requirement for deploying to an environment such as github pages.

// Individual pages can then be instructed to pre-render where possible (e.g. if the page just consists of
// static content)

export const ssr = false;

import { resolve } from '$app/paths';
import type { LayoutLoad } from './$types';
import type { NavItem } from '$lib/navigation/types';

const footerNavigation: NavItem<string>[] = [
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

export const load: LayoutLoad = async () => {
	return {
		nav: {
			footerNavigation
		}
	};
};
