<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { base } from '$app/paths';
	import clsx from 'clsx';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		href: string;
		htmlClass?: string;
		external?: boolean;
		inPage?: boolean;
	}

	let {
		children,
		href,
		htmlClass = '',
		external = false,
		inPage = false,
		...restOfProps
	}: Props = $props();

	// BasePath will contain a forward slash, so remove it if the user
	// has passed one in.
	let relativeHref = href.startsWith('/') ? href.substring(1) : href;

	const classes = clsx(htmlClass, 'break-all');
</script>

{#if external}
	<ic-link
		class={classes}
		{href}
		show-icon
		target="_blank"
		rel="noreferrer"
		referrerpolicy="no-referrer"
		{...restOfProps}
	>
		{@render children?.()}
	</ic-link>
{:else}
	<ic-link class={classes} href={inPage ? href : `${base}/${relativeHref}`} show-icon={false}>
		{@render children?.()}
	</ic-link>
{/if}
