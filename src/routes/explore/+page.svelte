<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { resolve } from '$app/paths';
	import { Link, List, ListItem, Paragraph as P } from '$lib/components';
	import { PageView } from '$lib/components/views';
</script>

<PageView heading="Explore" subheading="Start exploring the currently active data sources.">
	<P
		>RDF data is self-describing. Use these stock queries to start exploring the data in your
		current active <Link href={resolve('/sources')}>data sources</Link></P
	>
	<List listType="ul">
		<ListItem>
			<Link href={resolve('/explore/classes')}>Classes</Link> can tell you about the <em>types</em> of
			data that exist.
		</ListItem>
		<ListItem>
			<Link href={resolve('/explore/properties')}>Properties</Link> can tell you what kind of descriptive
			information is available within the active data sources.
		</ListItem>
		<ListItem>
			Peruse the <Link href={resolve('/explore/individuals')}>Individuals (instances)</Link> within the
			dataset.
		</ListItem>
		<ListItem>
			Browse and search based on the <Link href={resolve('/explore/metadata')}>metadata</Link> within
			the dataset.
		</ListItem>
		<ListItem>
			Explore the raw data by interrogating <Link href={resolve('/explore/triples')}>Triples</Link> directly.
		</ListItem>
		<ListItem>
			LD Explorer queries within the explore section only query the default graph, however you can
			still see any <Link href={resolve('/explore/named-graphs')}>Named Graphs</Link> within your selected
			data sources.
		</ListItem>
		<ListItem>
			Search for a specific <Link href={resolve('/explore/iris')}>IRI</Link>.
		</ListItem>
	</List>
</PageView>
