<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { type LocalSource, sources } from '$stores/sources/local-sources.store';
	import { LocalSourceForm } from '$lib/components/views/forms';
	import type { PageData } from './$types';
	import { PageView } from '$lib/components/views';
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';

	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();
	let source = $state({ ...data.source });

	// Events
	function handleSubmit(source: LocalSource) {
		sources.updateSource({ ...source, enabled: true });
		goto(resolve('/sources'));
	}
</script>

<PageView heading="Edit local source" subheading="Add a new local data source.">
	<LocalSourceForm onSubmit={handleSubmit} bind:source />
</PageView>
