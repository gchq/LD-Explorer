<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	interface Props {
		code: string;
	}
	let { code }: Props = $props();
</script>

<pre
	role="code"
	class="whitespace-pre bg-gray-100 dark:bg-gray-700 p-4 my-2 overflow-x-scroll">{code}</pre>
