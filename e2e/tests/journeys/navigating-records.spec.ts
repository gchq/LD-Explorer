/* (c) Crown Copyright GCHQ */

import { expect, test } from '$e2e/test';

// TODO: This probably should be a a feature test rather than a journey.
test('Navigating records', async ({
	page,
	addLocalDataSourcePage,
	importToLocalDataSourcePage,
	sherlockExampleDataTTL,
	exploreClassesPage,
	exploreIndividualsPage
}) => {
	const sourceName = 'ExampleData';

	await addLocalDataSourcePage.goto();
	await addLocalDataSourcePage.createLocalDataSource(sourceName);

	await importToLocalDataSourcePage.navigateTo(sourceName);
	await importToLocalDataSourcePage.importRdfData(sherlockExampleDataTTL);

	// Go to the classes page and make sure the single class "Person" is there.
	await exploreClassesPage.navigateTo();
	await expect(page.getByText('Found 1 item')).toBeVisible();
	await page.getByRole('link', { name: 'Person' }).click();

	// Now on the describe page for the Person class - click individuals and check
	// we have two (Holmes and Moriarty)
	await page.getByRole('link', { name: 'Individuals' }).click();
	await expect(page.getByText('Found 2 items')).toBeVisible();
	await page.getByRole('link', { name: 'sherlock_holmes' }).click();

	// Now on describe page for Sherlock. Make sure the correct details are there and
	// click on moriarty.
	await expect(page.getByText('Found 3 items')).toBeVisible();
	await expect(page.getByText('Sherlock Holmes')).toBeVisible();

	// Make sure correct details for moriarty are there
	await page.getByRole('link', { name: 'james_moriarty' }).click();
	await expect(page.getByText('Found 3 items')).toBeVisible();
	await expect(page.getByText('James Moriarty')).toBeVisible();
});
