<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { getItemsForPage, getTotalPages } from '$lib/util/pagination.utils';
	import type { Bindings } from '@comunica/types';
	import BindingsViewTable from './BindingsViewTable.svelte';
	import { Pagination } from '$lib/components';
	import type { Readable } from 'svelte/store';
	import type { StreamedQuery } from '$stores/streamedQuery.store';
	import { filterBindings } from '$lib/util/filter.utils';

	// Props
	interface Props {
		results: Readable<StreamedQuery>;
	}

	let { results }: Props = $props();

	// State
	let bindings = $derived($results.results as Bindings[]);

	// Pagination + Filtering
	let pageNumber = $state(0);
	let filterText = $state('');

	const PER_PAGE = 100;
	let filteredBindings = $derived(filterBindings(bindings, filterText));
	let totalPages = $derived(getTotalPages(PER_PAGE, filteredBindings));
	let bindingsForPage = $derived(getItemsForPage(pageNumber, PER_PAGE, filteredBindings));
</script>

{#if bindings.length}
	<Pagination
		includeFilter
		bind:pageNumber
		bind:filterText
		{totalPages}
		itemCount={filteredBindings.length}
	/>

	{#if filteredBindings.length}
		<BindingsViewTable
			bindingsCollection={bindingsForPage}
			variables={Array.from($results.variables)}
			highlightText={filterText}
		/>

		<Pagination
			bottom
			bind:pageNumber
			bind:filterText
			{totalPages}
			itemCount={filteredBindings.length}
		/>
	{/if}
{/if}
