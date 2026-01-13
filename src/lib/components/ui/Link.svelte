<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import clsx from 'clsx';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		href: string;
		htmlClass?: string;
		external?: boolean;
	}

	let { children, href, htmlClass = '', external = false, ...restOfProps }: Props = $props();

	const classes = $derived(clsx(htmlClass, 'break-all'));
</script>

<ic-link
	{href}
	class={classes}
	show-icon={external}
	target={external ? '_blank' : undefined}
	rel={external ? 'noreferrer' : undefined}
	referrerpolicy={external ? 'no-referrer' : undefined}
	{...restOfProps}
>
	{@render children?.()}
</ic-link>
