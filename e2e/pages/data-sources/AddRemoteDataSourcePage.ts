/* (c) Crown Copyright GCHQ */

import { Locator, Page } from '@playwright/test';
import { LDExplorerPage } from '../BasePages';
import { navigateTo } from '$e2e/helpers/navigation';

export default class AddRemoteDataSourcePage extends LDExplorerPage {
	readonly baseUrl = '/sources/remote/add';
	private readonly sourceNameInput: Locator;
	private readonly descriptionInput: Locator;
	private readonly urlInput: Locator;
	private readonly submitButton: Locator;
	private readonly backToSourcesLink: Locator;

	constructor(public readonly page: Page) {
		super(page);
		this.sourceNameInput = page.getByLabel('Source Name');
		this.descriptionInput = page.getByLabel('Description');
		this.urlInput = page.getByLabel('Url');
		this.submitButton = page.getByRole('button', { name: 'Submit' });
		this.backToSourcesLink = page.getByRole('link', { name: 'Back to Sources' });
	}

	async goto() {
		await this.page.goto(this.baseUrl);
	}

	async navigateTo() {
		await navigateTo(this.page, /Sources$/);
		await this.page.getByRole('link', { name: /Add Remote Source/ }).click();
	}

	async createRemoteDataSource(sourceName: string, url: string, description?: string) {
		await this.fillSourceName(sourceName);
		await this.fillDescription(description);
		await this.fillUrl(url);
		await this.clickSubmit();
	}

	async fillSourceName(sourceName: string) {
		await this.sourceNameInput.fill(sourceName);
	}

	async fillDescription(description?: string) {
		if (description) await this.descriptionInput.fill(description);
	}

	async fillUrl(url: string) {
		await this.urlInput.fill(url);
	}

	async clickSubmit() {
		await this.submitButton.click();
	}

	async clickBackToSources() {
		await this.backToSourcesLink.click();
	}
}
