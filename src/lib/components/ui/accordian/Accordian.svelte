<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		heading: string;
	}
	let { children, heading }: Props = $props();
</script>

<ic-accordion {heading} class="border-gray-400 first:border-t border-b">
	<ic-typography variant="body">
		{@render children?.()}
	</ic-typography>
</ic-accordion>
