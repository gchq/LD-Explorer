<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { Alert, Button, SummaryDetail } from '$lib/components';
	import { logger, recentLogs } from '$stores/logger.store';
	import { PageView } from '$lib/components/views';
	import { clsx } from 'clsx';
</script>

<PageView heading="Logs" subheading="Most recent system logs">
	<Button
		label="Clear Logs"
		onclick={logger.clear}
		disabled={!$recentLogs.length}
		variant="destructive"
	/>
	{#if $recentLogs.length > 0}
		<ul class="border mt-2 py-2 font-mono text-sm">
			{#each $recentLogs as log}
				<li class={clsx(`py-2 px-4`, log.type == 'error' ? 'bg-icds-error-bg' : 'bg-gray-50')}>
					<div>
						<strong class="text-base">
							<time datetime={new Date(log.timestamp).toLocaleString()}
								>{new Date(log.timestamp).toLocaleString()}</time
							>: {log.title} ({log.type})</strong
						>

						<p class="font-mono break-words">
							{log.message}
						</p>
						{#if log.metadata}
							<SummaryDetail summaryText="Details">
								<code class="block border mt-2 bg-white p-2 w-full"
									>{JSON.stringify(log.metadata).trim()}</code
								>
							</SummaryDetail>
						{/if}
					</div>
				</li>
			{/each}
		</ul>
	{:else}
		<Alert heading="Logs Empty" message="There are currently no log entries for this session" />
	{/if}
</PageView>
