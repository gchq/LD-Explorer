<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { footerNavItems } from '$lib/navigation';
</script>

<ic-footer
	description="LD-Explorer is a prototype project developed and maintained by GCHQ."
	caption="All content is available under the Open Government Licence v3.0, except source code and code examples which are available under the Apache 2 Licence."
>
	{#each footerNavItems as { href, title, id, external } (id)}
		<ic-footer-link
			{href}
			class="pr-10"
			slot="link"
			target={external ? '_blank' : undefined}
			rel={external ? 'noreferrer' : undefined}
			referrerpolicy={external ? 'no-referrer' : undefined}>{title}</ic-footer-link
		>
	{/each}
</ic-footer>
