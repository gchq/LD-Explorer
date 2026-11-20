<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { Alert, Paragraph as P } from '#lib/components/index.ts';
	import { BindingsView, BooleanView, QuadsView } from '#lib/components/views/index.ts';
	import { QueryStatus } from '#lib/types.ts';
	import { SparqlQueryDetail } from '#lib/components/views/sparql/index.ts';
	import { createQueryStore } from '#lib/stores/streamedQuery.store.ts';
	import { sourceList } from '#lib/stores/sources/sources.store.ts';

	// Props
	interface Props {
		query: string;
		codeComment?: string;
	}
	let { query, codeComment }: Props = $props();
	let queryStore = $derived(createQueryStore(query, $sourceList));
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
