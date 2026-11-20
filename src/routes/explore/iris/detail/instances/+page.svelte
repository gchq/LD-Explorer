<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { Alert, SparqlQueryDetail, Switch } from '#lib/components/index.ts';
	import createTabDetail, { TabIndices } from '#lib/navigation/tabs/IRIDetailNavigation.ts';
	import { BindingsView } from '#lib/components/views/index.ts';
	import type { PageData } from './$types';
	import { TabbedPageView } from '#lib/components/views/index.ts';
	import { createQueryStore } from '#lib/stores/streamedQuery.store.ts';
	import { getClassInstances } from '#lib/querying/queries/index.ts';
	import { settings } from '#lib/stores/settings.store.ts';
	import { sourceList } from '#lib/stores/sources/sources.store.ts';

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();
	let iri = $derived(data.iri);

	// Local UI state
	let includeSubclasses = $state(false);

	// Query
	const { createQuery, codeComment } = getClassInstances;
	let instances = $derived(
		createQueryStore(
			createQuery(
				iri,
				$settings.general__defaultLimit,
				$settings.graph__queryForNamedGraphs,
				includeSubclasses
			),
			$sourceList
		)
	);
</script>

<TabbedPageView {...createTabDetail(iri)} selectedTabIndex={TabIndices.Instances}>
	<SparqlQueryDetail queryStore={instances} {codeComment} />
	<Switch
		label="Include subclass instances"
		helperText="Also show individuals whose type is a subclass (at any depth) of this class."
		bind:checked={includeSubclasses}
		onchange={() => {}}
	/>
	{#if $instances.results.length}
		<BindingsView results={instances} />
	{:else}
		<Alert
			heading="No instances"
			message={includeSubclasses
				? 'No instances were found of this resource or any of its subclasses.'
				: 'No instances were found of this resource.'}
		/>
	{/if}
</TabbedPageView>
