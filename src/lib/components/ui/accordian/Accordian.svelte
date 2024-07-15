<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	export let heading: string;
</script>

<ic-accordion {heading} class="border-gray-400 first:border-t border-b">
	<ic-typography variant="body">
		<slot />
	</ic-typography>
</ic-accordion>
