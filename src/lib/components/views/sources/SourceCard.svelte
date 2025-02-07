<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import type { LocalSource } from '$stores/sources/local-sources.store';
	import type { RemoteSource } from '$stores/sources/remote-sources.store';
	import type { Snippet } from 'svelte';

	interface Props {
		source: LocalSource | RemoteSource;
		message: Snippet;
		interactionControls: Snippet;
	}
	let { source, message, interactionControls }: Props = $props();
	let { id, name, enabled } = $derived(source);
</script>

<ic-card class="mb-4" full-width heading={name} clickable="false" data-testid="data-source-card">
	<ic-typography variant="subtitle-small" slot="subheading">
		{id}<br />
	</ic-typography>

	<ic-status-tag
		slot="adornment"
		small
		label={enabled ? 'Enabled' : 'Disabled'}
		status={enabled ? 'success' : 'warning'}
	></ic-status-tag>

	<div slot="message">
		{@render message()}
	</div>

	<div slot="interaction-controls">
		{@render interactionControls()}
	</div>
</ic-card>
