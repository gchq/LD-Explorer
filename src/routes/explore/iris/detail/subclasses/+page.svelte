<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { Alert, SparqlQueryDetail } from '$lib/components';
	import { NamedNode, type Quad } from 'n3';
	import createTabDetail, { TabIndices } from '$lib/navigation/tabs/IRIDetailNavigation';
	import { ClassHeirachyView } from '$lib/components/views';
	import type { PageData } from './$types';
	import { TabbedPageView } from '$lib/components/views';
	import { createQueryStore } from '$stores/streamedQuery.store';
	import { getSubclasses } from '$lib/querying/queries';
	import { settings } from '$lib/stores/settings.store';
	import { sourceList } from '$stores/sources/sources.store';

	// Props
	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();
	let iri = data.iri;
	let iriTerm = new NamedNode(iri);

	// Query
	const { createQuery, codeComment } = getSubclasses;
	let subclasses = $derived(
		createQueryStore(createQuery(iri, $settings.general__defaultLimit), $sourceList)
	);
	let quads = $derived($subclasses.results as Quad[]);
</script>

<TabbedPageView {...createTabDetail(iri)} selectedTabIndex={TabIndices.Subclasses}>
	<SparqlQueryDetail queryStore={subclasses} {codeComment} />
	{#if $subclasses.results.length}
		<ClassHeirachyView root={iriTerm} {quads} />
	{:else}
		<Alert heading="No subclasses" message="No subclasses were found of this resource." />
	{/if}
</TabbedPageView>
