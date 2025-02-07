<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { CodeBlock, Paragraph as P, SummaryDetail } from '$lib/components';

	interface Props {
		query: string;
		codeComment?: string;
	}

	let { query, codeComment }: Props = $props();
</script>

<SummaryDetail summaryText="View SPARQL query">
	<CodeBlock code={query.trim()} />
	{#if codeComment}
		<P variant="subtitle-small">{codeComment}</P>
	{/if}
</SummaryDetail>
