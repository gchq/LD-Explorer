<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { Alert, Button } from '$lib/components';
	import { Graph, Table, Turtle } from '$lib/components/ui/icons';
	import type { Quad } from '@rdfjs/types';
	import QuadsGraph from './QuadsGraph.svelte';
	import QuadsTable from './QuadsTable.svelte';
	import QuadsTurtle from './QuadsTurtle.svelte';
	import { QueryStatus } from '$lib/types';
	import type { Readable } from 'svelte/store';
	import type { StreamedQuery } from '$stores/streamedQuery.store';

	// Workaround to stop client from crashing if user runs these views with a lot of data.
	// LD explorer graph/TTL functionality is value-add and not inherently vital to the
	// application's purpose - users wishing to visualise very large graphs should find a
	// more appropriate tool.
	const MAX_DISPLAY_GRAPH = 200;
	const MAX_DISPLAY_TTL = 2000;

	interface Props {
		results: Readable<StreamedQuery>;
	}
	let { results }: Props = $props();

	let viewType: 'graph' | 'table' | 'ttl' = $state('table');

	let quads = $derived($results.results as Quad[]);
	let overMaximumGraph = $derived($results.results.length > MAX_DISPLAY_GRAPH);
	let overMaximumTTL = $derived($results.results.length > MAX_DISPLAY_TTL);

	// We don't want the user entering graph view while the query is in flight and streaming as this
	// would be very expensive and janky. There are better ways of doing this, but for now I'm just
	// disabling the button until the query is settled.
	let inFlight = $derived(
		$results.status == QueryStatus.Initialized || $results.status == QueryStatus.Fetching
	);
</script>

{#if quads.length}
	<div class="mt-6">
		<Button
			label="Table View"
			disabled={viewType == 'table'}
			variant="secondary"
			onclick={() => (viewType = 'table')}
		>
			{#snippet icon()}<Table />{/snippet}
		</Button>

		<Button
			label="Graph View"
			variant="secondary"
			disabled={viewType == 'graph' || inFlight}
			onclick={() => (viewType = 'graph')}
		>
			{#snippet icon()}<Graph />{/snippet}
		</Button>

		<Button
			label="TTL View"
			variant="secondary"
			disabled={viewType == 'ttl'}
			onclick={() => (viewType = 'ttl')}
		>
			{#snippet icon()}<Turtle />{/snippet}
		</Button>
	</div>

	{#if viewType == 'table'}
		<QuadsTable {quads} />
	{:else if viewType == 'graph'}
		{#if overMaximumGraph}
			<Alert
				dismissible
				variant="warning"
				heading="Results Truncated"
				message={`Too many results, only the first ${MAX_DISPLAY_GRAPH} results are rendered in this graph.`}
			/>
		{/if}
		<QuadsGraph quads={quads.slice(0, MAX_DISPLAY_GRAPH)} />
	{:else if viewType == 'ttl'}
		{#if overMaximumTTL}
			<Alert
				dismissible
				variant="warning"
				heading="Results Truncated"
				message={`Too many results, only the first ${MAX_DISPLAY_TTL} triples are included in this document.`}
			/>
		{/if}
		<QuadsTurtle quads={quads.slice(0, MAX_DISPLAY_TTL)} />
	{/if}
{/if}
