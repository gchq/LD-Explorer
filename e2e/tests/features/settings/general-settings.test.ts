/* (c) Crown Copyright GCHQ */

import { expect, test } from '$e2e/test';

test.describe('General Settings', () => {
	test.describe('Default Limit', () => {
		test.beforeEach(
			async ({ sherlockExampleDataTTL, addLocalDataSourcePage, importToLocalDataSourcePage }) => {
				const sourceName = 'Sherlock Data';
				await addLocalDataSourcePage.goto();
				await addLocalDataSourcePage.createLocalDataSource(sourceName);
				await importToLocalDataSourcePage.navigateTo(sourceName);
				await importToLocalDataSourcePage.importRdfData(sherlockExampleDataTTL);
			}
		);

		test('Default limit of 1000 works as expected', async ({ exploreIndividualsPage }) => {
			await exploreIndividualsPage.navigateTo();

			// SPARQL indicator has correct limit
			await exploreIndividualsPage.sparqlDetailToggle.click();
			await expect(await exploreIndividualsPage.sparqlDetail).toContainText('LIMIT 1000');

			// Table has two rows
			await expect(exploreIndividualsPage.page.locator('table tbody tr')).toHaveCount(2);
		});

		test('Changing limit to 1 works as expected', async ({
			exploreIndividualsPage,
			generalSettingsPage
		}) => {
			await generalSettingsPage.navigateTo();
			await generalSettingsPage.setDefaultLimit(1);

			await exploreIndividualsPage.navigateTo();

			// SPARQL indicator has correct limit
			await exploreIndividualsPage.sparqlDetailToggle.click();
			await expect(await exploreIndividualsPage.sparqlDetail).not.toContainText('LIMIT 1000');
			await expect(await exploreIndividualsPage.sparqlDetail).toContainText('LIMIT 1');

			// Table has two rows
			await expect(exploreIndividualsPage.page.locator('table tbody tr')).toHaveCount(1);
		});
	});
});
