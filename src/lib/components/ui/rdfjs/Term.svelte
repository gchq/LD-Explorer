<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	/**
	 * Term component
	 *
	 * A "term" in this context is anything from the rdfjs library that is considered
	 * a Term, which includes named nodes, blank nodes and literals. See Term interface
	 * for details; https://rdf.js.org/data-model-spec/#term-interface
	 */
	import { resolve } from '$app/paths';
	import { Link, TripleTerm, TermValue } from '$lib/components';
	import { type Settings, settings as savedSettings } from '$lib/stores/settings.store';
	import type { Term } from '@rdfjs/types';
	import { abbreviateTermPrefix } from '$lib/util/term.utils';
	import clsx from 'clsx';
	import { prefixes } from '$lib/stores/prefixes.store';
	import { labelFor } from '$stores/labelLookup.svelte';

	// Props
	interface Props {
		applyVerticalMargins?: boolean;
		term: Term;
		settings?: Settings; // settings exposed as prop to allow for preview functionality
		highlightText?: string;
	}

	let {
		applyVerticalMargins = false,
		settings = $savedSettings, // settings exposed as prop to allow for preview functionality
		term,
		highlightText
	}: Props = $props();

	// State
	const termTypeDetails = {
		NamedNode: { colour: 'bg-amber-400 text-black', text: 'Resource' },
		BlankNode: {
			colour: 'border border-black dark:border-white',
			text: 'Blank Node'
		},
		Literal: { colour: 'bg-black text-white dark:bg-gray-200 dark:text-black', text: 'Literal' },
		Variable: { colour: 'bg-gray-200 dark:bg-gray-800', text: 'Variable' },
		DefaultGraph: { colour: 'bg-pink-600 text-white', text: 'Default Graph' },
		Quad: { colour: 'bg-lime-400 text-black', text: 'Triple Term' }
	};

	let termDisplayValue = $derived(
		term.value && settings.term__abbreviateCommonPrefixes
			? abbreviateTermPrefix(term.value || '', $prefixes)
			: term.value
	);
</script>

{#if term}
	<span class={clsx(applyVerticalMargins && 'my-4 inline-block')}>
		{#if settings.term__showNodeType}
			<span class={clsx('px-1 mr-1', termTypeDetails[term.termType].colour)}
				>{termTypeDetails[term.termType].text}</span
			>
		{/if}
		<span
			class={clsx('block md:inline', term.termType == 'Literal' ? 'wrap-break-word' : 'break-all')}
		>
			{#if term.termType == 'Quad'}
				<TripleTerm {term} />
			{:else if term.termType == 'NamedNode'}
				<Link href={resolve('/explore/iris/detail') + `?iri=${encodeURIComponent(term.value)}`}>
					{#if settings.general__showRDFSLabels}
						{#await labelFor(term.value, { defaultValue: termDisplayValue }) then label}
							<TermValue termValue={label} {highlightText} />
						{/await}
					{:else}
						<TermValue termValue={termDisplayValue} {highlightText} />
					{/if}
				</Link>
			{:else}
				{#if settings.term__showLanguageTag && term.termType == 'Literal' && term.language && term.language.length}
					<span class="bg-gray-100 dark:bg-gray-700 px-1">@{term.language}</span>
				{/if}
				<TermValue termValue={termDisplayValue} {highlightText} />
			{/if}
		</span>
	</span>
{/if}
