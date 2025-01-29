<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { PageView, QueryResultsView } from '$lib/components/views';
	import { getProperties } from '$lib/querying/queries';
	import { settings } from '$lib/stores/settings.store';

	const { createQuery, codeComment } = getProperties;
	const query = createQuery($settings.general__defaultLimit);
</script>

<PageView heading="Properties" subheading="Property resources for all active sources.">
	<QueryResultsView {query} {codeComment} />
</PageView>
