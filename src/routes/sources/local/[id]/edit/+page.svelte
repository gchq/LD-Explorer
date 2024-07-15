<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { type LocalSource, sources } from '$stores/sources/local-sources.store';
	import { LocalSourceForm } from '$lib/components/views/forms';
	import type { PageData } from './$types';
	import { PageView } from '$lib/components/views';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';

	// Props
	export let data: PageData;
	let source = { ...data.source };

	// Events
	function handleSubmit(source: LocalSource) {
		sources.updateSource({ ...source, enabled: true });
		goto(`${base}/sources`);
	}
</script>

<PageView heading="Edit local source" subheading="Add a new local data source.">
	<LocalSourceForm {handleSubmit} bind:source />
</PageView>
