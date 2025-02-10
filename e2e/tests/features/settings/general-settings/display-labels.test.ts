/* (c) Crown Copyright GCHQ */

import { expect, test } from '$e2e/test';

const sourceData = `
@prefix ex: <http://example.org/> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .

ex:team1 a ex:SportsTeam .
ex:team1 rdfs:label "E2E Testing Athletic FC" .
ex:SportsTeam rdfs:label "Sports Team" .`;

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
				name: 'http://example.org/team1',
				exact: true
			})
		).toBeVisible();
		await expect(
			page.getByRole('link', {
				name: 'http://example.org/SportsTeam',
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
				name: 'E2E Testing Athletic FC',
				exact: true
			})
		).toBeVisible();
		await expect(
			page.getByRole('link', {
				name: 'Sports Team',
				exact: true
			})
		).toBeVisible();
	});
});
