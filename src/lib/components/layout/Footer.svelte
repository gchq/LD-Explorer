<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { base } from '$app/paths';
	import { footerNavItems } from '$lib/navigation';
</script>

<ic-footer
	description="LD-Explorer is a prototype project developed and maintained by GCHQ."
	caption="All content is available under the Open Government Licence v3.0, except source code and code examples which are available under the Apache 2 Licence."
>
	{#each footerNavItems as { href, title }}
		<ic-footer-link
			class="pr-10"
			slot="link"
			href={href.toString().startsWith('http') ? href : `${base}${href}`}>{title}</ic-footer-link
		>
	{/each}
</ic-footer>
