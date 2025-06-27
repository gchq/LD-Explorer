<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { base } from '$app/paths';
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
		selected && 'before:content-[""] before:absolute before:w-2 before:h-full before:bg-icds-action'
	)}
>
	<a class={clsx('px-4 inline-block w-full p-2')} href={`${base}${href}`}
		><ic-typography>{title}</ic-typography></a
	>
</li>
