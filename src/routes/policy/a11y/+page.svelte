<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import {
		Heading,
		Link,
		List,
		ListItem,
		Paragraph as P,
		Table,
		TableBody,
		TableData,
		TableHead,
		TableHeading,
		TableRow
	} from '$lib/components';
	import { PageView } from '$lib/components/views';

	const a11yReportURL = `/ld-explorer-acr.docx`;
	const statementPrepared = '31-Jun-24';
	const statementUpdated = '12-Jul-24';
	const appLastAudited = '31-Jun-24';
</script>

<PageView heading="Accessibility Statement" subheading="LD-Explorer Accessibility Statement">
	<P>Last updated {statementUpdated}.</P>

	<Heading variant="h3" text="Table of Contents" />

	<List listType="ol">
		<ListItem><Link inPage href="#1">Overview</Link></ListItem>
		<ListItem><Link inPage href="#2">How accessible this app is</Link></ListItem>
		<ListItem>
			<Link inPage href="#3">What to do if you can't access parts of this app</Link>
		</ListItem>
		<ListItem>
			<Link inPage href="#4">Reporting accessibility problems with this app</Link>
		</ListItem>
		<ListItem><Link inPage href="#5">Enforcement Procedure</Link></ListItem>
		<ListItem><Link inPage href="#6">Contacting us</Link></ListItem>
		<ListItem>
			<Link inPage href="#7">Technical information about this app's accessibility</Link>
		</ListItem>
		<ListItem><Link inPage href="#8">Non-accessible content</Link></ListItem>
		<ListItem><Link inPage href="#9">How we tested this app</Link></ListItem>
		<ListItem><Link inPage href="#10">What we're doing to improve accessibility</Link></ListItem>
		<ListItem><Link inPage href="#11">Preparation of this Accessibility Statement</Link></ListItem>
	</List>

	<Heading variant="h3" text="1. Overview" id="1" />
	<P>
		This accessibility statement applies to LD-Explorer hosted on github pages. This app is managed
		by GCHQ. We want as many people as possible to be able to use this app. That means we've built
		the app so that you can:
	</P>

	<List listType="ul">
		<ListItem>Navigate most of the app using a keyboard.</ListItem>
		<ListItem>Use most of the app with a screen reader.</ListItem>
	</List>

	<P>
		We've also made the text in the app (including user guides) as simple as possible to understand.
	</P>
	<P>
		We've built this app with the following components from ICDS, which uses an
		accessibility-by-design philosophy to empower a diverse and inclusive intelligence community.
	</P>

	<Table>
		<TableHead>
			<TableHeading value="ICDS Component" />
			<TableHeading value="Conformance Level of component" />
		</TableHead>
		<TableBody>
			<TableRow>
				<TableData>
					<List listType="ul">
						<ListItem>Alert</ListItem>
						<ListItem>Back to top (button)</ListItem>
						<ListItem>Button</ListItem>
						<ListItem>Classification</ListItem>
						<ListItem>Banner</ListItem>
						<ListItem>Footer</ListItem>
						<ListItem>Link</ListItem>
						<ListItem>Pagination</ListItem>
						<ListItem>Section container</ListItem>
						<ListItem>Side navigation</ListItem>
						<ListItem>Switch</ListItem>
						<ListItem>Tabs</ListItem>
						<ListItem>Text field</ListItem>
						<ListItem>Tooltip</ListItem>
						<ListItem>Typography</ListItem>
					</List>
				</TableData>
				<TableData>
					Tested against WCAG 2.1 Level AA. Tested with NVDA and VoiceOver, and several different
					users with different interaction methods.
				</TableData>
			</TableRow>
		</TableBody>
	</Table>

	<Heading variant="h3" text="2. How accessible this app is" id="2" />
	<P>We are confident this app is accessible.</P>
	<Heading variant="h3" text="3. What to do if you can't access parts of this app" id="3" />
	<P>Please reach out via the Github issue boards.</P>
	<Heading variant="h3" text="4. Reporting accessibility problems with this app" id="4" />
	<P
		>We're always looking to improve the accessibility of LD-Explorer. If you find any problems not
		listed in this Statement or think we're not meeting your needs or the needs of others, consider
		raising them as Github issues.</P
	>
	<Heading variant="h3" text="5. Enforcement Procedure" id="5" />
	<P>
		The Equality and Human Rights Commission (EHRC) is responsible for enforcing the Public Sector
		Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations 2018 (the
		'accessibility regulations'). The reponsible organisation for LD Explorer is GCHQ.
	</P>

	<P>
		If you aren't satisfied with the accessibility of this app, consider contacting us using the
		details below.
	</P>

	<P>
		If you're not happy with how we respond to your complaint, contact the <Link
			href="https://www.equalityadvisoryservice.com/"
			>Equality Advisory and Support Service (EASS)
		</Link>.
	</P>
	<Heading variant="h3" text="6. Contacting us" id="6" />
	<P
		>You can contact us by raising issues directly on the Github issue board. It isn't possible to
		visit or contact us in person.</P
	>

	<Heading variant="h3" text="7. Technical information about this app's accessibility" id="7" />
	<P>
		GCHQ is committed to making its website accessible, in accordance with <Link
			href="https://www.legislation.gov.uk/uksi/2018/952/contents/made"
		>
			The Public Sector Bodies (Websites and Mobile Applications) (No. 2) Accessibility Regulations
			2018 (SI 2018/952)</Link
		>. The Intelligence Community's Digital Accessibility Policy is how GCHQ makes sure this app and
		others like it are accessible.
	</P>
	<Heading variant="h4" text="(a) Compliance status" />
	<P
		>This website is fully compliant with the <Link href="https://www.w3.org/TR/WCAG21/"
			>Web Content Accessibility Guidelines version 2.1 AA standard</Link
		>.</P
	>
	<Heading variant="h3" text="8. Non-accessible content" id="8" />
	<P>The content listed below is non-accessible for the following reasons.</P>
	<Heading variant="h4" text="(a) Non-compliance with the accessibility regulations " />
	<P>We believe this application is compliant with accessibility regulations.</P>
	<Heading variant="h4" text="(b) Disproportionate burden" />
	<P
		>We aren't claiming a disproportionate burden to making any part of LD-Explorer compliant to
		accessibility regulations.
	</P>

	<Heading
		variant="h4"
		text="(c) Content that's not within the scope of the accessibility regulations."
	/>
	<P>We do not believe that the application contains non-accessible content.</P>

	<Heading variant="h3" text="9. How we tested this app" id="9" />
	<P
		>This app was tested between April and May 2024 by GCHQ. The testing approach is documented in
		<Link href={a11yReportURL}>the Accessibility Conformance Report</Link>. The app was and is
		currently being tested for compliance with the Web Content Accessibility Guidelines version 2.1
		level A and level AA success criteria. These tests have been carried out by an internal member
		of GCHQ staff.</P
	>
	<Heading variant="h3" text="10. What we're doing to improve accessibility" id="10" />
	<P
		>We will treat accessibility problems as bugs, fully test any significant changes made to the UI
		and perform full accessibility audits yearly.</P
	>
	<Heading variant="h3" text="11. Preparation of this Accessibility Statement" id="11" />
	<P
		>This statement was prepared on {statementPrepared}. It was last updated on {statementUpdated}.
		This app was last audited for a11y issues on {appLastAudited}. The test was carried out by a
		member of GCHQ staff. You can read the
		<Link href={a11yReportURL}>Accessibility Conformance Report</Link>.</P
	>
</PageView>
