/* (c) Crown Copyright GCHQ */

import { Locator, Page } from '@playwright/test';

/**
 * Short abstract class ensures that POMs must implement certain functions to make them
 * consistent. This should remain as lightweight as possible.
 */
export abstract class LDExplorerPage {
	readonly mainHeading: Locator;
	readonly subHeading: Locator;

	constructor(public readonly page: Page) {
		this.mainHeading = page.getByRole('heading', { level: 2 }).first();
		this.subHeading = page.getByRole('heading', { level: 3 }).first();
	}

	abstract goto(...args: unknown[]): Promise<void>;
	abstract navigateTo(...args: unknown[]): Promise<void>;
}

abstract class ResultsViewPage extends LDExplorerPage {
	readonly sparqlDetailToggle: Locator;
	readonly sparqlDetail: Locator;

	constructor(public readonly page: Page) {
		super(page);
		this.sparqlDetailToggle = page.getByText('View SPARQL query');
		this.sparqlDetail = page.getByRole('code');
	}
}

export abstract class BindingsViewPage extends ResultsViewPage {}
export abstract class QuadsViewPage extends ResultsViewPage {}
