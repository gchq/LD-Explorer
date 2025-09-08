<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { Heading, List, ListItem, Paragraph as P, Term } from '$lib/components';
	import { IRISearchForm } from '$lib/components/views/forms';
	import { NamedNode } from 'n3';
	import { PageView } from '$lib/components/views';
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';

	function handleSubmit(iri: string) {
		if (iri && iri.length) {
			// eslint-disable-next-line svelte/no-navigation-without-resolve
			goto(`${resolve('/explore/iris/detail')}?$iri=${encodeURIComponent(iri)}`);
		}
	}

	// If this list gets any bigger, consider moving it to its own file somewhere.
	const popularIris: NamedNode[] = [
		'http://www.w3.org/2000/01/rdf-schema#Class',
		'http://www.w3.org/2000/01/rdf-schema#comment',
		'http://www.w3.org/2002/07/owl#Class'
	].map((iri) => new NamedNode(iri));
</script>

<PageView
	heading="IRI Search"
	subheading="Search for a specific Internationalized Resource Identifier (IRI) within the active sources."
>
	<IRISearchForm onSubmit={handleSubmit} />

	<Heading text="Common IRIs" variant="h3" />
	<P
		>The following is a list of popular IRIs often found in datasets. If present, these can make for
		a good jumping-off point to start exploring your active datasets.</P
	>
	<List listType="ul">
		{#each popularIris as iri (iri.id)}
			<ListItem>
				<Term term={iri} />
			</ListItem>
		{/each}
	</List>
</PageView>
