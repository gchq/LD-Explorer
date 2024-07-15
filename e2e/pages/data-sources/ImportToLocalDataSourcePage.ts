/* (c) Crown Copyright GCHQ */

import { Locator, Page } from '@playwright/test';
import { LDExplorerPage } from '../BasePages';
import ListDataSourcesPage from '$e2e/pages/data-sources/ListSourcesPage';

type ImportFormat = 'RDF' | 'RDFa' | 'JSON-LD';

export default class ImportToLocalDataSourcePage extends LDExplorerPage {
	private readonly importFormatDropdown: Locator;
	private readonly importFormatMenu: Locator;
	private readonly importTextField: Locator;
	private readonly submitButton: Locator;

	constructor(public readonly page: Page) {
		super(page);
		this.importFormatDropdown = page.getByRole('button', { name: 'Import Format' });
		this.importFormatMenu = page.getByRole('listbox', { name: 'Import Format' });
		this.importTextField = page.getByRole('textbox');
		this.submitButton = page.getByRole('button', { name: 'Import', exact: true });
	}

	async goto(sourceId: string) {
		await this.page.goto(`/sources/${sourceId}/import`);
	}

	async navigateTo(sourceName: string) {
		const listSourcesPage = new ListDataSourcesPage(this.page);
		await listSourcesPage.navigateTo();
		await listSourcesPage.clickImportLocalDataSource(sourceName);
	}

	async fillTextField(text: string) {
		await this.importTextField.fill(text);
	}

	async selectImportFormat(importFormat: ImportFormat) {
		await this.importFormatDropdown.click();
		await this.importFormatMenu.getByLabel(importFormat, { exact: true }).click();
	}

	async clickSubmit() {
		await this.submitButton.click();
	}

	async importRdfData(data: string) {
		await this.fillTextField(data);
		await this.clickSubmit();
	}
}
