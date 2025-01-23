<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { Alert, Button, Section, SummaryDetail } from '$lib/components';
	import type { IcValueEventDetail } from '@ukic/web-components';
	import type { Quad } from 'n3';
	import { QueryStatus } from '$lib/types';
	import type { StreamedQuery } from '$stores/streamedQuery.store';
	import { importQuads } from '$lib/util/source.util';
	import { sources } from '$stores/sources/local-sources.store';

	// Props
	export let queryStore: StreamedQuery;

	// State
	let selectedSourceId = '';
	$: selectedSource = $sources.find((s) => s.id == selectedSourceId);
	$: quads = queryStore.results as Quad[];
	$: disabled =
		persisted || (queryStore.status != QueryStatus.Done && queryStore.status != QueryStatus.Halted);
	let options = $sources.map((source) => ({ label: source.name, value: source.id }));
	let persisted = false;

	// Events
	function handleSourceChange(e: CustomEvent<IcValueEventDetail>) {
		selectedSourceId = e.detail.value;
	}

	function handlePersist() {
		if (selectedSource) {
			importQuads(selectedSource, quads);
			persisted = true;
		}
	}
</script>

{#if $sources.length && quads.length}
	<SummaryDetail summaryText="Persist results to local source" pad={false}>
		<Section>
			<ic-select
				{disabled}
				class="inline-block"
				label="Source name"
				{options}
				placeholder="Select a local data source"
				value={selectedSourceId}
				on:icChange={handleSourceChange}
			/>

			<div class="align-bottom inline">
				<Button label="Persist" {disabled} onclick={handlePersist} />
			</div>

			{#if persisted}
				<Alert
					variant="success"
					heading="Results Persisted"
					message={`Results persisted to local source '${selectedSource?.name}'`}
				/>
			{/if}
		</Section>
	</SummaryDetail>
{/if}
