<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { PageView, QueryResultsView } from '#lib/components/views/index.ts';
	import { getProperties } from '#lib/querying/queries/index.ts';
	import { settings } from '#lib/stores/settings.store.ts';

	const { createQuery, codeComment } = getProperties;
	const query = createQuery($settings.general__defaultLimit, $settings.graph__queryForNamedGraphs);
</script>

<PageView heading="Properties" subheading="Property resources for all active sources.">
	<QueryResultsView {query} {codeComment} />
</PageView>
