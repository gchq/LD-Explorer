<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { clsx } from 'clsx';
	import type { Snippet } from 'svelte';

	interface Props {
		includeBottomBorder?: boolean;
		children?: Snippet;
	}
	let { includeBottomBorder = true, children }: Props = $props();
</script>

<tr
	class={clsx(
		'hover:bg-gray-50 dark:hover:bg-gray-900',
		includeBottomBorder && 'border-b border-gray-300 dark:border-gray-600'
	)}
>
	{@render children?.()}
</tr>
