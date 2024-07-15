<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { PageView, QueryResultsView } from '$lib/components/views';
	import { getNamedGraphs } from '$lib/querying/queries';
	import { settings } from '$lib/stores/settings.store';

	const { createQuery, codeComment } = getNamedGraphs;
	$: query = createQuery($settings.general__defaultLimit);
</script>

<PageView heading="Named Graphs" subheading="IRIs for any named graphs within the data sources.">
	<QueryResultsView {query} {codeComment} />
</PageView>
