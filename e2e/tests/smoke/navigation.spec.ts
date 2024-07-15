/* (c) Crown Copyright GCHQ */

import { expect, test } from '@playwright/test';

/**
 * Uses navigaiton to browse to each page, taking screenshots as we go.
 */
test('navigation', async ({ page }) => {
	await page.goto('/');

	// Check the expand/Collapse functionality is working.
	await expect(page).toHaveScreenshot();
	await page.getByLabel('Expand side navigation').click();
	await expect(page).toHaveScreenshot();
	await page.getByLabel('Collapse side navigation').click();
	await expect(page).toHaveScreenshot();

	// Check main navigation works
	await page.getByRole('link', { name: 'search-web Explore' }).click();
	await expect(page).toHaveTitle('Explore - LD-Explorer');

	// Check sub navigation works
	await page.getByLabel('Sub navigation').getByRole('link', { name: 'Classes' }).click();
	await expect(page).toHaveTitle('All Classes - Classes - LD-Explorer');

	// Check the tab navigation works
	await page.getByRole('link', { name: 'Base Classes' }).click();
	await expect(page).toHaveTitle('Base Classes - Classes - LD-Explorer');
});
