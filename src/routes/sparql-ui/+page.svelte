<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { Alert, Button, Tab, TabNavigation, TabPanel, TextField } from '$lib/components';
	import type { IcValueEventDetail } from '@ukic/web-components';
	import { PageView } from '$lib/components/views';
	import { PrefixBrowserView } from '$lib/components/views';
	import { QueryResultsView } from '$lib/components/views';
	import exampleQueries from '$lib/querying/exampleQueries';
	import { validateSparql } from '$lib/querying/sparqlUtils';

	// We need to change tabs programatically, therefore they need to be given explicit IDs.
	const SparqlUiTab = {
		QueryBuilder: 0,
		Results: 1,
		PrefixBrowser: 2
	};

	let sparqlQuery = $state('');
	let submittedSparql = $state('');
	let sparqlParseError = $state('');
	let selectedTabIndex = $state(SparqlUiTab.QueryBuilder);
	let validationEnabled = $derived(sparqlQuery.length > 0);
	let validationStatus = $derived(validationEnabled && sparqlParseError.length > 0 ? 'error' : '');
	let submitted = $derived(submittedSparql.length > 0);
	let showResults = $derived(submitted && !sparqlParseError);

	function handleSubmit(e: Event) {
		e.preventDefault();

		sparqlParseError = '';
		try {
			validateSparql(sparqlQuery);
			selectedTabIndex = SparqlUiTab.Results; // switch to results tab
			submittedSparql = sparqlQuery;
		} catch (err: unknown) {
			if (err instanceof Error) {
				sparqlParseError = err.message;
			}
		}
	}

	function handleSparqlQueryChanged(e: CustomEvent<IcValueEventDetail>) {
		sparqlQuery = e.detail.value;
		resetParseError();
	}

	function handleFormReset() {
		sparqlQuery = '';
		resetParseError();
	}

	function resetParseError() {
		sparqlParseError = '';
	}
</script>

<PageView heading="SPARQL UI" subheading="Execute SPARQL1.1 queries across all active sources.">
	<TabNavigation bind:selectedTabIndex>
		<Tab title="Query" selected={selectedTabIndex == SparqlUiTab.QueryBuilder} />
		<Tab
			title="Result"
			disabled={!showResults}
			selected={selectedTabIndex == SparqlUiTab.Results}
		/>
		<Tab title="Prefix Browser" selected={selectedTabIndex == SparqlUiTab.PrefixBrowser} />

		{#snippet panels()}
			<TabPanel>
				<ic-select
					onicChange={handleSparqlQueryChanged}
					label="Select pre-build query"
					full-width
					options={exampleQueries.map((ex) => ({ label: ex.queryName, value: ex.query }))}
				></ic-select>

				<form onsubmit={handleSubmit}>
					{#if sparqlParseError}
						<Alert variant="error" heading="Sparql Parse Error" message={sparqlParseError} />
					{/if}
					<TextField
						codeEditor
						label="Sparql Query"
						helperText="SPARQL 1.1 supported query types are SELECT, DESCRIBE, ASK and CONSTRUCT"
						bind:value={sparqlQuery}
						oninput={resetParseError}
						rows={10}
						{validationEnabled}
						isValid={validationStatus != 'error'}
						validationErrorMessage="Invalid Query"
					/>

					<Button label="Submit" type="submit" disabled={sparqlQuery.length == 0} />
					<Button label="Reset" type="reset" onclick={handleFormReset} variant="destructive" />
				</form>
			</TabPanel>
			<TabPanel>
				{#if showResults}
					<QueryResultsView query={submittedSparql} />
				{/if}
			</TabPanel>
			<TabPanel
				><PrefixBrowserView
					document={sparqlQuery}
					onAddPrefix={(prefix) => (sparqlQuery = `${prefix}\n${sparqlQuery}`)}
					description="Add common prefixes to your SPARQL query."
				/></TabPanel
			>
		{/snippet}
	</TabNavigation>
</PageView>
