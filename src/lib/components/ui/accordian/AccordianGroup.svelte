<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		groupTitle: string;
		children?: Snippet;
	}
	let { groupTitle, children }: Props = $props();
</script>

<ic-accordion-group size="large" class="block mb-10" single-expansion group-title={groupTitle}>
	{@render children?.()}
</ic-accordion-group>
