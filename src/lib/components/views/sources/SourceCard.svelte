<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import type { LocalSource } from '$stores/sources/local-sources.store';
	import type { RemoteSource } from '$stores/sources/remote-sources.store';

	// Props
	export let source: LocalSource | RemoteSource;

	// State
	$: ({ id, name, enabled } = source);
</script>

<ic-card class="mb-4" full-width heading={name} clickable="false" data-testid="data-source-card">
	<ic-typography variant="subtitle-small" slot="subheading">
		{id}<br />
		<slot name="subheading" />
	</ic-typography>
	<ic-status-tag
		slot="adornment"
		small
		label={enabled ? 'Enabled' : 'Disabled'}
		status={enabled ? 'success' : 'warning'}
	></ic-status-tag>
	<slot name="message" slot="message" />
	<slot name="interaction-controls" slot="interaction-controls" />
	<slot />
</ic-card>
