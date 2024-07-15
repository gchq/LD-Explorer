/* (c) Crown Copyright GCHQ */

import { expect, test } from '$e2e/test';

/**
 * Tests relating to any "bindings" views, such as the "Explore classes" page.
 */
test.describe('Explore Classes page tests', () => {
	test.beforeEach(({ page }) => page.goto('/'));

	test('has the right headings', async ({ exploreClassesPage }) => {
		await exploreClassesPage.navigateTo();
		await expect(exploreClassesPage.mainHeading.getByText('Classes')).toBeVisible();
		await expect(exploreClassesPage.subHeading.getByText('All Classes')).toBeVisible();
	});

	test.describe('When data is present', () => {
		test.beforeEach(
			async ({
				addLocalDataSourcePage,
				importToLocalDataSourcePage,
				sherlockExampleDataTTL,
				exploreClassesPage
			}) => {
				const exampleSourceName = 'Sherlock Data';
				await addLocalDataSourcePage.navigateTo();
				await addLocalDataSourcePage.createLocalDataSource(exampleSourceName);
				await importToLocalDataSourcePage.navigateTo(exampleSourceName);
				await importToLocalDataSourcePage.importRdfData(sherlockExampleDataTTL);
				await exploreClassesPage.navigateTo();
			}
		);

		test('contains table with correct data', async ({ exploreClassesPage }) => {
			await expect(exploreClassesPage.page.locator('table tbody tr')).toHaveCount(1);
			await expect(exploreClassesPage.page.getByRole('cell').getByText('Person')).toBeVisible();
		});
	});
});
