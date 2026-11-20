<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { QueryResultsView, TabbedPageView } from '#lib/components/views/index.ts';
	import createTabDetail, { TabIndices } from '#lib/navigation/tabs/ExploreMetadataNavigation.ts';
	import { getLabels } from '#lib/querying/queries/index.ts';
	import { settings } from '#lib/stores/settings.store.ts';

	// Props
	const { createQuery, codeComment } = getLabels;
	const query = createQuery(
		$settings.general__defaultLimit,
		undefined,
		$settings.graph__queryForNamedGraphs
	);
</script>

<TabbedPageView {...createTabDetail()} selectedTabIndex={TabIndices.Labels}>
	<QueryResultsView {query} {codeComment} />
</TabbedPageView>
