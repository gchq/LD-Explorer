<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { Button, ButtonLink } from '$lib/components';
	import { type LocalSource, sources as localSources } from '$stores/sources/local-sources.store';
	import { Import } from '$lib/components/ui/icons';
	import type { Store as N3Store } from 'n3';
	import SourceCard from './SourceCard.svelte';

	interface Props {
		source: LocalSource;
	}
	let { source }: Props = $props();
	let { enabled, description, id } = $derived(source);
	let store: N3Store = source.n3Store as N3Store;
</script>

<SourceCard {source}>
	{#snippet message()}
		<div>
			<ic-typography>{description}</ic-typography>
			<div class="mt-2">
				<ic-typography class="bg-gray-100 dark:bg-gray-700 inline px-2 py-1" variant="caption">
					Local
				</ic-typography>
				<ic-typography class="bg-gray-100 dark:bg-gray-700 inline px-2 py-1" variant="caption">
					Triples: {store.size}
				</ic-typography>
			</div>
		</div>
	{/snippet}

	{#snippet interactionControls()}
		<div class="flex flex-wrap gap-1">
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
				{#snippet icon()}
					<Import />
				{/snippet}
			</ButtonLink>
			<Button
				label={enabled ? 'Disable' : 'Enable'}
				ariaLabel={`${enabled ? 'Disable' : 'Enable'} source ${source.name}`}
				variant="secondary"
				onclick={() => localSources.toggleEnabled(id)}
			/>
		</div>
	{/snippet}
</SourceCard>
