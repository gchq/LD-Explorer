<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { Heading, Paragraph as P } from '$lib/components';
	import { PageView } from '$lib/components/views';
	import type { RoutedTab } from '$lib/navigation/tabs/types';

	interface Props {
		heading: string;
		subheading: string;
		selectedTabIndex: number;
		navigationLabel: string;
		tabs: RoutedTab<number>[];
	}

	let { heading, subheading, selectedTabIndex, navigationLabel, tabs }: Props = $props();

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
