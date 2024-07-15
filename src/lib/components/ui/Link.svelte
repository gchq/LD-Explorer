<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { base } from '$app/paths';
	import clsx from 'clsx';
	export let href: string;
	export let htmlClass = '';
	export let external = false;
	export let inPage = false;

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
		{...$$restProps}><slot /></ic-link
	>
{:else}
	<ic-link class={classes} href={inPage ? href : `${base}/${relativeHref}`} show-icon={false}
		><slot /></ic-link
	>
{/if}
