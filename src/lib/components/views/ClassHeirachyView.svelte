<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import type { NamedNode, Quad } from 'n3';
	import { Term, Tree, TreeItem } from '$lib/components';

	// Props
	export let root: NamedNode;
	export let quads: Quad[];
	export let drawBranch = false;

	$: directDescendents = quads.filter((q) => q.object.equals(root));
</script>

<Tree {drawBranch}>
	<TreeItem><Term term={root} /></TreeItem>
	{#each directDescendents as quad (quad)}
		<svelte:self root={quad.subject} {quads} drawBranch={true} />
	{/each}
</Tree>
