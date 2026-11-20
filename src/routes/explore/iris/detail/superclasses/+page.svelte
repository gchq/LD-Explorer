<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { Alert, SparqlQueryDetail } from '#lib/components/index.ts';
	import createTabDetail, { TabIndices } from '#lib/navigation/tabs/IRIDetailNavigation.ts';
	import BindingsView from '#lib/components/views/bindingsView/BindingsView.svelte';
	import type { PageData } from './$types';
	import { TabbedPageView } from '#lib/components/views/index.ts';
	import { createQueryStore } from '#lib/stores/streamedQuery.store.ts';
	import { getSuperclasses } from '#lib/querying/queries/index.ts';
	import { settings } from '#lib/stores/settings.store.ts';
	import { sourceList } from '#lib/stores/sources/sources.store.ts';

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();
	let iri = $derived(data.iri);

	// Query
	const { createQuery, codeComment } = getSuperclasses;
	let superClasses = $derived(
		createQueryStore(
			createQuery(iri, $settings.general__defaultLimit, $settings.graph__queryForNamedGraphs),
			$sourceList
		)
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
