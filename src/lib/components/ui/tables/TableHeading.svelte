<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { clsx } from 'clsx';

	interface Props {
		value: string;
		alignment: 'left' | 'right' | 'center';
		className?: string;
	}
	let { value, className, alignment = 'left' }: Props = $props();
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
