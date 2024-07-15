<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { base } from '$app/paths';
	import { clsx } from 'clsx';

	// Props
	export let title: string;
	export let screenshot: string;
	export let screenshotAlt: string;
	export let align: 'left' | 'right' = 'left';
</script>

<ic-section-container
	align="left"
	class={clsx('lg:flex lg:items-start', align == 'right' ? 'lg:flex-row' : 'lg:flex-row-reverse')}
>
	<div class="lg:p-4 lg:w-1/2">
		<ic-typography variant="h4" class="mb-4"><h3>{title}</h3></ic-typography>
		<slot />
	</div>
	<div class="lg:p-4 lg:w-1/2">
		<img
			src={`${base}${screenshot}`}
			class="border border-gray-200 shadow-xl"
			alt={screenshotAlt}
		/>
	</div>
</ic-section-container>
<hr class="my-10 md:my-4 w-2/3 block m-auto" />
