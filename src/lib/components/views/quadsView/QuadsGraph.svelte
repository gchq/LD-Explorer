<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { MagnifyFit, MagnifyMinus, MagnifyPlus } from '$lib/components/ui/icons';
	import cytoscape, { type Core as CytoscapeCore } from 'cytoscape';
	import { cytoscapeSettings, getCytoscapeElementsForQuads } from '$lib/util/cytoscape/cytoscape';
	import { Button } from '$lib/components';
	import type { Quad } from '@rdfjs/types';
	import layout from '$lib/util/cytoscape/layout';
	import { onMount } from 'svelte';
	import { prefixes } from '$lib/stores/prefixes.store';
	import { settings } from '$lib/stores/settings.store';

	interface Props {
		quads: Quad[];
	}
	let { quads }: Props = $props();

	let container: HTMLDivElement;
	let cy: CytoscapeCore;
	let zoomLevel = 1;

	// Lifecycle
	onMount(() => {
		cy = cytoscape({
			container,
			userZoomingEnabled: false,
			...cytoscapeSettings({ darkMode: !!$settings.general__darkMode })
		});
		zoomLevel = cy.zoom();
	});

	$effect(() => {
		const elements = getCytoscapeElementsForQuads(
			quads,
			$settings.term__abbreviateCommonPrefixes,
			$prefixes
		);
		if (cy) {
			cy.add(elements);
			cy.makeLayout(layout).run();
			cy.fit();
			zoomLevel = cy.zoom();
		}
	});

	function handleZoom(zoomChange: 0.1 | -0.1) {
		zoomLevel = zoomLevel + zoomChange;
		if (zoomLevel + zoomChange < 0) zoomLevel = 0;
		cy.zoom(zoomLevel);
	}

	function resetZoom() {
		cy.fit();
		zoomLevel = cy.zoom();
	}
</script>

<div class="border p-2 my-4">
	<Button label="Zoom In" size="small" variant="tertiary" onclick={() => handleZoom(0.1)}>
		{#snippet icon()}<MagnifyPlus />{/snippet}
	</Button>

	<Button label="Zoom Out" size="small" variant="tertiary" onclick={() => handleZoom(-0.1)}>
		{#snippet icon()}<MagnifyMinus />{/snippet}
	</Button>

	<Button label="Zoom to fit" size="small" variant="tertiary" onclick={resetZoom}>
		{#snippet icon()}<MagnifyFit />{/snippet}
	</Button>
	<div class="h-screen block" bind:this={container}></div>
</div>
