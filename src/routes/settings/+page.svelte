<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { Button, Switch, TextField } from '$lib/components';
	import { PageView } from '$lib/components/views';
	import { settings } from '$lib/stores/settings.store';

	// State (the "dirty" settings are the ones which are in-flight and have not yet been applied)
	const dirtySettings = {
		general__darkMode: $settings.general__darkMode,
		general__defaultLimit: $settings.general__defaultLimit,
		general__showQuads: $settings.general__showQuads,
		general__showRDFSLabels: $settings.general__showRDFSLabels
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

<PageView heading="General Settings" subheading="Adjust system settings for this session">
	<form onsubmit={handleApplySettings}>
		<TextField
			label="Default Limit"
			type="number"
			helperText="Default limit to set on any sparql queries in the explore section"
			bind:value={dirtySettings.general__defaultLimit}
			oninput={() => (dirty = true)}
		/>

		<Switch
			label="Show Quads"
			helperText="Display full quads rather than triples when browsing data."
			bind:checked={dirtySettings.general__showQuads}
			onchange={() => (dirty = true)}
		/>

		<Switch
			label="Display Labels"
			helperText="Attempt to fetch and display RDFS labels from active data sources when viewing terms."
			bind:checked={dirtySettings.general__showRDFSLabels}
			onchange={() => (dirty = true)}
		/>

		<Switch
			label="Dark Mode"
			helperText="Toggle the dark colour theme."
			bind:checked={dirtySettings.general__darkMode}
			onchange={() => (dirty = true)}
		/>

		<div class="mt-10">
			<Button label="Apply" type="submit" disabled={!dirty} />
		</div>
	</form>
</PageView>
