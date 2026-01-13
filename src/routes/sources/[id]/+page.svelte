<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { resolve } from '$app/paths';
	import {
		ButtonLink,
		Heading,
		Link,
		Paragraph as P,
		SparqlQueryDetail,
		Tab,
		TabNavigation,
		TabPanel
	} from '$lib/components';
	import type { QuerySourceUnidentified } from '@comunica/types';
	import { Import } from '$lib/components/ui/icons';
	import type { Store as N3Store } from 'n3';
	import type { PageData } from './$types';
	import { PageView } from '$lib/components/views';
	import { QuadsView } from '$lib/components/views';
	import { createQueryStore } from '$stores/streamedQuery.store';
	import { getTriples } from '$lib/querying/queries';
	import { settings } from '$lib/stores/settings.store';

	// Props
	interface Props {
		data: PageData;
	}
	let { data }: Props = $props();
	let source = $derived({ ...data.source });

	// Local sources will have an n3 store, remote sources have a URL. This logic will become
	// more complicated if there are ever any other types of source in play but this'll do for now.
	let dataSource: QuerySourceUnidentified = $derived(
		source.type == 'LOCAL' ? (source.n3Store as N3Store) : source.url
	);

	const { createQuery, codeComment } = getTriples;
	const queryStore = $derived(
		createQueryStore(createQuery($settings.general__defaultLimit), [dataSource])
	);
	let editUrl = $derived(
		resolve(`/sources/${source.type == 'LOCAL' ? 'local' : 'remote'}/${source.id}/edit`)
	);
</script>

<PageView
	heading={`${source.type} Data Source: ${source.name}`}
	subheading={`Details for the ${source.type} data source '${source.name}'.`}
>
	<TabNavigation>
		<Tab title="Detail" />
		<Tab title="Sample Data" />
		{#snippet panels()}
			<TabPanel>
				<ic-data-list heading="Source Detail">
					<ic-data-row label="ID" value={source.id}></ic-data-row>
					<ic-data-row label="Name" value={source.name}></ic-data-row>
					<ic-data-row
						label="Description"
						value={source.description.length ? source.description : 'N/A'}
					></ic-data-row>
					<ic-data-row label="Enabled">
						<ic-status-tag
							slot="value"
							size="small"
							label={source.enabled ? 'Enabled' : 'Disabled'}
							status={source.enabled ? 'success' : 'warning'}
						></ic-status-tag>
					</ic-data-row>

					{#if source.type == 'REMOTE'}
						<ic-data-row label="URL" value={source.url}></ic-data-row>
					{/if}
				</ic-data-list>

				<div class="mt-4">
					<ButtonLink label="Edit" href={editUrl} />
					{#if source.type == 'LOCAL'}
						<ButtonLink label="Import data" href={resolve(`/sources/local/${source.id}/import`)}>
							{#snippet icon()}
								<Import />
							{/snippet}
						</ButtonLink>
					{/if}
				</div>
				<Link htmlClass="block mt-2" href="/sources">Back to Sources</Link>
			</TabPanel>
			<TabPanel>
				<Heading text="Sample Data" tag="h3" />
				<P
					>Querying for first {$settings.general__defaultLimit} triples from the data source
					<strong>{source.name}</strong>.</P
				>
				<SparqlQueryDetail {queryStore} allowPersist={false} {codeComment} />
				<QuadsView results={queryStore} />
			</TabPanel>
		{/snippet}
	</TabNavigation>
</PageView>
