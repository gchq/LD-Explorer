<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { QueryResultsView, TabbedPageView } from '$lib/components/views';
	import createTabDetail, { TabIndices } from '$lib/navigation/tabs/ExploreMetadataNavigation';
	import { getLabels } from '$lib/querying/queries';
	import { settings } from '$lib/stores/settings.store';

	// Props
	const { createQuery, codeComment } = getLabels;
	const query = createQuery($settings.general__defaultLimit);
</script>

<TabbedPageView {...createTabDetail()} selectedTabIndex={TabIndices.Labels}>
	<QueryResultsView {query} {codeComment} />
</TabbedPageView>
