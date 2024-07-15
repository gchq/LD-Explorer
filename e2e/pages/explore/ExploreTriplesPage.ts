/* (c) Crown Copyright GCHQ */

import { QuadsViewPage } from '../BasePages';
import { navigateTo } from '$e2e/helpers/navigation';

export default class ExploreIndividualsPage extends QuadsViewPage {
	readonly baseUrl = '/explore/triples';

	async goto() {
		await this.page.goto(this.baseUrl);
	}

	async navigateTo() {
		await navigateTo(this.page, /Explore$/, /Triples$/);
	}
}
