<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { resolve } from '$app/paths';
	import { Alert, Button, ButtonLink, Link } from '$lib/components';
	import { LocalSourceCard, RemoteSourceCard } from '$lib/components';
	import { PageView } from '$lib/components/views';
	import { sources as localSources, type LocalSource } from '$stores/sources/local-sources.store';
	import {
		sources as remoteSources,
		type RemoteSource
	} from '$stores/sources/remote-sources.store';

	let allSources = $derived(
		[...$remoteSources, ...$localSources].sort((a, b) => (a.name < b.name ? -1 : 1))
	);
	let sourcesExist = $derived(allSources.length > 0);

	function toggleAll(enabled: boolean) {
		localSources.toggleAll(enabled);
		remoteSources.toggleAll(enabled);
	}

	function removeAll() {
		localSources.removeAll();
		remoteSources.removeAll();
	}
</script>

<PageView heading="Data Sources" subheading="Linked data sources.">
	<div class="mb-4 flex flex-wrap gap-1">
		<ButtonLink label="Add Remote Source" href={resolve('/sources/remote/add')} />
		<ButtonLink label="Add Local Source" href={resolve('/sources/local/add')} />

		<Button
			label="Enable all sources"
			variant="secondary"
			disabled={!sourcesExist}
			onclick={() => toggleAll(true)}
		/>

		<Button
			label="Disable all sources"
			disabled={!sourcesExist}
			onclick={() => toggleAll(false)}
			variant="secondary"
		/>

		<Button
			label="Remove all sources"
			disabled={!sourcesExist}
			onclick={removeAll}
			variant="destructive"
		/>
	</div>

	{#if sourcesExist}
		{#each allSources as source, index (index)}
			{#if source.type === 'REMOTE'}
				<RemoteSourceCard source={allSources[index] as RemoteSource} />
			{:else}
				<LocalSourceCard source={allSources[index] as LocalSource} />
			{/if}
		{/each}
	{:else}
		<Alert
			variant="warning"
			heading="No sources configured"
			message="You currently have no data sources configured."
		/>

		<ic-typography class="mt-4"
			>Add sources manually using the controls on this page or use the <Link
				href="/sources/catalog"
			>
				data sources catalog
			</Link> to find existing remote sources.</ic-typography
		>
	{/if}
</PageView>
