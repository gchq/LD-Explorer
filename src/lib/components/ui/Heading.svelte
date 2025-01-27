<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import type { Snippet } from 'svelte';

	// Note that h1 is not a valid tag to pass in. This is because in ICDS' opinion
	// there should only be one of these on the page, this helps to ensure that
	// opinion is preserved.

	interface Props {
		beforeText?: Snippet;
		afterText?: Snippet;
		id?: string;
		tag?: 'h2' | 'h3' | 'h4' | 'h5';
		variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
		text: string;
		applyVerticalMargins?: boolean;
	}

	let {
		beforeText,
		afterText,
		id,
		text,
		tag = 'h2',
		variant = tag,
		applyVerticalMargins = true
	}: Props = $props();
</script>

<ic-typography
	{id}
	{variant}
	class="leading-tight mb-4 mt-6"
	apply-vertical-margins={applyVerticalMargins}
>
	<svelte:element this={tag}>
		{@render beforeText?.()}
		{text}
		{@render afterText?.()}
	</svelte:element>
</ic-typography>
