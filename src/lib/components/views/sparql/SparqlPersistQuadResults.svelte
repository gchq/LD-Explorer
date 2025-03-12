<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { Alert, Button, Section, SummaryDetail } from '$lib/components';
	import type { IcValueEventDetail } from '@ukic/web-components';
	import type { Quad } from '@rdfjs/types';
	import { QueryStatus } from '$lib/types';
	import type { StreamedQuery } from '$stores/streamedQuery.store';
	import { importQuads } from '$lib/util/source.util';
	import { sources } from '$stores/sources/local-sources.store';

	// Props

	interface Props {
		queryStore: StreamedQuery;
	}
	let { queryStore }: Props = $props();

	// State
	let selectedSourceId = $state('');
	let persisted = $state(false);

	let selectedSource = $derived($sources.find((s) => s.id == selectedSourceId));
	let quads = $derived(queryStore.results as Quad[]);
	let disabled = $derived(
		persisted || (queryStore.status != QueryStatus.Done && queryStore.status != QueryStatus.Halted)
	);
	let options = $derived($sources.map((source) => ({ label: source.name, value: source.id })));

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
				onicChange={handleSourceChange}
			></ic-select>

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
