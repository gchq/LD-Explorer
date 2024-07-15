<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { QueryResultsView, TabbedPageView } from '$lib/components/views';
	import createTabDetail, { TabIndices } from '$lib/navigation/tabs/ExploreMetadataNavigation';
	import { getDomains } from '$lib/querying/queries';
	import { settings } from '$lib/stores/settings.store';

	// Props
	const { createQuery, codeComment } = getDomains;
	$: query = createQuery($settings.general__defaultLimit);
</script>

<TabbedPageView {...createTabDetail()} selectedTabIndex={TabIndices.Domains}>
	<QueryResultsView {query} {codeComment} />
</TabbedPageView>
