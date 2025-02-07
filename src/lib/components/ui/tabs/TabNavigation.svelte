<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import type { IcTabSelectEventDetail } from '@ukic/web-components';
	import { type Snippet } from 'svelte';

	interface Props {
		selectedTabIndex?: number;
		onchange?: (e: CustomEvent<IcTabSelectEventDetail>) => void;
		panels: Snippet;
		children: Snippet;
	}

	let { selectedTabIndex = $bindable(), onchange, children, panels }: Props = $props();

	// Events
	function handleTabChange(e: CustomEvent<IcTabSelectEventDetail>) {
		selectedTabIndex = e.detail.tabIndex;
		onchange?.(e);
	}
</script>

<ic-tab-context selected-tab-index={selectedTabIndex} onicTabSelect={handleTabChange}>
	<ic-tab-group label="Tab group" class="mb-4">
		{@render children()}
	</ic-tab-group>
	{@render panels()}
</ic-tab-context>
