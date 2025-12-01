/* (c) Crown Copyright GCHQ */

import { expect, test } from '$e2e/test';

/**
 * Tests relating to any "quads" views, such as the "Explore Triples" page.
 */
test.describe('Quads page tests', () => {
	test.beforeEach(
		async ({
			addLocalDataSourcePage,
			importToLocalDataSourcePage,
			sherlockExampleDataTTL,
			exploreTriplesPage
		}) => {
			const exampleSourceName = 'Sherlock Data';
			await addLocalDataSourcePage.goto();
			await addLocalDataSourcePage.createLocalDataSource(exampleSourceName);
			await importToLocalDataSourcePage.navigateTo(exampleSourceName);
			await importToLocalDataSourcePage.importRdfData(sherlockExampleDataTTL);
			await exploreTriplesPage.navigateTo();
		}
	);

	test('Contains everything a quads page should contain', async ({ exploreTriplesPage, page }) => {
		// A table with appropriate headings
		await expect(page.getByRole('columnheader', { name: 'Subject' })).toBeVisible();
		await expect(page.getByRole('columnheader', { name: 'Predicate' })).toBeVisible();
		await expect(page.getByRole('columnheader', { name: 'Object' })).toBeVisible();

		// A sparql detail control that works
		await expect(await exploreTriplesPage.sparqlDetail).not.toBeVisible();
		await exploreTriplesPage.sparqlDetailToggle.click();
		await expect(await exploreTriplesPage.sparqlDetail).toBeVisible();

		// An indicator as to how many results were returned
		await expect(await page.getByText('Found 6 items')).toBeVisible();
	});
});
