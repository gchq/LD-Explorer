<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import clsx from 'clsx';
	import type { Snippet } from 'svelte';

	interface Props {
		drawBranch: boolean;
		children: Snippet;
	}
	let { drawBranch, children }: Props = $props();
</script>

<ul class={clsx(drawBranch && 'ml-4 pl-4 border-l')}>
	{@render children()}
</ul>
