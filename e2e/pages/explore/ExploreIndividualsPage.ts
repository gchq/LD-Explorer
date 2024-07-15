/* (c) Crown Copyright GCHQ */

import { BindingsViewPage } from '../BasePages';
import { navigateTo } from '$e2e/helpers/navigation';

export default class ExploreIndividualsPage extends BindingsViewPage {
	readonly baseUrl = '/explore/individuals';

	async goto() {
		await this.page.goto(this.baseUrl);
	}

	async navigateTo() {
		await navigateTo(this.page, /Explore$/, /Individuals$/);
	}
}
