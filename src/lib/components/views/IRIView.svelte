<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import {
		Alert,
		List,
		ListItem,
		Table,
		TableBody,
		TableData,
		TableHead,
		TableHeading,
		TableRow,
		Term as TermComponent
	} from '$lib/components';

	import type { Term, Quad } from '@rdfjs/types';
	import { NamedNode } from 'n3';
	import type { Readable } from 'svelte/store';
	import type { StreamedQuery } from '$stores/streamedQuery.store';

	// Workaround to stop client from crashing if this IRI is the subject for a very
	// large number of triples. Should this become an issue, we can add in pagination or
	// the like later.
	const MAX_DISPLAY = 500;

	// Props
	interface Props {
		results: Readable<StreamedQuery>;
	}
	let { results }: Props = $props();

	// State
	let quads = $derived($results.results.slice(0, MAX_DISPLAY) as Quad[]);
	let overMaximum = $derived($results.results.length > MAX_DISPLAY);
	let uniquePredicateIRIs = $derived(new Set<string>(quads.map((q) => q.predicate.value)));

	// TODO: This is probably a useful function for elsewhere too - should not live here. Also, possibly
	// may one day want to make this an "optional" thing - when federating data, you might find
	// duplicate data in duplicate graphs and the user may want to see this. It's confusing to see duplicates right now
	// because we are hiding the "graph" part of the quad but if we ever bring that in, this function will
	// hide the fact that the same value appeared in multiple graphs.
	function uniqueTerms(terms: Term[]): Term[] {
		return [...new Map(terms.map((term) => [term.value, term])).values()];
	}
</script>

{#if overMaximum}
	<Alert
		dismissible
		variant="warning"
		heading="Results Truncated"
		message={`Too many results, only the first ${MAX_DISPLAY} results are shown.`}
	/>
{/if}

{#if quads.length}
	<Table>
		<TableHead>
			<TableHeading value="Property" />
			<TableHeading value="Value(s)" />
		</TableHead>
		<TableBody>
			{#each Array.from(uniquePredicateIRIs) as iri, idx (idx)}
				<TableRow>
					<TableData><TermComponent term={new NamedNode(iri)} applyVerticalMargins /></TableData>
					<TableData>
						<List listType="no-symbol">
							{#each uniqueTerms(quads
									.filter((q) => q.predicate.value == iri)
									.map((q) => q.object)) as object (object.value)}
								<ListItem>
									<TermComponent term={object} />
								</ListItem>
							{/each}
						</List>
					</TableData>
				</TableRow>
			{/each}
		</TableBody>
	</Table>
{/if}
