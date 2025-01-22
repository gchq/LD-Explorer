/* (c) Crown Copyright GCHQ */

import { expect, test } from '$e2e/test';

const sourceData = `
@prefix foaf: <http://xmlns.com/foaf/0.1/> .

<http://www.example.com/Bob> foaf:knows <http://www.example.com/Alice> .
<http://www.example.com/Bob%20Smith> foaf:knows <http://www.example.com/Alice%20Jones> .`;

/**
 * Imports some RDF data into a local data source, then tests it all looks and acts as expected.
 * This test was written in resopnse to https://github.com/gchq/LD-Explorer/issues/48
 */
test('Importing data with escaped characters in the URL', async ({
	page,
	listSourcesPage,
	showDataSource,
	addLocalDataSourcePage,
	importToLocalDataSourcePage
}) => {
	await listSourcesPage.goto();

	// Create a data source
	await addLocalDataSourcePage.navigateTo();
	await addLocalDataSourcePage.createLocalDataSource('Source 1');
	await importToLocalDataSourcePage.navigateTo('Source 1');
	await importToLocalDataSourcePage.importRdfData(sourceData);

	// Show the sample data and make sure both Bobs are present.
	showDataSource.navigateTo('Source 1');
	showDataSource.clickShowSampleData();

	// Check the first bob (the one with no escaped characters in their URI).
	const bob = page.getByRole('link', { name: `http://www.example.com/Bob`, exact: true });
	await expect(bob).toBeVisible();
	await bob.click();
	await expect(page.getByRole('heading', { name: 'http://www.example.com/Bob' })).toBeVisible();
	await expect(page.getByRole('link', { name: 'http://xmlns.com/foaf/0.1/knows' })).toBeVisible();
	await expect(page.getByRole('link', { name: 'http://www.example.com/Alice' })).toBeVisible();

	// Check the second bob (the one with escaped characters in their URI).
	const escapedBob = page.getByRole('link', {
		name: `http://www.example.com/Bob%20Smith`,
		exact: true
	});

	showDataSource.navigateTo('Source 1');
	showDataSource.clickShowSampleData();
	await expect(escapedBob).toBeVisible();
	await escapedBob.click();
	await expect(
		page.getByRole('heading', { name: 'http://www.example.com/Bob%20Smith' })
	).toBeVisible();
	await expect(page.getByRole('link', { name: 'http://xmlns.com/foaf/0.1/knows' })).toBeVisible();
	await expect(
		page.getByRole('link', { name: 'http://www.example.com/Alice%20Jones' })
	).toBeVisible();
});
