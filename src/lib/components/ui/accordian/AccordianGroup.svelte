<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	export let groupTitle: string;
</script>

<ic-accordion-group size="large" class="block mb-10" single-expansion group-title={groupTitle}
	><slot /></ic-accordion-group
>
