<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { onMount } from 'svelte';

	// Some ICDS components are not automatically responsive and their styles are not
	// controlled with CSS - instead, they rely on the developer to pass in props
	// programatically to specify whether they want certain styles (such as the "small
	// version" of a text field).
	//
	// This component provides a way to expose facts about the user's viewport settings
	// programatically and consistently (e.g. giving all other components a way to check
	// if a viewport "is small" without them having to get into the details about what
	// it means to be small)
	//

	interface Props {
		isSmall?: boolean | undefined;
		isExtraSmall?: boolean | undefined;
	}

	// viewport sizes based on breakpoints (see handleResize below)
	let { isSmall = $bindable(), isExtraSmall = $bindable() }: Props = $props();

	// Breakpoints
	const mdBreakpoint = 768;
	const smBreakpoint = 576;

	// State
	let innerWidth: number = $state(0);

	// Handlers
	const handleResize = () => {
		isSmall = innerWidth < mdBreakpoint;
		isExtraSmall = innerWidth < smBreakpoint;
	};

	// We need to initialize the viewport value(s) for when the page first loads,
	// before any resizing has happened.
	onMount(handleResize);
</script>

<svelte:window bind:innerWidth on:resize={handleResize} />
