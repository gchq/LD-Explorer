/* (c) Crown Copyright GCHQ */

import { Locator, Page } from '@playwright/test';
import { LDExplorerPage } from '../BasePages';
import { navigateTo } from '$e2e/helpers/navigation';

export default class GeneralSettingsPage extends LDExplorerPage {
	readonly defaultLimitSetting: Locator;
	readonly displayLabelsSetting: Locator;
	readonly applyButton: Locator;

	constructor(public readonly page: Page) {
		super(page);
		this.defaultLimitSetting = page.getByLabel('Default Limit');
		this.displayLabelsSetting = page.getByText('Display Labels');
		this.applyButton = page.getByRole('button', { name: 'Apply' });
	}

	async goto() {
		await this.page.goto('/settings');
	}

	async navigateTo() {
		await navigateTo(this.page, /Settings$/);
	}

	async setDefaultLimit(limit: number) {
		await this.defaultLimitSetting.fill(limit.toString());
		await this.applyButton.click();
	}

	async toggleShowLabels() {
		await this.displayLabelsSetting.click();
		await this.applyButton.click();
	}
}
