<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	interface Props {
		text: string;
		highlight: string;
	}

	let { text, highlight }: Props = $props();

	let parts = $derived(text.split(new RegExp(`(${highlight || '?!'})`, 'i')).filter(Boolean));
</script>

{#each parts as part (part)}
	{#if part.toLowerCase() === highlight.toLowerCase()}
		<mark>{part}</mark>
	{:else}
		{part}
	{/if}
{/each}
