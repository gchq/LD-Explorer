<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { HtmlHead, PageHeader, Section } from '$lib/components';
	import type { RoutedTab } from '$lib/navigation/tabs/types';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		heading: string;
		subheading: string;
		pageTitle?: string;
		includeSection?: boolean;
		tabs?: RoutedTab<number>[];
	}

	let {
		children,
		heading,
		subheading,
		tabs,
		pageTitle = heading,
		includeSection = true
	}: Props = $props();
</script>

<HtmlHead title={pageTitle} />
<PageHeader {heading} {subheading} {tabs} breakWords={heading.includes(' ')} />

{#if includeSection}
	<Section>
		{@render children()}
	</Section>
{:else}
	{@render children()}
{/if}
