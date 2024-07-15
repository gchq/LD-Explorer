<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import clsx from 'clsx';
	export let listType: 'ul' | 'ol' | 'no-symbol';
	export let applyVerticalMargins = false;
</script>

<svelte:element
	this={listType == 'no-symbol' ? 'ul' : listType}
	class={clsx(
		'block',
		listType == 'ul' && 'list-disc ml-6',
		listType == 'ol' && 'list-decimal ml-6',
		listType == 'no-symbol' && 'list-none',
		applyVerticalMargins && 'my-8'
	)}
>
	<slot />
</svelte:element>
