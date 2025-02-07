<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import type { Term as ITerm } from '@rdfjs/types';
	import { Term } from '$lib/components';
	import { settings } from '$lib/stores/settings.store';

	interface Props {
		term: ITerm;
		showGraph?: boolean;
	}

	let { term, showGraph = !!$settings.general__showQuads }: Props = $props();
</script>

<span>
	{#if term.termType == 'Quad'}
		<dl class="border p-2">
			<dt class="sr-only">Subject</dt>
			<dd><Term term={term.subject} /></dd>
			<dt class="sr-only">Predicate</dt>
			<dd><Term term={term.predicate} /></dd>
			<dt class="sr-only">Object</dt>
			<dd><Term term={term.object} /></dd>
			{#if showGraph}
				<dt class="sr-only">Graph</dt>
				<dd><Term term={term.graph} /></dd>
			{/if}
		</dl>
	{:else}
		#ERROR
	{/if}
</span>
