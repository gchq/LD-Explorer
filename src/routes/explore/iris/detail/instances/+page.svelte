<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { Alert, SparqlQueryDetail } from '$lib/components';
	import createTabDetail, { TabIndices } from '$lib/navigation/tabs/IRIDetailNavigation';
	import { BindingsView } from '$lib/components/views';
	import type { PageData } from './$types';
	import { TabbedPageView } from '$lib/components/views';
	import { createQueryStore } from '$stores/streamedQuery.store';
	import { getClassInstances } from '$lib/querying/queries';
	import { settings } from '$lib/stores/settings.store';
	import { sourceList } from '$stores/sources/sources.store';

	// Props
	export let data: PageData;

	// State
	$: iri = data.iri;

	// Query
	const { createQuery, codeComment } = getClassInstances;
	$: instances = createQueryStore(createQuery(iri, $settings.general__defaultLimit), $sourceList);
</script>

<TabbedPageView {...createTabDetail(iri)} selectedTabIndex={TabIndices.Instances}>
	<SparqlQueryDetail queryStore={instances} {codeComment} />
	{#if $instances.results.length}
		<BindingsView results={instances} />
	{:else}
		<Alert heading="No instances" message="No instances were found of this resource." />
	{/if}
</TabbedPageView>
