<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { Alert, SparqlQueryDetail } from '$lib/components';
	import createTabDetail, { TabIndices } from '$lib/navigation/tabs/IRIDetailNavigation';
	import type { PageData } from './$types';
	import { QuadsView } from '$lib/components/views';
	import { TabbedPageView } from '$lib/components/views';
	import { createQueryStore } from '$stores/streamedQuery.store';
	import { getAppearances } from '$lib/querying/queries';
	import { settings } from '$lib/stores/settings.store';
	import { sourceList } from '$stores/sources/sources.store';

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();
	let iri = data.iri;

	// Query
	const { createQuery, codeComment } = getAppearances;
	let instances = createQueryStore(createQuery(iri, $settings.general__defaultLimit), $sourceList);
</script>

<TabbedPageView {...createTabDetail(iri)} selectedTabIndex={TabIndices.Appearances}>
	<SparqlQueryDetail queryStore={instances} {codeComment} />
	{#if $instances.results.length}
		<QuadsView results={instances} />
	{:else}
		<Alert heading="No appearances" message="This IRI does not appear in any triples." />
	{/if}
</TabbedPageView>
