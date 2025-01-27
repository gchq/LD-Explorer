<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { Tab, TabNavigation, TabPanel } from '$lib/components';
	import { CatalogList } from '$lib/components/views/sources';
	import { PageView } from '$lib/components/views';
	import sourcesCatalog from '$lib/data/sources-catalog.json';
</script>

<PageView
	heading="Remote Data Source Catalog"
	subheading="A catalog of existing remote data sources. Add these to your active sources in order to start querying."
>
	<TabNavigation>
		<Tab title="Open Source" disabled={sourcesCatalog.external.length == 0} />
		<Tab title="Internal/Demo" disabled={sourcesCatalog.internal.length == 0} />
		{#snippet panels()}
			<TabPanel>
				<CatalogList catalogEntries={sourcesCatalog.external} />
			</TabPanel>
			<TabPanel>
				<CatalogList catalogEntries={sourcesCatalog.internal} />
			</TabPanel>
		{/snippet}
	</TabNavigation>
</PageView>
