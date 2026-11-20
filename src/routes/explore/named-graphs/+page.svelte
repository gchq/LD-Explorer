<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { PageView, QueryResultsView } from '#lib/components/views/index.ts';
	import { getNamedGraphs } from '#lib/querying/queries/index.ts';
	import { settings } from '#lib/stores/settings.store.ts';

	const { createQuery, codeComment } = getNamedGraphs;
	const query = createQuery($settings.general__defaultLimit);
</script>

<PageView heading="Named Graphs" subheading="IRIs for any named graphs within the data sources.">
	<QueryResultsView {query} {codeComment} />
</PageView>
