/* (c) Crown Copyright GCHQ */

import { expect, test } from '@playwright/test';
import { sideNavItems, subNavItems } from '$navigation';
import AxeBuilder from '@axe-core/playwright'; // 1

const pagesToTest = [
	{ id: 'a11y-statement', title: 'Accessibility Statement', href: `/policy/a11y` },
	{ id: 'sitemap', title: 'Sitemap', href: `/sitemap` },
	{ id: 'cookie-policy', title: 'Cookie Policy', href: `/policy/cookies` },
	{ id: 'privacy-policy', title: 'Privacy Policy', href: `/policy/privacy` }
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
