<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	interface Props {
		title: string;
	}

	let { title }: Props = $props();
</script>

<svelte:head>
	<title>{title} - LD-Explorer</title>
	<meta name="author" content="GCHQ" />
	<meta
		name="description"
		content="The missing tool for easily exploring, federating and querying linked data resources directly from the browser."
	/>
</svelte:head>
