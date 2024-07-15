<!-- (c) Crown Copyright GCHQ -->

<script lang="ts">
	import { Heading, List, ListItem, Paragraph as P } from '$lib/components';
	import { PageView } from '$lib/components/views';
</script>

<PageView
	heading="Cookie Policy"
	subheading="Information relating to the use of cookies in LD-Explorer"
>
	<P>
		Cookies are bits of information stored on your device that contain an identifier (usually a
		string of letters and numbers) when you access a website. When you visit the same website again,
		the cookies stored on your device are accessed by code on the website. This means that the
		website can recognise the device being used and provide useful features, such as remembering
		your preferences or keeping you logged in.
	</P>

	<P
		>Cookies that are set by the website owner are called 'first party cookies'. Cookies that are
		set by another platform or service are called 'third party cookies'. These tend to be used for
		additional services, such as advertising or analytics.</P
	>

	<P
		>This web application does not make use of cookies directly, however it does use a cookie-like
		feature within the browser called "local storage". The below list summarises LD Explorer's use
		of cookies and cookie-like features.
	</P>

	<Heading variant="h3" text="Essential Cookies" />
	<P
		>Essential cookies are necessary to allow the the application to function correctly. LD Explorer
		includes essential cookies for the following features:</P
	>
	<List listType="ul">
		<ListItem>Storing user preferences/settings.</ListItem>
		<ListItem>Storing any custom prefixes the user may have created.</ListItem>
	</List>

	<P
		>These will only persist in the browser you are using to view the application. If you do not
		agree to this data being stored locally in your browser, please do not use this application.</P
	>

	<Heading variant="h3" text="Non-Essential Cookies" />
	<P
		>Non-essential cookies tend to include advertising trackers or analytics to help improve the
		user experience of a website. Whilst these cookies may be useful to applicaiton developers, they
		are not essential for the use of the application.
	</P>
	<P>LD Explorer does not include any non-essential cookies.</P>
</PageView>
