/* (c) Crown Copyright GCHQ */

import { Locator, Page } from '@playwright/test';
import { QuadsViewPage } from '../BasePages';
import { navigateTo } from '$e2e/helpers/navigation';

export default class ExploreIRISearchPage extends QuadsViewPage {
	readonly baseUrl = '/explore/iris';
	private readonly iriInput: Locator;
	private readonly submitButton: Locator;

	constructor(public readonly page: Page) {
		super(page);
		this.iriInput = page.getByLabel('IRI');
		this.submitButton = page.getByRole('button', { name: 'Submit' });
	}

	async goto() {
		await this.page.goto(this.baseUrl);
	}

	async navigateTo() {
		await navigateTo(this.page, /Explore$/, /IRI Search$/);
	}

	async fillIriValue(iri: string) {
		await this.iriInput.fill(iri);
	}

	async clickSubmit() {
		await this.submitButton.click();
	}
}
