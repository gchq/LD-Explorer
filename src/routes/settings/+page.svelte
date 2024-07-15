<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { Button, Switch, TextField } from '$lib/components';
	import { PageView } from '$lib/components/views';
	import { settings } from '$lib/stores/settings.store';

	// State (the "dirty" settings are the ones which are in-flight and have not yet been applied)
	const dirtySettings = {
		general__defaultLimit: $settings.general__defaultLimit,
		general__showQuads: $settings.general__showQuads
	};

	let dirty = false;

	function handleApplySettings() {
		settings.update((current) => ({
			...current,
			...dirtySettings
		}));
		dirty = false;
	}
</script>

<PageView heading="General Settings" subheading="Adjust system settings for this session">
	<form on:submit|preventDefault={handleApplySettings}>
		<TextField
			label="Default Limit"
			type="number"
			helperText="Default limit to set on any sparql queries in the explore section"
			bind:value={dirtySettings.general__defaultLimit}
			on:input={() => (dirty = true)}
		/>

		<Switch
			label="Show Quads"
			helperText="Display full quads rather than triples when browsing data."
			bind:checked={dirtySettings.general__showQuads}
			on:change={() => (dirty = true)}
		/>

		<div class="mt-4">
			<Button label="Apply" type="submit" disabled={!dirty} />
		</div>
	</form>
</PageView>
