<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import Self from '$lib/components/views/ClassHeirachyView.svelte';
	import type { Quad, Quad_Subject } from 'n3';
	import { Term, Tree, TreeItem } from '$lib/components';

	interface Props {
		root: Quad_Subject;
		quads: Quad[];
		drawBranch?: boolean;
	}

	let { root, quads, drawBranch = false }: Props = $props();
	let directDescendents = $derived(quads.filter((q) => q.object.equals(root)));
</script>

<Tree {drawBranch}>
	<TreeItem><Term term={root} /></TreeItem>
	{#each directDescendents as quad (quad)}
		<Self root={quad.subject} {quads} drawBranch={true} />
	{/each}
</Tree>
