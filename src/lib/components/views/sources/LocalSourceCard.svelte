<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { Button, ButtonLink } from '$lib/components';
	import { type LocalSource, sources as localSources } from '$stores/sources/local-sources.store';
	import { Import } from '$lib/components/ui/icons';
	import type { Store as N3Store } from 'n3';
	import SourceCard from './SourceCard.svelte';

	// Props
	export let source: LocalSource;

	// State
	$: ({ enabled, description, id } = source);
	let store: N3Store = source.n3Store as N3Store;
</script>

<SourceCard {source}>
	<div slot="message">
		<ic-typography>{description}</ic-typography>
		<div class="mt-2">
			<ic-typography class="bg-gray-100 inline px-2 py-1" variant="caption"> Local </ic-typography>
			<ic-typography class="bg-gray-100 inline px-2 py-1" variant="caption">
				Triples: {store.size}
			</ic-typography>
		</div>
	</div>

	<div slot="interaction-controls" class="flex flex-wrap gap-1">
		<ButtonLink label="Show" href={`/sources/${id}`} ariaLabel={`Show source ${source.name}`} />
		<ButtonLink
			label="Edit"
			href={`/sources/local/${id}/edit`}
			ariaLabel={`Edit source ${source.name}`}
		/>

		<ButtonLink
			label="Import data"
			href={`/sources/local/${id}/import`}
			ariaLabel={`Import data into source ${source.name}`}
		>
			<i slot="icon">
				<Import />
			</i>
		</ButtonLink>
		<Button
			label={enabled ? 'Disable' : 'Enable'}
			ariaLabel={`${enabled ? 'Disable' : 'Enable'} source ${source.name}`}
			variant="secondary"
			on:click={() => localSources.toggleEnabled(id)}
		/>
	</div>
</SourceCard>
