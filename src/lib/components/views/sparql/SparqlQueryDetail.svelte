<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { Paragraph as P } from '$lib/components';
	import SparqlPersistResults from './SparqlPersistQuadResults.svelte';
	import SparqlQueryCodeBlock from './SparqlQueryCodeBlock.svelte';
	import SparqlQueryStatus from './SparqlQueryStatus.svelte';
	import type { StreamedQueryStore } from '$stores/streamedQuery.store';

	interface Props {
		queryStore: StreamedQueryStore;
		allowPersist?: boolean;
		codeComment?: string;
	}

	let { allowPersist = true, codeComment, queryStore }: Props = $props();
	let pluralize = $derived($queryStore.results.length > 1 || $queryStore.results.length == 0);
</script>

<SparqlQueryStatus status={$queryStore.status} onStop={queryStore.stop} />
<SparqlQueryCodeBlock query={$queryStore.originalQuery} {codeComment} />
{#if $queryStore.type == 'quads' && allowPersist}
	<SparqlPersistResults queryStore={$queryStore} />
{/if}

{#if $queryStore.type == 'bindings' || $queryStore.type == 'quads'}
	<P>
		Found {$queryStore.results.length} item{#if pluralize}s{/if}.
	</P>
{/if}
