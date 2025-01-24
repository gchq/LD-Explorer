<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { Alert, Button, Link, Tab, TabNavigation, TabPanel, TextField } from '$lib/components';
	import {
		importJsonLDDocument,
		importRdfDocument,
		importRdfaDocument
	} from '$lib/util/source.util';
	import type { IcValueEventDetail } from '@ukic/web-components';
	import type { LocalSource } from '$stores/sources/local-sources.store';
	import type { PageData } from './$types';
	import { PageView } from '$lib/components/views';
	import { PrefixBrowserView } from '$lib/components/views';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';

	// Props
	export let data: PageData;
	let source = { ...data.source };

	type ImportType = 'rdf' | 'rdfa' | 'json-ld';
	type ImportTypes = {
		[key in ImportType]: {
			label: string;
			helperText: string;
			importFunction: (source: LocalSource, document: string) => Promise<void>;
		};
	};

	const LocalDataSourceImportTab = {
		Document: 0,
		PrefixBrowser: 1
	};

	// State
	let document = '';
	let parseError = '';
	let selectedTabIndex = LocalDataSourceImportTab.Document;
	let currentImportType: ImportType = 'rdf';

	// Validation
	export let valid = false;
	export let validationEnabled = false;
	$: {
		valid = document.trim().length > 0;
	}

	const imports: ImportTypes = {
		rdf: {
			label: 'RDF',
			helperText: 'Supported document formats are Turtle, TriG, N-Triples, or N-Quads',
			importFunction: importRdfDocument
		},
		rdfa: {
			label: 'RDFa',
			helperText: '',
			importFunction: importRdfaDocument
		},
		'json-ld': {
			label: 'JSON-LD',
			helperText: '',
			importFunction: importJsonLDDocument
		}
	} as const;

	// Events
	async function handleSubmit() {
		validationEnabled = true;

		if (valid)
			imports[currentImportType]
				.importFunction(source, document)
				.then(() => goto(`${base}/sources`))
				.catch((err: Error) => (parseError = err.message));
	}

	function handleImportTypeChanged(e: CustomEvent<IcValueEventDetail>) {
		currentImportType = e.detail.value as ImportType;
		selectedTabIndex = LocalDataSourceImportTab.Document;
	}
</script>

<PageView
	heading="Import to local source"
	subheading="Import a new RDF document into a local data source."
>
	<ic-typography>Import data into the <strong>{source.name}</strong> datasource.</ic-typography>

	<ic-select
		class="mt-4 mb-10 block"
		value={currentImportType}
		on:icChange={handleImportTypeChanged}
		label="Import format"
		options={Object.entries(imports).map(([value, { label }]) => ({ label, value }))}
	></ic-select>

	<TabNavigation bind:selectedTabIndex>
		<Tab title="Document" />
		<Tab
			title="Prefix Browser"
			selected={selectedTabIndex == LocalDataSourceImportTab.PrefixBrowser}
			disabled={currentImportType == 'json-ld'}
		/>

		<svelte:fragment slot="panels">
			<TabPanel>
				<form on:submit|preventDefault={handleSubmit}>
					{#if parseError.length > 0}
						<Alert variant="error" heading="Document Parse Error" message={parseError} />
					{/if}

					<TextField
						codeEditor
						label={`${imports[currentImportType].label} document`}
						bind:value={document}
						rows={10}
						helperText={imports[currentImportType].helperText}
						isValid={valid && parseError.length == 0}
						{validationEnabled}
						validationErrorMessage={`Please provide a valid ${imports[currentImportType].label} document`}
					/>

					<Button label="Import" type="submit" variant="primary" />
					<Link htmlClass="block mt-2" href="/sources">Back to Sources</Link>
				</form>
			</TabPanel>
			<TabPanel>
				<PrefixBrowserView
					{document}
					onAddPrefix={(prefix) => (document = `${prefix}\n${document}`)}
					description="Add common prefixes to your imported document."
				/>
			</TabPanel>
		</svelte:fragment>
	</TabNavigation>
</PageView>
