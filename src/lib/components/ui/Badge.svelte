<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import type {
		IcBadgePositions,
		IcBadgeTypes,
		IcBadgeVariants,
		IcSizes
	} from '@ukic/web-components';

	interface Props {
		type: IcBadgeTypes;
		visible?: boolean;
		position?: IcBadgePositions;
		variant: IcBadgeVariants;
		size: IcSizes;
		textLabel?: string;
		ariaLabel?: string;
	}

	let {
		type,
		visible = true,
		position = 'far',
		variant = 'neutral',
		size = 'default',
		textLabel,
		ariaLabel
	}: Props = $props();
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
