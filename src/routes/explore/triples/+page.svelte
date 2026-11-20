<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { PageView, QueryResultsView } from '#lib/components/views/index.ts';
	import { getTriples } from '#lib/querying/queries/index.ts';
	import { settings } from '#lib/stores/settings.store.ts';

	const { createQuery, codeComment } = getTriples;
	const query = createQuery($settings.general__defaultLimit, $settings.graph__queryForNamedGraphs);
</script>

<PageView heading="Triples" subheading="Raw triples across all active sources.">
	<QueryResultsView {query} {codeComment} />
</PageView>
