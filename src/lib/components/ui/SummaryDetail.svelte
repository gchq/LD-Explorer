<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import clsx from 'clsx';
	import type { Snippet } from 'svelte';
	interface Props {
		children?: Snippet;
		summaryText: string;
		pad?: boolean;
	}
	let { children, summaryText, pad = true }: Props = $props();
</script>

<details class={clsx('my-2')}>
	<summary
		class={clsx(
			'font-bold hover:decoration-4 hover:underline-offset-4 underline cursor-pointer text-icds-hyperlink'
		)}>{summaryText}</summary
	>
	<div class={clsx(pad && 'py-2 px-4 break-words overflow-hidden')}>
		{@render children?.()}
	</div>
</details>
