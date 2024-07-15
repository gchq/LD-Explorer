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

	// Props
	export let bindingsCollection: IBindings[];
	export let highlightText: string;

	// State
	export let variables: string[];
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
