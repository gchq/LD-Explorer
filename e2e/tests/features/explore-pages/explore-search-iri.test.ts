/* (c) Crown Copyright GCHQ */

import { expect, test } from '$e2e/test';

/**
 * Tests relating to any "bindings" views, such as the "Explore classes" page.
 */
test.describe('Explore Search IRI page tests', () => {
	test.beforeEach(({ page }) => page.goto('/'));

	test('has the right headings', async ({ exploreIriSearchPage }) => {
		await exploreIriSearchPage.navigateTo();
		await expect(exploreIriSearchPage.mainHeading.getByText('IRI Search')).toBeVisible();
	});

	test('allows you to search for a specific IRI', async ({
		page,
		exploreIriSearchPage,
		exploreIriDetailPage
	}) => {
		await exploreIriSearchPage.navigateTo();

		const exampleIri = 'http://www.example.com/my-iri';
		await exploreIriSearchPage.fillIriValue(exampleIri);
		await exploreIriSearchPage.clickSubmit();

		// Navigates us to that IRI's describe page
		await expect(page).toHaveURL(
			exploreIriDetailPage.baseUrl + `?iri=${encodeURIComponent(exampleIri)}`
		);
	});
});
