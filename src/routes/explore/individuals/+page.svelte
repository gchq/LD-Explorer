<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { PageView, QueryResultsView } from '#lib/components/views/index.ts';
	import { getIndividuals } from '#lib/querying/queries/index.ts';
	import { settings } from '#lib/stores/settings.store.ts';

	// Query
	const { createQuery, codeComment } = getIndividuals;
	const query = createQuery($settings.general__defaultLimit, $settings.graph__queryForNamedGraphs);
</script>

<PageView heading="Individuals" subheading="Individuals/instances across all active sources.">
	<QueryResultsView {query} {codeComment} />
</PageView>
