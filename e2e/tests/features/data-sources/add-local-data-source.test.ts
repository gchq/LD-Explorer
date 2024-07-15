/* (c) Crown Copyright GCHQ */

import { expect, test } from '$e2e/test';

const exampleSourceName = 'Test Name';
const exampleDescription = 'Test Description';

test.describe('add local data source page', () => {
	test.beforeEach(async ({ addLocalDataSourcePage }) => {
		addLocalDataSourcePage.goto();
	});

	test('allows you to add local sources', async ({
		page,
		listSourcesPage,
		addLocalDataSourcePage
	}) => {
		await addLocalDataSourcePage.createLocalDataSource(exampleSourceName, exampleDescription);

		// This redirects us to the sources page, showing our new source
		await expect(page).toHaveURL(listSourcesPage.baseUrl);
		await expect(listSourcesPage.sourceCard(exampleSourceName)).toBeVisible();
	});

	test('validates presence of source name', async ({ page, addLocalDataSourcePage }) => {
		await addLocalDataSourcePage.clickSubmit();
		await expect(page.getByText('Please provide a name for this source')).toBeVisible();

		// Did not navigate us away from the "add source" page
		await expect(page).toHaveURL(addLocalDataSourcePage.baseUrl);
	});

	test('allows you to back out of creation and return to the sources page', async ({
		page,
		addLocalDataSourcePage,
		listSourcesPage
	}) => {
		await addLocalDataSourcePage.fillSourceName(exampleSourceName);
		await addLocalDataSourcePage.clickBackToSources();

		// navigates us back to sources page without creating the data source
		await expect(page).toHaveURL(listSourcesPage.baseUrl);
		await expect(listSourcesPage.sourceCard(exampleSourceName)).not.toBeVisible();
	});
});
