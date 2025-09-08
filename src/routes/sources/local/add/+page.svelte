<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { type LocalSource, sources } from '$stores/sources/local-sources.store';
	import { LocalSourceForm } from '$lib/components/views/forms';
	import { PageView } from '$lib/components/views';
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';

	function handleSubmit(source: LocalSource) {
		sources.addSource({ ...source, enabled: true });
		goto(resolve('/sources'));
	}
</script>

<PageView heading="Add local source" subheading="Add a new local data source.">
	<LocalSourceForm onSubmit={handleSubmit} />
</PageView>
