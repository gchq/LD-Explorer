<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { DBFalse, DBTrue, Icon } from '$lib/components/ui/icons';
	import { Paragraph as P } from '$lib/components';
	import type { Readable } from 'svelte/store';
	import type { StreamedQuery } from '$stores/streamedQuery.store';

	interface Props {
		results: Readable<StreamedQuery>;
	}

	let { results }: Props = $props();
	let result = $derived($results.results[0] as boolean);
	let resultText = $derived(result ? 'True' : 'False');
</script>

<ic-card heading={resultText} full-width>
	<i slot="icon"
		><Icon>
			{#if result == true}<DBTrue />{:else}<DBFalse />{/if}
		</Icon>
	</i>
	<ic-typography slot="message"
		><P>The ASK query returned a <strong>{result}</strong> result.</P></ic-typography
	>
</ic-card>
