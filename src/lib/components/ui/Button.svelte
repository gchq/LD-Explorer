<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { type IcButtonTypes, type IcButtonVariants, type IcSizes } from '@ukic/web-components';
	import clsx from 'clsx';

	export let className: string = '';
	export let label: string;
	export let variant: IcButtonVariants = 'primary';
	export let size: IcSizes = 'default';
	export let type: IcButtonTypes = 'submit';
	export let disabled = false;
	export let ariaLabel: string | undefined = undefined;
</script>

<!-- These seem to be suprious linting errors due to Svelte not recognizing custom elements -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<ic-button
	on:click
	on:keydown
	{disabled}
	{type}
	{size}
	{variant}
	class={clsx('break-words', className)}
	aria-label={ariaLabel}
>
	{label}
	<slot name="icon" />
</ic-button>
