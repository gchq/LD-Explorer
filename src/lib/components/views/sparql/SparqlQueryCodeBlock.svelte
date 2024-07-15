<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { CodeBlock, Paragraph as P, SummaryDetail } from '$lib/components';
	export let query: string;
	export let codeComment: string | undefined = undefined;
</script>

<SummaryDetail summaryText="View SPARQL query">
	<CodeBlock code={query.trim()} />
	{#if codeComment}
		<P variant="subtitle-small">{codeComment}</P>
	{/if}
</SummaryDetail>
