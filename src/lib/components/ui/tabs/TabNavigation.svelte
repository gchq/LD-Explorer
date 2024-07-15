<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import type { IcTabSelectEventDetail } from '@ukic/web-components';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let selectedTabIndex: number | undefined = undefined;

	// Events
	function handleTabChange(e: CustomEvent<IcTabSelectEventDetail>) {
		selectedTabIndex = e.detail.tabIndex;
		dispatch('change', { e });
	}
</script>

<ic-tab-context selected-tab-index={selectedTabIndex} on:icTabSelect={handleTabChange}>
	<ic-tab-group label="Example tab group">
		<slot></slot>
	</ic-tab-group>
	<slot name="panels"></slot>
</ic-tab-context>
