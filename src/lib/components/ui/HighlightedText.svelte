<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	export let text: string;
	export let highlight: string;

	$: parts = text.split(new RegExp(`(${highlight || '?!'})`, 'i')).filter(Boolean);

	function isTextToHighlight(compare: string) {
		return compare.toLowerCase() === highlight.toLowerCase();
	}
</script>

{#each parts as part}
	{#if isTextToHighlight(part)}
		<mark>{part}</mark>
	{:else}
		{part}
	{/if}
{/each}
