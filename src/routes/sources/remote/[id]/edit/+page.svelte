<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { type RemoteSource, sources } from '$stores/sources/remote-sources.store';
	import type { PageData } from './$types';
	import { PageView } from '$lib/components/views';
	import { RemoteSourceForm } from '$lib/components/views/forms';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();
	let source = $state({ ...data.source });

	// Events
	function handleSubmit(source: RemoteSource) {
		sources.updateSource({ ...source, enabled: true });
		goto(`${base}/sources`);
	}
</script>

<PageView heading="Edit remote source" subheading="Add a new remote data source.">
	<RemoteSourceForm onSubmit={handleSubmit} bind:source />
</PageView>
