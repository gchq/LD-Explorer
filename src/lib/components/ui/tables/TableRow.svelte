<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { clsx } from 'clsx';
	import type { Snippet } from 'svelte';

	interface Props {
		includeBottomBorder?: boolean;
		children: Snippet;
	}
	let { includeBottomBorder = true, children }: Props = $props();
</script>

<tr class={clsx('hover:bg-gray-50', includeBottomBorder && 'border-b border-gray-300')}>
	{@render children()}
</tr>
