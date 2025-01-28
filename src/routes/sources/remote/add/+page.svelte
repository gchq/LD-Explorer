<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { type RemoteSource, sources } from '$stores/sources/remote-sources.store';
	import { PageView } from '$lib/components/views';
	import { RemoteSourceForm } from '$lib/components/views/forms';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';

	function handleSubmit(source: RemoteSource) {
		sources.addSource({ ...source, enabled: true });
		goto(`${base}/sources`);
	}
</script>

<PageView heading="Add remote source" subheading="Add a new remote data source.">
	<RemoteSourceForm onSubmit={handleSubmit} />
</PageView>
