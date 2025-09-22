/* (c) Crown Copyright GCHQ */

import { expect, test } from '$e2e/test';

const exampleSourceName = 'Test Name';
const exampleUrl = 'http://www.example.com/';
const exampleDescription = 'Test Description';

test.describe('add remote data source page', () => {
	test.beforeEach(async ({ addRemoteDataSourcePage }) => {
		await addRemoteDataSourcePage.goto();
	});

	test('allows you to add local sources', async ({
		page,
		listSourcesPage,
		addRemoteDataSourcePage
	}) => {
		await addRemoteDataSourcePage.createRemoteDataSource(
			exampleSourceName,
			exampleUrl,
			exampleDescription
		);

		// This redirects us to the sources page, showing our new source
		await expect(page).toHaveURL(listSourcesPage.baseUrl);
		await expect(listSourcesPage.sourceCard(exampleSourceName)).toBeVisible();
	});

	test('validates presence of source name and URL', async ({ page, addRemoteDataSourcePage }) => {
		await addRemoteDataSourcePage.clickSubmit();
		await expect(page.getByText('Please provide a name for this source').first()).toBeVisible();
		await expect(
			page.getByText('Please provide a remote location for this source').first()
		).toBeVisible();

		// Did not navigate us away from the "add source" page
		await expect(page).toHaveURL(addRemoteDataSourcePage.baseUrl);
	});

	test('allows you to back out of creation and return to the sources page', async ({
		page,
		listSourcesPage,
		addRemoteDataSourcePage
	}) => {
		await addRemoteDataSourcePage.fillSourceName(exampleSourceName);
		await addRemoteDataSourcePage.clickBackToSources();

		// navigates us back to sources page without creating the data source
		await expect(page).toHaveURL(listSourcesPage.baseUrl);
		await expect(listSourcesPage.sourceCard(exampleSourceName)).not.toBeVisible();
	});
});
