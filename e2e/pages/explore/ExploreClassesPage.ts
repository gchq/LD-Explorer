/* (c) Crown Copyright GCHQ */

import { BindingsViewPage } from '../BasePages';
import { navigateTo } from '$e2e/helpers/navigation';

export default class ExploreClassesPage extends BindingsViewPage {
	readonly baseUrl = '/explore/classes';

	async goto() {
		await this.page.goto(this.baseUrl);
	}

	async navigateTo() {
		await navigateTo(this.page, /Explore$/, /Classes$/);
	}
}
