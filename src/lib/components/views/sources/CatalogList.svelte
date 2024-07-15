<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import {
		Button,
		Link,
		Paragraph as P,
		Table,
		TableBody,
		TableData,
		TableHead,
		TableHeading,
		TableRow
	} from '$lib/components';
	import { sources } from '$stores/sources/remote-sources.store';

	interface CatalogEntry {
		name: string;
		description: string;
		url: string;
	}

	// Props
	export let catalogEntries: CatalogEntry[];

	// State
	$: sourceUrls = $sources.map((s) => s.url);

	// Events
	function handleClick({ name, description, url }: CatalogEntry) {
		sources.addSource({
			id: url,
			type: 'REMOTE',
			name,
			description,
			url,
			enabled: true,
			fromCatalog: true
		});
	}
</script>

<Table>
	<TableHead>
		<TableHeading value="Name" />
		<TableHeading value="Description" />
		<TableHeading value="Actions" alignment="right" />
	</TableHead>
	<TableBody>
		{#each catalogEntries as { url, name, description }}
			<TableRow>
				<TableData><span class="font-bold">{name}</span></TableData>
				<TableData>
					<P>{description}</P>
					<P>
						<Link href={url} external>
							{url}
						</Link>
					</P>
				</TableData>
				<TableData>
					<div class="float-right">
						<Button
							label="Add"
							size="small"
							variant="primary"
							disabled={sourceUrls.includes(url)}
							ariaLabel={`Add ${name} to active data sources`}
							on:click={() => handleClick({ url, name, description })}
						/>
					</div>
				</TableData>
			</TableRow>
		{/each}
	</TableBody>
</Table>
