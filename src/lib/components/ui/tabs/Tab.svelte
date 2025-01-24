<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import clsx from 'clsx';
	import type { EventHandler } from 'svelte/elements';

	interface Props {
		title: string;
		disabled?: boolean;
		selected?: boolean;
		onclick?: EventHandler;
		onkeyup?: EventHandler;
	}

	let { title, onclick, onkeyup, disabled = false, selected = false }: Props = $props();
</script>

<!-- These seem to be suprious linting errors due to Svelte not recognizing custom elements -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<ic-tab
	{onclick}
	{onkeyup}
	{disabled}
	{selected}
	class={clsx(
		'p-4 border-b-4 border-b-transparent aria-selected:border-b-icds-action visible',
		disabled && 'pointer-events-none text-gray-300'
	)}
>
	{title}
</ic-tab>
