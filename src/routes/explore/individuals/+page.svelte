<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { PageView, QueryResultsView } from '$lib/components/views';
	import { getIndividuals } from '$lib/querying/queries';
	import { settings } from '$lib/stores/settings.store';

	// Query
	const { createQuery, codeComment } = getIndividuals;
	const query = createQuery($settings.general__defaultLimit);
</script>

<PageView heading="Individuals" subheading="Individuals/instances across all active sources.">
	<QueryResultsView {query} {codeComment} />
</PageView>
