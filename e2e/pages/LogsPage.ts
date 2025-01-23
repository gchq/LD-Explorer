/* (c) Crown Copyright GCHQ */

import { Locator, Page } from '@playwright/test';
import { LDExplorerPage } from './BasePages';
import { navigateTo } from '$e2e/helpers/navigation';

export default class LogsPage extends LDExplorerPage {
	readonly clearLogsButton: Locator;

	constructor(public readonly page: Page) {
		super(page);
		this.clearLogsButton = page.getByRole('button', { name: 'Clear Logs' });
	}

	async goto() {
		await this.page.goto('/logs');
	}

	async navigateTo() {
		await navigateTo(this.page, /Logs$/);
	}

	async clickClearLogs() {
		await this.clearLogsButton.click();
	}
}
