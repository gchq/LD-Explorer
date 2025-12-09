<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import type { Bindings } from '@comunica/types';
	import { Term } from '$lib/components';
	import type { Variable } from '@rdfjs/types';

	interface Props {
		variable: string | Variable;
		bindings: Bindings;
		highlightText: string | undefined;
	}

	let { variable, bindings, highlightText }: Props = $props();

	/**
	 * Expressing "no value exists" in RDF can be problematic.
	 *
	 * We should not be introducing "dummy" terms or "empty" terms, because this might
	 * imply the existance of a term in queries when in fact there is none.
	 *
	 * For now, this component displays nothing at all if it cannot retrieve
	 * a value for a particular variable in these bindings.
	 */
	const bindingsValue = $derived(bindings.get(variable));
</script>

{#if bindingsValue}
	<Term term={bindingsValue} {highlightText} />
{/if}
