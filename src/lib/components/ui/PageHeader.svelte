<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import type { RoutedTab } from '$lib/navigation/tabs/types';
	import { ViewportHelper } from '$lib/components/helpers';
	import { base } from '$app/paths';

	import clsx from 'clsx';

	interface Props {
		heading: string;
		subheading: string;
		tabs?: RoutedTab<number>[];
		breakWords?: boolean;
	}

	let { heading, subheading, tabs = [], breakWords = false }: Props = $props();
	let isSmall: boolean = $state(false);
</script>

<ViewportHelper bind:isSmall />

<ic-page-header {subheading} size={isSmall ? 'small' : 'default'} aligned="center">
	<ic-typography slot="heading" variant={isSmall ? 'h4' : 'h2'}>
		<h2 class={clsx(breakWords ? 'break-words' : 'break-all')}>
			{heading}
		</h2>
	</ic-typography>

	{#each tabs as tab (tab.tabIndex)}
		<ic-navigation-item
			slot="tabs"
			label={tab.title}
			href={`${base}${tab.href}`}
			selected={window.location.toString().endsWith(tab.href)}
		></ic-navigation-item>
	{/each}
</ic-page-header>
