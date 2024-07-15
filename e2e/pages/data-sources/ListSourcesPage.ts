/* (c) Crown Copyright GCHQ */

import { Locator, Page } from '@playwright/test';
import { LDExplorerPage } from '../BasePages';
import { navigateTo } from '$e2e/helpers/navigation';

export default class ListDataSourcesPage extends LDExplorerPage {
	readonly baseUrl = '/sources';
	private readonly addLocalDataSourceButton: Locator;
	private readonly addRemoteDataSourceButton: Locator;
	private readonly removeAllSourcesButton: Locator;
	public readonly dataSources: Locator;
	public readonly sourceCard: (sourceName: string) => Locator;
	public readonly showSourceButton: (sourceName: string) => Locator;
	public readonly editSourceButton: (sourceName: string) => Locator;
	public readonly disableSourceButton: (sourceName: string) => Locator;
	public readonly enableSourceButton: (sourceName: string) => Locator;
	public readonly importSourceButton: (sourceName: string) => Locator;

	readonly alert: Locator;

	constructor(public readonly page: Page) {
		super(page);
		this.addLocalDataSourceButton = page.getByRole('link', { name: 'Add Local Source' });
		this.addRemoteDataSourceButton = page.getByRole('link', { name: 'Add Remote Source' });
		this.removeAllSourcesButton = page.getByRole('button', { name: 'Remove All Sources' });
		this.dataSources = page.getByTestId(`data-source-card`);
		this.alert = page.getByRole('alert').first();
		this.sourceCard = (sourceName) => {
			const child = this.page.getByText(sourceName);
			return page.getByTestId('data-source-card').filter({ has: child });
		};
		this.showSourceButton = (sourceName) =>
			this.sourceCard(sourceName).getByRole('link', { name: `Show source ${sourceName}` });
		this.editSourceButton = (sourceName) =>
			this.sourceCard(sourceName).getByRole('link', { name: `Edit source ${sourceName}` });
		this.importSourceButton = (sourceName) =>
			this.sourceCard(sourceName).getByRole('link', {
				name: `Import data into source ${sourceName}`
			});
		this.disableSourceButton = (sourceName) =>
			this.sourceCard(sourceName).getByRole('button', { name: `Disable source ${sourceName}` });
		this.enableSourceButton = (sourceName) =>
			this.sourceCard(sourceName).getByRole('button', { name: `Enable source ${sourceName}` });
	}

	async goto() {
		await this.page.goto(this.baseUrl);
	}

	async navigateTo() {
		await navigateTo(this.page, /Sources/);
	}

	async clickAddLocalDataSource() {
		await this.addLocalDataSourceButton.click();
	}

	async clickAddRemoteDataSource() {
		await this.addRemoteDataSourceButton.click();
	}

	async clickImportLocalDataSource(sourceName: string) {
		await this.importSourceButton(sourceName).click();
	}

	async clickRemoveAll() {
		await this.removeAllSourcesButton.click();
	}
}
