/* (c) Crown Copyright GCHQ */

import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright'; // 1

const pagesToTest = [
	{ id: 'a11y-statement', title: 'Accessibility Statement', href: `/policy/a11y` },
	{ id: 'sitemap', title: 'Sitemap', href: `/sitemap` },
	{ id: 'cookie-policy', title: 'Cookie Policy', href: `/policy/cookies` },
	{ id: 'privacy-policy', title: 'Privacy Policy', href: `/policy/privacy` },
	{ id: 'home', title: 'Home', href: '/' },
	{ id: 'explore', title: 'Explore', href: '/explore' },
	{ id: 'sparql-ui', title: 'SPARQL', href: '/sparql-ui' },
	{ id: 'sources', title: 'Sources', href: '/sources' },
	{ id: 'logs', title: 'Logs', href: '/logs' },
	{ id: 'subnav-explore', parentId: 'explore', title: 'Explore', href: '/explore' },
	{ id: 'subnav-explore-classes', title: 'Classes', href: '/explore/classes' },
	{ id: 'subnav-explore-properties', title: 'Properties', href: '/explore/properties' },
	{ id: 'subnav-explore-individuals', title: 'Individuals', href: '/explore/individuals' },
	{ id: 'subnav-explore-metadata', title: 'Metadata', href: '/explore/metadata/labels' },
	{ id: 'subnav-explore-triples', parentId: 'explore', title: 'Triples', href: '/explore/triples' },
	{ id: 'subnav-explore-named-graphs', title: 'Named Graphs', href: '/explore/named-graphs' },
	{ id: 'subnav-explore-iris', title: 'IRI Search', href: '/explore/iris' },
	{ id: 'subnav-about-overview', title: 'About', href: '/about' },
	{ id: 'subnav-settings-general', title: 'General', href: '/settings' },
	{ id: 'subnav-settings-terms', title: 'Terms', href: '/settings/terms' },
	{ id: 'subnav-settings-prefixes', title: 'Prefixes', href: '/settings/prefixes' },
	{ id: 'subnav-sources-data-sources', title: 'Data Sources', href: '/sources' },
	{ id: 'subnav-soruces-catalog', title: 'Catalog', href: '/sources/catalog' }
];

// Run all these in parallell
test.describe.configure({ mode: 'parallel' });

pagesToTest.forEach(({ id, href, title }) => {
	test.describe(`${id} Page a11y test`, () => {
		/**
		 * Ensure that the page has the correct title element.
		 */
		test(`${id} has expected page title`, async ({ page }) => {
			await page.goto(href);

			// Title should include the page heading and end with LD-Explorer
			await expect(page).toHaveTitle(new RegExp(`${title}`));
			await expect(page).toHaveTitle(new RegExp(`- LD-Explorer$`));
		});

		/**
		 * Ensure the page meets basic a11y standards when first visited.
		 */
		test(`${id} passes automatic wcag a11y tests on first visit`, async ({ page }) => {
			await page.goto(href);
			const accessibilityScanResults = await new AxeBuilder({ page })
				.withTags(['wcag21a', 'wcag21aa'])
				.analyze();
			expect(accessibilityScanResults.violations).toEqual([]);
		});
	});
});
