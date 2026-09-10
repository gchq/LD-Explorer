/* (c) Crown Copyright GCHQ */

import { QuadsViewPage } from '../BasePages';

export default class ExploreIRISearchPage extends QuadsViewPage {
	readonly baseUrl = '/explore/iris/detail';

	async goto() {
		await this.page.goto(this.baseUrl);
	}

	async navigateTo() {
		throw new Error('Not Implemented');
	}
}
