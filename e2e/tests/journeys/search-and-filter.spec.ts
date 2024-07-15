/* (c) Crown Copyright GCHQ */

import { expect, test } from '$e2e/test';

// TODO: This probably should be a a feature test rather than a journey.
test('Filtering by text from individuals page', async ({
	page,
	addLocalDataSourcePage,
	importToLocalDataSourcePage,
	sherlockExampleDataTTL,
	exploreIndividualsPage
}) => {
	const sourceName = 'ExampleData';

	await addLocalDataSourcePage.goto();
	await addLocalDataSourcePage.createLocalDataSource(sourceName);

	await importToLocalDataSourcePage.navigateTo(sourceName);
	await importToLocalDataSourcePage.importRdfData(sherlockExampleDataTTL);

	// Go to the individuals page and check filtering works
	exploreIndividualsPage.navigateTo();

	await page.getByLabel('Filter results by text').first().fill('sherlock');
	await expect(page.getByText('1 items after filter').first()).toBeVisible();
});
