<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { MagnifyFit, MagnifyMinus, MagnifyPlus } from '$lib/components/ui/icons';
	import cytoscape, { type Core as CytoscapeCore } from 'cytoscape';
	import { cytoscapeSettings, getCytoscapeElementsForQuads } from '$lib/util/cytoscape/cytoscape';
	import { Button } from '$lib/components';
	import type { Quad } from 'n3';
	import layout from '$lib/util/cytoscape/layout';
	import { onMount } from 'svelte';
	import { prefixes } from '$lib/stores/prefixes.store';
	import { settings } from '$lib/stores/settings.store';

	// Props
	export let quads: Quad[];

	// State
	let container: HTMLDivElement;
	let cy: CytoscapeCore;
	let zoomLevel = 1;

	// Lifecycle
	onMount(() => {
		cy = cytoscape({
			container,
			userZoomingEnabled: false,
			...cytoscapeSettings
		});
		zoomLevel = cy.zoom();
	});

	$: {
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
	}

	// Events

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
	<Button label="Zoom In" size="small" variant="tertiary" on:click={() => handleZoom(0.1)}>
		<i slot="icon"><MagnifyPlus /></i>
	</Button>

	<Button label="Zoom Out" size="small" variant="tertiary" on:click={() => handleZoom(-0.1)}>
		<i slot="icon"><MagnifyMinus /></i>
	</Button>

	<Button label="Zoom to fit" size="small" variant="tertiary" on:click={resetZoom}>
		<i slot="icon"><MagnifyFit /></i>
	</Button>
	<div class="h-screen block" bind:this={container} />
</div>
