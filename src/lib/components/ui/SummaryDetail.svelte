<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import clsx from 'clsx';
	export let summaryText: string;
	export let pad = true;
</script>

<details class={clsx('my-2')}>
	<summary
		class={clsx(
			'font-bold hover:decoration-4 hover:underline-offset-4 underline cursor-pointer text-icds-hyperlink hover:text-icds-hyperlink-hover'
		)}>{summaryText}</summary
	>
	<div class={clsx(pad && 'py-2 px-4 break-words overflow-hidden')}>
		<slot />
	</div>
</details>
