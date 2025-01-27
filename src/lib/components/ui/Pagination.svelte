<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { FilterField } from '$lib/components';
	import type { IcChangeEventDetail } from '@ukic/web-components/dist/types/components/ic-pagination/ic-pagination.types';
	import { browser } from '$app/environment';
	import clsx from 'clsx';

	interface Props {
		pageNumber: number;
		totalPages: number;
		bottom?: boolean;
		itemCount: number;
		filterText?: string;
		includeFilter?: boolean;
	}

	let {
		pageNumber,
		totalPages,
		itemCount,
		bottom = false,
		filterText = '',
		includeFilter = false
	}: Props = $props();

	function handleFilterChange() {
		pageNumber = 0;
	}

	function handlePageChange(e: CustomEvent<IcChangeEventDetail>) {
		pageNumber = e.detail.value - 1;
		if (browser && bottom) {
			document.body.scrollIntoView();
		}
	}
</script>

<div class={clsx('block md:flex justify-between', !bottom && 'md:mt-10', bottom && 'my-8')}>
	{#if includeFilter}
		<div class="md:self-start block sm:inline-block">
			<FilterField
				label="Filter results by text"
				bind:value={filterText}
				onInput={handleFilterChange}
			/>
		</div>

		{#if filterText.length}
			<ic-typography class="inline-block pl-2">
				<span>({itemCount} items after filter)</span>
			</ic-typography>
		{/if}
	{/if}

	<ic-pagination
		class="w-fit self-end"
		pages={totalPages}
		disabled={totalPages < 1}
		current-page={pageNumber + 1}
		onicPageChange={handlePageChange}
	></ic-pagination>
</div>
