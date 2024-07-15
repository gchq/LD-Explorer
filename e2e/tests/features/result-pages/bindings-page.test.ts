/* (c) Crown Copyright GCHQ */

import { expect, test } from '$e2e/test';

/**
 * Tests relating to any "bindings" views, such as the "Explore classes" page.
 */
test.describe('Bindings page tests', () => {
	test.beforeEach(
		async ({
			addLocalDataSourcePage,
			importToLocalDataSourcePage,
			sherlockExampleDataTTL,
			exploreClassesPage
		}) => {
			const exampleSourceName = 'Sherlock Data';
			await addLocalDataSourcePage.goto();
			await addLocalDataSourcePage.createLocalDataSource(exampleSourceName);
			await importToLocalDataSourcePage.navigateTo(exampleSourceName);
			await importToLocalDataSourcePage.importRdfData(sherlockExampleDataTTL);
			await exploreClassesPage.navigateTo();
		}
	);

	test('Contains everything a quads page should contain', async ({ exploreClassesPage, page }) => {
		// Page contains a table
		await expect(page.getByRole('table')).toBeVisible();

		// A sparql detail control that works
		await expect(await exploreClassesPage.sparqlDetail).not.toBeVisible();
		await exploreClassesPage.sparqlDetailToggle.click();
		await expect(await exploreClassesPage.sparqlDetail).toBeVisible();

		// An indicator as to how many results were returned (1 for the sherlock data)
		await expect(await page.getByText('Found 1 item')).toBeVisible();
	});
});
