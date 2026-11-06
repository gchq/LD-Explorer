/* (c) Crown Copyright GCHQ */

import { expect, test } from '$e2e/test';

const exampleSourceName = 'Test Name';
const exampleDescription = 'Test Description';

test.describe('Logs page', () => {
	test.beforeEach(
		async ({ addLocalDataSourcePage, importToLocalDataSourcePage, sherlockExampleDataTTL }) => {
			addLocalDataSourcePage.goto();
			await addLocalDataSourcePage.createLocalDataSource(exampleSourceName, exampleDescription);
			await importToLocalDataSourcePage.navigateTo(exampleSourceName);
			await importToLocalDataSourcePage.importRdfData(sherlockExampleDataTTL);
		}
	);

	test('displays logs and enables users to clear them', async ({ page, logsPage }) => {
		logsPage.navigateTo();
		await expect(page).toHaveTitle('Logs - LD-Explorer');
		await expect(page.getByText('Logs Empty')).not.toBeVisible();

		// Check the logs
		await expect(page.getByText('Finished importing document')).toBeVisible();

		// Check the detail display
		await expect(page.getByTestId('log-details')).not.toBeVisible();
		await page.getByText('Details').click();
		await expect(page.getByTestId('log-details')).toBeVisible();
		await page.getByText('Details').click();
		await expect(page.getByTestId('log-details')).not.toBeVisible();

		// Clear them
		await logsPage.clickClearLogs();

		// Logs should be gone now!
		await expect(page.getByText('Finished importing document')).not.toBeVisible();
		await expect(page.getByText('Logs Empty')).toBeVisible();
	});

	test('displays entries with identical timestamps before and after clearing', async ({
		page,
		logsPage,
		importToLocalDataSourcePage,
		sherlockExampleDataTTL
	}) => {
		const pageErrors: Error[] = [];
		page.on('pageerror', (error) => pageErrors.push(error));
		await page.clock.setFixedTime(new Date('2023-11-14T22:13:20Z'));
		await logsPage.navigateTo();
		await logsPage.clickClearLogs();

		// Fix the clock, but keep timers running so navigation and imports can complete.
		for (let batch = 0; batch < 2; batch++) {
			for (let count = 1; count <= 2; count++) {
				await importToLocalDataSourcePage.navigateTo(exampleSourceName);
				await importToLocalDataSourcePage.importRdfData(sherlockExampleDataTTL);
				await expect(page).toHaveURL('/sources');
				await logsPage.navigateTo();
				await expect(page).toHaveTitle('Logs - LD-Explorer');
				await expect(page.getByText('Finished importing document')).toHaveCount(count);
			}

			const rows = page.getByRole('listitem').filter({ hasText: 'Finished importing document' });
			const times = await rows.locator('time').allTextContents();
			expect(times).toHaveLength(2);
			expect(times[0]).toBe(times[1]);
			await rows.first().getByText('Details', { exact: true }).click();
			await expect(rows.first().getByTestId('log-details')).toBeVisible();
			await expect(rows.last().getByTestId('log-details')).not.toBeVisible();

			await logsPage.clickClearLogs();
			await expect(rows).toHaveCount(0);
			await expect(page.getByText('Logs Empty')).toBeVisible();
		}
		expect(pageErrors).toEqual([]);
	});
});
