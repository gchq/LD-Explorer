<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { QueryResultsView, TabbedPageView } from '#lib/components/views/index.ts';
	import createTabDetail, { TabIndices } from '#lib/navigation/tabs/ExploreClassesNavigation.ts';
	import { getClasses } from '#lib/querying/queries/index.ts';
	import { settings } from '#lib/stores/settings.store.ts';

	const { createQuery, codeComment } = getClasses;
	const query = createQuery($settings.general__defaultLimit, $settings.graph__queryForNamedGraphs);
</script>

<TabbedPageView {...createTabDetail()} selectedTabIndex={TabIndices.AllClasses}>
	<QueryResultsView {query} {codeComment} />
</TabbedPageView>
