/* (c) Crown Copyright GCHQ */

import { expect, test } from '@playwright/test';
import HomePage from '$e2e/pages/HomePage';

test.describe('homepage', () => {
	let homePage;

	test.beforeEach(async ({ page }) => {
		homePage = new HomePage(page);
		await homePage.goto();
	});

	test('has expected hero banner', async () => {
		await expect(homePage.hero).toBeVisible();
		await expect(homePage.hero).toHaveText(/LD-Explorer/);
	});
});
