<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { Heading, Paragraph as P } from '$lib/components';
	import { PageView } from '$lib/components/views';
	import type { RoutedTab } from '$lib/navigation/tabs/types';

	export let heading: string;
	export let subheading: string;
	export let selectedTabIndex: number;
	export let navigationLabel: string;
	export let tabs: RoutedTab<number>[];

	// State
	const tab = tabs.find((t) => t.tabIndex === selectedTabIndex);
	const tabTitle = tab?.title || 'Detail';
	const tabDescription = tab?.description;
</script>

<PageView pageTitle={`${tabTitle} - ${navigationLabel}`} {heading} {subheading} {tabs}>
	<div class="pb-2">
		<Heading text={tabTitle} tag="h3" />

		{#if tabDescription}
			<P>{tabDescription}</P>
		{/if}
	</div>

	<slot />
</PageView>
