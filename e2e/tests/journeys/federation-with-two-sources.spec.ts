/* (c) Crown Copyright GCHQ */

import { expect, test } from '$e2e/test';

const sourceData1 = `
@base <http://example.org/> .
@prefix ex: <http://www.example.com/> .
<#person1> a ex:Person .`;

const sourceData2 = `
@base <http://example.org/> .
@prefix ex: <http://www.example.com/> .
<#person2> a ex:Person .`;

/**
 * Imports some RDF data into a local data source, then tests it all looks and acts as expected.
 */
test('Federating two data sources', async ({
	page,
	listSourcesPage,
	addLocalDataSourcePage,
	importToLocalDataSourcePage,
	exploreClassesPage
}) => {
	await listSourcesPage.goto();

	// Create the first source
	await addLocalDataSourcePage.navigateTo();
	await addLocalDataSourcePage.createLocalDataSource('Source 1');
	await importToLocalDataSourcePage.navigateTo('Source 1');
	await importToLocalDataSourcePage.importRdfData(sourceData1);

	// Create the second source
	await addLocalDataSourcePage.navigateTo();
	await addLocalDataSourcePage.createLocalDataSource('Source 2');
	await importToLocalDataSourcePage.navigateTo('Source 2');
	await importToLocalDataSourcePage.importRdfData(sourceData2);

	await exploreClassesPage.navigateTo();

	// Click the "Person" class, and make sure there are 2 instances.
	await page.getByRole('link', { name: `Person` }).click();
	await page.getByRole('link', { name: `Instances` }).click();
	await expect(page.getByRole('link', { name: `person1` })).toBeVisible();
	await expect(page.getByRole('link', { name: `person2` })).toBeVisible();
});
