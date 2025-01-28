<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { HighlightedText } from '$lib/components';

	interface Props {
		termValue: string;
		highlightText?: string;
	}
	let { termValue, highlightText }: Props = $props();
</script>

{#if highlightText}
	<HighlightedText text={termValue} highlight={highlightText} />
{:else}
	{termValue}
{/if}
