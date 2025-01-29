<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { QueryResultsView, TabbedPageView } from '$lib/components/views';
	import createTabDetail, { TabIndices } from '$lib/navigation/tabs/ExploreClassesNavigation';
	import { getClasses } from '$lib/querying/queries';
	import { settings } from '$lib/stores/settings.store';

	const { createQuery, codeComment } = getClasses;
	const query = createQuery($settings.general__defaultLimit);
</script>

<TabbedPageView {...createTabDetail()} selectedTabIndex={TabIndices.AllClasses}>
	<QueryResultsView {query} {codeComment} />
</TabbedPageView>
