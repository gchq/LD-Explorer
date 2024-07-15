<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { QueryResultsView, TabbedPageView } from '$lib/components/views';
	import createTabDetail, { TabIndices } from '$lib/navigation/tabs/ExploreClassesNavigation';
	import { getBaseClasses } from '$lib/querying/queries';
	import { settings } from '$lib/stores/settings.store';

	const { createQuery, codeComment } = getBaseClasses;
	$: query = createQuery($settings.general__defaultLimit);
</script>

<TabbedPageView {...createTabDetail()} selectedTabIndex={TabIndices.BaseClasses}>
	<QueryResultsView {query} {codeComment} />
</TabbedPageView>
