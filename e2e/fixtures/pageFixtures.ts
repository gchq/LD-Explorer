/* (c) Crown Copyright GCHQ */

/**
 * PageFixtures conveniently provide pre-instantiated versions of the Page Object Models (POMs)
 * from the e2e/pages folder directly to tests. To add a new one, just put an extra entry in
 * the `pages` object for your new POM - the rest of the file is dynamic and should not need
 * to be changed.
 */
import AddLocalDataSourcePage from '$e2e/pages/data-sources/AddLocalDataSourcePage';
import AddRemoteDataSourcePage from '$e2e/pages/data-sources/AddRemoteDataSourcePage';
import ExploreClassesPage from '$e2e/pages/explore/ExploreClassesPage';
import ExploreIndividualsPage from '$e2e/pages/explore/ExploreIndividualsPage';
import ExploreTriplesPage from '$e2e/pages/explore/ExploreTriplesPage';
import GeneralSettingsPage from '$e2e/pages/settings/GeneralSettingsPage';
import ImportToLocalDataSourcePage from '$e2e/pages/data-sources/ImportToLocalDataSourcePage';
import ListSourcesPage from '$e2e/pages/data-sources/ListSourcesPage';
import { test as base } from '@playwright/test';

// To add a new page fixture, import the class above and add it to this object. The "key" in
// this object is how you'll refer to the fixture in your tests.
const pages = {
	addLocalDataSourcePage: AddLocalDataSourcePage,
	importToLocalDataSourcePage: ImportToLocalDataSourcePage,
	addRemoteDataSourcePage: AddRemoteDataSourcePage,
	listSourcesPage: ListSourcesPage,
	exploreClassesPage: ExploreClassesPage,
	exploreIndividualsPage: ExploreIndividualsPage,
	exploreTriplesPage: ExploreTriplesPage,
	generalSettingsPage: GeneralSettingsPage
};

/**
 * METAPROGRAMMING FOLLOWS
 *
 * You shouldn't need to edit anything below this comment when adding new page fixtures - just
 * put a new entry in the `page` object above, the rest should sort itself out. If you are
 * looking to create a fixture that requrires more than just "instantiate the page" then these
 * are a different type of fixture - that functionality should not be added here.
 */
type PageFixtures = {
	[K in keyof typeof pages]: InstanceType<(typeof pages)[K]>;
};

export const test = base.extend<PageFixtures>(
	Object.fromEntries(
		Object.entries(pages).map(([pageKey, PageKlass]) => [
			pageKey,
			async ({ page }, use) => {
				// This is all this fixture is ever intended to do - instantiate a new version
				// of the POM and pass it to the test.
				const pageInstance = new PageKlass(page);
				await use(pageInstance);
			}
		])
	)
);
