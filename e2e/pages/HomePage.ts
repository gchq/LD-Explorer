/* (c) Crown Copyright GCHQ */

import { Locator, Page } from '@playwright/test';
import { LDExplorerPage } from './BasePages';
import { navigateTo } from '$e2e/helpers/navigation';

export default class HomePage extends LDExplorerPage {
	readonly hero: Locator;

	constructor(public readonly page: Page) {
		super(page);
		this.hero = page.locator('ic-hero').first();
	}

	async goto() {
		await this.page.goto('/');
	}

	async navigateTo() {
		await navigateTo(this.page, /Home/);
	}
}
