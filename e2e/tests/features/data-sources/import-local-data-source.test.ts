/* (c) Crown Copyright GCHQ */

import { expect, test } from '$e2e/test';

const exampleSourceName = 'Test Name';

test.describe('import to local data source page', () => {
	test.beforeEach(async ({ addLocalDataSourcePage }) => {
		addLocalDataSourcePage.goto();
		await addLocalDataSourcePage.createLocalDataSource(exampleSourceName);
	});

	test('allows you to import ttl files to a local data source', async ({
		page,
		importToLocalDataSourcePage,
		listSourcesPage,
		sherlockExampleDataTTL
	}) => {
		await importToLocalDataSourcePage.navigateTo(exampleSourceName);
		await importToLocalDataSourcePage.importRdfData(sherlockExampleDataTTL);

		// This redirects us to the sources page, showing our new source
		// with the right number of triples (six in the case of the sherlock
		// holmes data)
		await expect(page).toHaveURL(listSourcesPage.baseUrl);
		const sourceCard = listSourcesPage.sourceCard(exampleSourceName);
		await expect(sourceCard).toBeVisible();
		await expect(sourceCard.getByText('Triples: 6')).toBeVisible();
	});

	test('allows you to import JSONLD files to a local data source', async ({
		page,
		importToLocalDataSourcePage,
		listSourcesPage,
		sherlockExampleDataJSONLD
	}) => {
		await importToLocalDataSourcePage.navigateTo(exampleSourceName);
		await importToLocalDataSourcePage.selectImportFormat('JSON-LD');
		await importToLocalDataSourcePage.fillTextField(sherlockExampleDataJSONLD);
		await importToLocalDataSourcePage.clickSubmit();

		// This redirects us to the sources page, showing our new source
		// with the right number of triples (six in the case of the sherlock
		// holmes data)
		await expect(page).toHaveURL(listSourcesPage.baseUrl);
		const sourceCard = listSourcesPage.sourceCard(exampleSourceName);
		await expect(sourceCard).toBeVisible();
		await expect(sourceCard.getByText('Triples: 6')).toBeVisible();
	});
});
