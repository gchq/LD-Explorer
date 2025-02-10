/* (c) Crown Copyright GCHQ */

import { expect, test } from '$e2e/test';

const sourceData = `
@prefix ex: <http://example.org/> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .

ex:person1 a ex:FBIAgent .
ex:person1 rdfs:label "Special Agent Dale Cooper" .
ex:FBIAgent rdfs:label "FBI Agent" .`;

test.describe('Display Labels setting', () => {
	test.beforeEach(async ({ addLocalDataSourcePage, importToLocalDataSourcePage }) => {
		const sourceName = 'Test';
		await addLocalDataSourcePage.goto();
		await addLocalDataSourcePage.createLocalDataSource(sourceName);
		await importToLocalDataSourcePage.navigateTo(sourceName);
		await importToLocalDataSourcePage.importRdfData(sourceData);
	});

	test('Defaults to not labelling', async ({ page, exploreIndividualsPage }) => {
		await exploreIndividualsPage.navigateTo();
		await expect(
			page.getByRole('link', {
				name: 'http://example.org/person1',
				exact: true
			})
		).toBeVisible();
		await expect(
			page.getByRole('link', {
				name: 'http://example.org/FBIAgent',
				exact: true
			})
		).toBeVisible();
	});

	test('When labelling switched on, labels are shown', async ({
		page,
		generalSettingsPage,
		exploreIndividualsPage
	}) => {
		await generalSettingsPage.navigateTo();
		await generalSettingsPage.toggleShowLabels();

		await exploreIndividualsPage.navigateTo();
		await expect(
			page.getByRole('link', {
				name: 'Special Agent Dale Cooper',
				exact: true
			})
		).toBeVisible();
		await expect(
			page.getByRole('link', {
				name: 'FBI Agent',
				exact: true
			})
		).toBeVisible();
	});
});
