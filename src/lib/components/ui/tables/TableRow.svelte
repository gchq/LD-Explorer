<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { clsx } from 'clsx';

	export let includeBottomBorder = true;
</script>

<tr class={clsx('hover:bg-gray-50', includeBottomBorder && 'border-b border-gray-300')}>
	<slot />
</tr>
