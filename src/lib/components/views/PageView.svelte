<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { HtmlHead, PageHeader, Section } from '$lib/components';
	import type { RoutedTab } from '$lib/navigation/tabs/types';

	export let heading: string;
	export let subheading: string;
	export let pageTitle: string = heading;
	export let includeSection = true;
	export let tabs: RoutedTab<number>[] | undefined = undefined;
</script>

<HtmlHead title={pageTitle} />
<PageHeader {heading} {subheading} {tabs} breakWords={heading.includes(' ')} />

{#if includeSection}
	<Section>
		<slot />
	</Section>
{:else}
	<slot />
{/if}
