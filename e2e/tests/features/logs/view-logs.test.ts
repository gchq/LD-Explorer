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
});
