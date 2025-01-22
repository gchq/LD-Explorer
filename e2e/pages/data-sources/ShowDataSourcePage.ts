/* (c) Crown Copyright GCHQ */

import { Locator, Page } from '@playwright/test';
import { LDExplorerPage } from '../BasePages';
import ListDataSourcesPage from '$e2e/pages/data-sources/ListSourcesPage';

export default class ShowDataSourcePage extends LDExplorerPage {
	private readonly detailTab: Locator;
	private readonly sampleDataTab: Locator;

	constructor(public readonly page: Page) {
		super(page);
		this.detailTab = page.getByRole('tab', { name: `Detail` });
		this.sampleDataTab = page.getByRole('tab', { name: `Sample data` });
	}

	async goto(sourceId: string) {
		await this.page.goto(`/sources/${sourceId}`);
	}

	async navigateTo(sourceName: string) {
		const listSourcesPage = new ListDataSourcesPage(this.page);
		await listSourcesPage.navigateTo();
		await listSourcesPage.clickShowDataSource(sourceName);
	}

	async clickShowSampleData() {
		await this.sampleDataTab.click();
	}
}
