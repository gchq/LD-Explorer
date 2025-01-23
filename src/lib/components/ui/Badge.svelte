<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import type {
		IcBadgePositions,
		IcBadgeTypes,
		IcBadgeVariants,
		IcSizes
	} from '@ukic/web-components';

	export let type: IcBadgeTypes;
	export let visible = true;
	export let position: IcBadgePositions = 'far';
	export let variant: IcBadgeVariants = 'neutral';
	export let size: IcSizes = 'default';
	export let textLabel: string | undefined = undefined;
	export let ariaLabel: string | undefined = undefined;
</script>

<ic-badge
	{type}
	{position}
	{variant}
	{visible}
	{size}
	text-label={textLabel}
	accessible-label={ariaLabel}
>
</ic-badge>
