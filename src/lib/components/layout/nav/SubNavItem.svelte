<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { resolve } from '$app/paths';
	import clsx from 'clsx';

	// Props
	interface Props {
		title: string;
		href: string;
		selected?: boolean;
	}

	let { title, href, selected = false }: Props = $props();

	// @ts-expect-error see https://github.com/sveltejs/eslint-plugin-svelte/issues/1319
	const resolvedHref = resolve((() => href)());
</script>

<li
	class={clsx(
		'relative hover:bg-icds-tree-view-hover',
		selected &&
			'font-bold before:content-[""] before:absolute before:w-2 before:h-full before:bg-icds-action'
	)}
>
	<a class={clsx('pl-6 pr-4 py-2 inline-block w-full')} href={resolvedHref}>{title}</a>
</li>
