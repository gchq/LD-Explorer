/* (c) Crown Copyright GCHQ */

import { expect, test } from '$e2e/test';
import ListSourcesPage from '$e2e/pages/data-sources/ListSourcesPage';

test.describe('View data sources page', () => {
	let listSourcesPage: ListSourcesPage;
	const localSourceName = 'Test Local Data Source';
	const remoteSourceName = 'Test Remote Data Source';
	const exampleUrl = 'http://www.example.com/';

	test.beforeEach(async ({ page, addLocalDataSourcePage, addRemoteDataSourcePage }) => {
		listSourcesPage = new ListSourcesPage(page);
		await listSourcesPage.goto();

		// Create a local data source
		await addLocalDataSourcePage.navigateTo();
		await addLocalDataSourcePage.createLocalDataSource(localSourceName);

		// Create a remote data source
		await addRemoteDataSourcePage.navigateTo();
		await addRemoteDataSourcePage.createRemoteDataSource(remoteSourceName, exampleUrl);
	});

	test('Lists all sources', async () => {
		await expect(await listSourcesPage.dataSources).toHaveCount(2);
		await expect(await listSourcesPage.alert).not.toBeVisible();
	});

	test('Allows all sources to be removed at once', async () => {
		await listSourcesPage.clickRemoveAll();
		await expect(await listSourcesPage.dataSources).toHaveCount(0);
		await expect(await listSourcesPage.alert).toHaveText(/No sources configured/);
	});

	[localSourceName, remoteSourceName].forEach((sourceName) => {
		test(`Displays correct information and interaction options for ${sourceName}`, async () => {
			await expect(listSourcesPage.showSourceButton(sourceName)).toBeVisible();
			await expect(listSourcesPage.editSourceButton(sourceName)).toBeVisible();
			await expect(listSourcesPage.disableSourceButton(sourceName)).toBeVisible();
			await expect(listSourcesPage.enableSourceButton(sourceName)).not.toBeVisible();

			// Test expected differences between local and remote
			const sourceCard = listSourcesPage.sourceCard(sourceName);
			if (sourceName === localSourceName) {
				// Local source
				await expect(listSourcesPage.importSourceButton(sourceName)).toBeVisible();
				await expect(sourceCard.getByText('Local', { exact: true })).toBeVisible();
				await expect(sourceCard.getByText('Triples: 0')).toBeVisible();
			} else {
				// Remote source
				await expect(listSourcesPage.importSourceButton(sourceName)).not.toBeVisible();
				await expect(sourceCard.getByText('Remote', { exact: true })).toBeVisible();
				await expect(sourceCard.getByText(exampleUrl)).toBeVisible();
			}
		});

		test(`Allows enable/disable functionality for ${sourceName}`, async () => {
			await expect(listSourcesPage.sourceCard(sourceName)).toHaveText(/Enabled/);
			await listSourcesPage.disableSourceButton(sourceName).click();
			await expect(listSourcesPage.sourceCard(sourceName)).toHaveText(/Disabled/);
			await listSourcesPage.enableSourceButton(sourceName).click();
			await expect(listSourcesPage.sourceCard(sourceName)).toHaveText(/Enabled/);
		});
	});
});
