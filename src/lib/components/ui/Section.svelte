<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { clsx } from 'clsx';
	import type { Snippet } from 'svelte';

	interface Props {
		aligned?: 'center' | 'full-width' | 'left';
		applyBottomPadding?: boolean;
		children?: Snippet;
	}
	let { aligned = 'center', applyBottomPadding = false, children }: Props = $props();
</script>

<ic-section-container {aligned} class={clsx('m-auto p-4 xl:px-6', applyBottomPadding && 'pb-20')}>
	{@render children?.()}
</ic-section-container>
