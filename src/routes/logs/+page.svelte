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
		<ul class="border border-black mt-2 font-mono text-sm dark:border-gray-600">
			{#each $recentLogs as log (log.timestamp)}
				<li
					class={clsx(
						`py-2 px-4`,
						log.type == 'error' ? 'bg-icds-error-bg' : 'bg-gray-50 dark:bg-gray-800'
					)}
				>
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
								<code
									data-testid="log-details"
									class="block border border-black mt-2 bg-icds-background-primary p-2 w-full dark:border-gray-600"
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
