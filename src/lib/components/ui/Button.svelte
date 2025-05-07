<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { type IcButtonTypes, type IcButtonVariants, type IcSizes } from '@ukic/web-components';
	import clsx from 'clsx';
	import type { Snippet } from 'svelte';
	import type { EventHandler } from 'svelte/elements';

	interface Props {
		className?: string;
		label: string;
		variant?: IcButtonVariants;
		size?: IcSizes;
		type?: IcButtonTypes;
		disabled?: boolean;
		ariaLabel?: string | undefined;
		onclick?: EventHandler;
		onkeydown?: EventHandler;
		icon?: Snippet;
	}

	let {
		onclick,
		onkeydown,
		icon,
		className,
		label,
		variant = 'primary',
		size = 'medium',
		type = 'submit',
		disabled,
		ariaLabel
	}: Props = $props();
</script>

<!-- These seem to be suprious linting errors due to Svelte not recognizing custom elements -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<ic-button
	{onclick}
	{onkeydown}
	{disabled}
	{type}
	{size}
	{variant}
	class={clsx('break-words', className)}
	aria-label={ariaLabel}
>
	{label}

	{#if icon}
		<i slot="left-icon">{@render icon()}</i>
	{/if}
</ic-button>
