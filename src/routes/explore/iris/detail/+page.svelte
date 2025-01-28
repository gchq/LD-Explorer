<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { Alert, SparqlQueryDetail } from '$lib/components';
	import createTabDetail, { TabIndices } from '$lib/navigation/tabs/IRIDetailNavigation';
	import { IRIView } from '$lib/components/views';
	import type { PageData } from './$types';
	import { TabbedPageView } from '$lib/components/views';
	import { createQueryStore } from '$stores/streamedQuery.store';
	import { describeResource } from '$lib/querying/queries';
	import { sourceList } from '$stores/sources/sources.store';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	let iri = data.iri;

	// Query
	const { createQuery } = describeResource;
	let description = createQueryStore(createQuery(iri), $sourceList);
</script>

<TabbedPageView {...createTabDetail(iri)} selectedTabIndex={TabIndices.DESCRIBE}>
	<SparqlQueryDetail queryStore={description} />
	{#if $description.results.length}
		<IRIView results={description} />
	{:else}
		<Alert
			heading="No additional detail"
			message="DESCRIBE query yielded no additional information for this resource."
		/>
	{/if}
</TabbedPageView>
