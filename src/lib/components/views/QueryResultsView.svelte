<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { Alert, Paragraph as P } from '$lib/components';
	import { BindingsView, BooleanView, QuadsView } from '$lib/components/views';
	import { QueryStatus } from '$lib/types';
	import { SparqlQueryDetail } from '$lib/components/views/sparql';
	import { createQueryStore } from '$stores/streamedQuery.store';
	import { sourceList } from '$stores/sources/sources.store';

	// Props
	export let query: string;
	export let codeComment: string | undefined = undefined;

	$: queryStore = createQueryStore(query, $sourceList);
</script>

<SparqlQueryDetail {queryStore} {codeComment} />
{#if $sourceList.length}
	{#if $queryStore.status == QueryStatus.Initialized}
		<P>Initializing query...</P>
	{:else if $queryStore.type === 'bindings'}
		<BindingsView results={queryStore} />
	{:else if $queryStore.type === 'quads'}
		<QuadsView results={queryStore} />
	{:else if $queryStore.type === 'boolean'}
		<BooleanView results={queryStore} />
	{:else}
		<P>Unsupported Query Type</P>
	{/if}
{:else}
	<Alert
		variant="warning"
		heading="No Data Sources"
		message="You are attempting to run a query before you've added any data sources."
	></Alert>
{/if}
