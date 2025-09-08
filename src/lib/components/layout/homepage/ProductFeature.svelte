<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { asset } from '$app/paths';
	import { clsx } from 'clsx';
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		title: string;
		screenshot: string;
		screenshotAlt: string;
		align?: 'left' | 'right';
	}

	// Props
	let { children, title, screenshot, screenshotAlt, align = 'left' }: Props = $props();
</script>

<ic-section-container
	align="left"
	class={clsx('lg:flex lg:items-start', align == 'right' ? 'lg:flex-row' : 'lg:flex-row-reverse')}
>
	<div class="lg:p-4 lg:w-1/2">
		<ic-typography variant="h4" class="mb-4"><h3>{title}</h3></ic-typography>
		{@render children?.()}
	</div>
	<div class="lg:p-4 lg:w-1/2">
		<img src={asset(screenshot)} class="border border-gray-200 shadow-xl" alt={screenshotAlt} />
	</div>
</ic-section-container>
<hr
	class="py-4 my-14 md:my-4 w-2/3 block m-auto border-t border-t-gray-200 dark:border-t-gray-600"
/>
