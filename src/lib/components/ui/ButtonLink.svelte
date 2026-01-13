<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import type { IcButtonVariants, IcSizes } from '@ukic/web-components';
	import type { Snippet } from 'svelte';

	interface Props {
		icon?: Snippet;
		label: string;
		href: string;
		external?: boolean;
		variant?: IcButtonVariants;
		size?: IcSizes;
		ariaLabel?: string;
	}

	let {
		icon,
		label,
		href,
		external = false,
		variant = 'primary',
		size = 'medium',
		ariaLabel
	}: Props = $props();
</script>

<ic-button
	{href}
	{size}
	{variant}
	class="wrap-break-word"
	target={external ? '_blank' : undefined}
	rel={external ? 'noreferrer' : undefined}
	aria-label={ariaLabel}
>
	{label}

	{#if icon}
		<i slot="icon">{@render icon()}</i>
	{/if}
</ic-button>
