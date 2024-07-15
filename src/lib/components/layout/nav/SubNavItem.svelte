<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { base } from '$app/paths';
	import clsx from 'clsx';

	// Props
	export let title: string;
	export let href: string;
	export let selected = false;
</script>

<li class="hover:bg-gray-100">
	<a
		class={clsx(
			'px-4 inline-block w-full p-2 hover:bg-gray-100 border-l-8',
			selected ? 'font-bold border-icds-action' : 'border-gray-50'
		)}
		href={`${base}${href}`}>{title}</a
	>
</li>
