<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import clsx from 'clsx';
	export let drawBranch = false;
</script>

<ul class={clsx(drawBranch && 'ml-4 pl-4 border-l')}>
	<slot />
</ul>
