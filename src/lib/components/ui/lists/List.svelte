<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import clsx from 'clsx';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		listType: 'ul' | 'ol' | 'no-symbol';
		applyVerticalMargins?: boolean;
	}

	let { listType, children, applyVerticalMargins = false }: Props = $props();
</script>

<svelte:element
	this={listType == 'no-symbol' ? 'ul' : listType}
	class={clsx(
		'block',
		listType == 'ul' && 'list-disc ml-6',
		listType == 'ol' && 'list-decimal ml-6',
		listType == 'no-symbol' && 'list-none',
		applyVerticalMargins && 'my-8'
	)}
>
	{@render children()}
</svelte:element>
