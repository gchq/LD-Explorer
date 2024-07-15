<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import {
		Pagination,
		Table,
		TableBody,
		TableData,
		TableHead,
		TableHeading,
		TableRow,
		Term
	} from '$lib/components';
	import { getItemsForPage, getTotalPages } from '$lib/util/pagination.utils';
	import type { Quad } from 'n3';
	import { filterQuads } from '$lib/util/filter.utils';
	import { settings } from '$lib/stores/settings.store';

	// Props
	export let quads: Quad[];

	// Pagination + Filtering
	let pageNumber = 0;
	$: filterText = '';

	const PER_PAGE = 100;
	$: filteredQuads = filterQuads(quads, filterText);
	$: totalPages = getTotalPages(PER_PAGE, filteredQuads);
	$: quadsForPage = getItemsForPage(pageNumber, PER_PAGE, filteredQuads);

	// Other state
	let showGraph = !!$settings.general__showQuads;
</script>

<Pagination
	includeFilter
	bind:pageNumber
	bind:filterText
	{totalPages}
	itemCount={filteredQuads.length}
/>
{#if filteredQuads.length}
	<Table>
		<TableHead>
			<TableHeading value="Subject" />
			<TableHeading value="Predicate" />
			<TableHeading value="Object" />
			{#if showGraph}
				<TableHeading value="Graph" />
			{/if}
		</TableHead>
		<TableBody>
			{#each quadsForPage as quad (quad)}
				<TableRow>
					<TableData><Term term={quad.subject} highlightText={filterText} /></TableData>
					<TableData><Term term={quad.predicate} highlightText={filterText} /></TableData>
					<TableData><Term term={quad.object} highlightText={filterText} /></TableData>
					{#if showGraph}
						<TableData><Term term={quad.graph} /></TableData>
					{/if}
				</TableRow>
			{/each}
		</TableBody>
	</Table>
	<Pagination
		bottom
		bind:pageNumber
		bind:filterText
		{totalPages}
		itemCount={filteredQuads.length}
	/>
{/if}
