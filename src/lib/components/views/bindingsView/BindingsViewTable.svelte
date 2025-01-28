<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import {
		BindingsValue,
		Table,
		TableBody,
		TableData,
		TableHead,
		TableHeading,
		TableRow
	} from '$lib/components';
	import type { Bindings as IBindings } from '@comunica/types';

	interface Props {
		bindingsCollection: IBindings[];
		highlightText: string;
		variables: string[];
	}

	let { bindingsCollection, highlightText, variables }: Props = $props();
</script>

<Table>
	<TableHead>
		{#each variables as variable}
			<TableHeading value={`?${variable}`} />
		{/each}
	</TableHead>
	<TableBody>
		{#each bindingsCollection as bindings (bindings)}
			<TableRow>
				{#each variables as variable (variable)}
					<TableData>
						<BindingsValue {bindings} {variable} {highlightText} />
					</TableData>
				{/each}
			</TableRow>
		{/each}
	</TableBody>
</Table>
