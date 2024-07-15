<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { clsx } from 'clsx';
	export let value: string;
	export let alignment: 'left' | 'right' | 'center' = 'left';
	export let className = '';
</script>

<th
	class={clsx(
		'p-4',
		alignment == 'left' && 'text-left',
		alignment == 'right' && 'text-right',
		alignment == 'center' && 'text-center',
		className
	)}
>
	{value}
</th>
