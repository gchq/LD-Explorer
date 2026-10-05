<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { Button, Switch, TextField } from '$lib/components';
	import { PageView } from '$lib/components/views';
	import { settings } from '$lib/stores/settings.store';

	// State (the "dirty" settings are the ones which are in-flight and have not yet been applied)
	const dirtySettings = {
		graph__showQuads: $settings.graph__showQuads,
		graph__queryForNamedGraphs: $settings.graph__queryForNamedGraphs,
		graph__unionDefaultGraph: $settings.graph__unionDefaultGraph
	};

	let dirty = false;

	function handleApplySettings(e: Event) {
		e.preventDefault();
		settings.update((current) => ({
			...current,
			...dirtySettings
		}));
		dirty = false;
	}
</script>

<PageView heading="Graph Settings" subheading="Settings relating to graphs / graph querying">
	<form onsubmit={handleApplySettings}>

		<Switch
			label="Show Quads"
			helperText="Display full quads rather than triples when browsing data."
			bind:checked={dirtySettings.graph__showQuads}
			onchange={() => (dirty = true)}
		/>

		<Switch
			label="Union Default Graph"
			helperText="Treat the union of named graphs as the default graph when running queries."
			bind:checked={dirtySettings.graph__unionDefaultGraph}
			onchange={() => (dirty = true)}
		/>

		<Switch
			label="Include Named Graphs in canned queries"
			helperText="Whether the canned queries in the explore pages should also look in all named graphs (using the GRAPH keyword, which not all endpoints support)."
			bind:checked={dirtySettings.graph__queryForNamedGraphs}
			onchange={() => (dirty = true)}
		/>

		<div class="mt-10">
			<Button label="Apply" type="submit" disabled={!dirty} />
		</div>
	</form>
</PageView>
