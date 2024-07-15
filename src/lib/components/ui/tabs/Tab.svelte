<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import clsx from 'clsx';
	export let title: string;
	export let disabled = false;
	export let selected = false;
</script>

<!-- These seem to be suprious linting errors due to Svelte not recognizing custom elements -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<ic-tab
	on:click
	on:keyup
	{disabled}
	{selected}
	class={clsx(
		'border-b-4 border-b-transparent aria-selected:border-b-icds-action visible',
		disabled && 'pointer-events-none text-gray-300'
	)}>{title}</ic-tab
>
