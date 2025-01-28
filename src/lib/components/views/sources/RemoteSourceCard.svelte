<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { Button, ButtonLink, Link } from '$lib/components';
	import {
		type RemoteSource,
		sources as remoteSources
	} from '$stores/sources/remote-sources.store';
	import SourceCard from './SourceCard.svelte';

	interface Props {
		source: RemoteSource;
	}
	let { source }: Props = $props();

	let { url, enabled, description, id, fromCatalog } = $derived(source);
</script>

<SourceCard {source}>
	{#snippet message()}
		<div>
			<ic-typography>{description}</ic-typography>
			{#if url}
				<Link href={url.toString()} external>
					{url}
				</Link>
			{/if}
			<div class="mt-2">
				<ic-typography class="bg-gray-100 inline px-2 py-1" variant="caption">
					Remote
				</ic-typography>
				{#if fromCatalog}
					<ic-typography class="bg-gray-100 inline px-2 py-1" variant="caption">
						From Catalog
					</ic-typography>
				{/if}
			</div>
		</div>
	{/snippet}

	{#snippet interactionControls()}
		<div class="flex flex-wrap gap-1">
			<ButtonLink label="Show" href={`/sources/${id}`} ariaLabel={`Show source ${source.name}`} />
			<ButtonLink
				label="Edit"
				href={`/sources/remote/${id}/edit`}
				ariaLabel={`Edit source ${source.name}`}
			/>

			<Button
				label={enabled ? 'Disable' : 'Enable'}
				ariaLabel={`${enabled ? 'Disable' : 'Enable'} source ${source.name}`}
				variant="secondary"
				onclick={() => remoteSources.toggleEnabled(id)}
			/>
		</div>
	{/snippet}
</SourceCard>
