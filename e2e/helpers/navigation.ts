/* (c) Crown Copyright GCHQ */

import type { Page } from '@playwright/test';

export async function navigateTo(
	page: Page,
	mainNav: string | RegExp,
	subNav?: string | RegExp,
	tabNav?: string | RegExp
) {
	await page.getByTestId('main-nav').getByRole('link', { name: mainNav }).click();

	if (subNav) await page.getByTestId('sub-nav').getByRole('link', { name: subNav }).click();

	if (tabNav) await page.getByRole('tab', { name: tabNav }).click();
}
