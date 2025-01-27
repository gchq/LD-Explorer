<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { clsx } from 'clsx';
	export let aligned: 'center' | 'full-width' | 'left' = 'center';
	export let applyBottomPadding = false;
</script>

<ic-section-container {aligned} class={clsx('m-auto p-4 xl:px-6', applyBottomPadding && 'pb-20')}
	><slot /></ic-section-container
>
