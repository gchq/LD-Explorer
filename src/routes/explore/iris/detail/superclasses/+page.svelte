<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { Alert, SparqlQueryDetail } from '$lib/components';
	import createTabDetail, { TabIndices } from '$lib/navigation/tabs/IRIDetailNavigation';
	import BindingsView from '$lib/components/views/bindingsView/BindingsView.svelte';
	import type { PageData } from './$types';
	import { TabbedPageView } from '$lib/components/views';
	import { createQueryStore } from '$stores/streamedQuery.store';
	import { getSuperclasses } from '$lib/querying/queries';
	import { settings } from '$lib/stores/settings.store';
	import { sourceList } from '$stores/sources/sources.store';

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();
	let iri = data.iri;

	// Query
	const { createQuery, codeComment } = getSuperclasses;
	let superClasses = $derived(
		createQueryStore(createQuery(iri, $settings.general__defaultLimit), $sourceList)
	);
</script>

<TabbedPageView {...createTabDetail(iri)} selectedTabIndex={TabIndices.Superclasses}>
	<SparqlQueryDetail queryStore={superClasses} {codeComment} />

	{#if $superClasses.results.length}
		<BindingsView results={superClasses} />
	{:else}
		<Alert heading="No superclasses" message="No superclasses were found of this resource." />
	{/if}
</TabbedPageView>
