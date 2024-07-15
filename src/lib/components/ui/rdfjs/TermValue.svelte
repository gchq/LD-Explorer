<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { HighlightedText } from '$lib/components';

	export let termValue: string;
	export let highlightText: string | undefined = undefined;
</script>

{#if highlightText}
	<HighlightedText text={termValue} highlight={highlightText} />
{:else}
	{termValue}
{/if}
