<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	/* eslint-disable svelte/no-navigation-without-resolve -- we already resolve them in sub-navigation.ts */

	import clsx from 'clsx';

	// Props
	interface Props {
		title: string;
		href: string;
		selected?: boolean;
	}

	let { title, href, selected = false }: Props = $props();
</script>

<li
	class={clsx(
		'relative hover:bg-icds-tree-view-hover',
		selected &&
			'font-bold before:content-[""] before:absolute before:w-2 before:h-full before:bg-icds-action'
	)}
>
	<a class={clsx('pl-6 pr-4 py-2 inline-block w-full')} {href}>{title}</a>
</li>
