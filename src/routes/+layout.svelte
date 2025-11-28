<script lang="ts">
	import 'iconify-icon';
	import '../app.css';
	import favicon256 from '$lib/assets/favicon-256.png';
	import favicon128 from '$lib/assets/favicon-128.png';
	import Navbar from '../components/Navbar.svelte';
	import Footer from '../components/Footer.svelte';
	import Blottartuban from '../components/Blottartuban.svelte';
	import Cursor, { cursorTypes } from '../components/Cursor.svelte';
	import { onMount } from 'svelte';

	let { children } = $props();

	const title = 'LiTHe Blås presenterar Luciafesten 2025: Luciafesten IN SPACE';
	const description =
		'I rymden kan ingen höra dig spela… En lite annorlunda fest är tillbaka i jul igen, LiTHe Blås fyller Kårallen med liveband, karaoke och Kul Små Grejer™!';
	const url = new URL('https://luciafesten.litheblas.org');
	const image = `${url}/banner.webp`;

	let showCursor = $state(false);
	onMount(() => {
		showCursor = matchMedia('(pointer:fine)').matches;
	});
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<!-- Facebook Meta Tags -->
	<meta property="og:url" content={url.href} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />

	<!-- Twitter Meta Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content={url.pathname} />
	<meta property="twitter:url" content={url.href} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />

	<link rel="icon" href={favicon128} type="image/png" sizes="128x128" />
	<link rel="icon" href={favicon256} type="image/png" sizes="256x256" />
	<link rel="apple-touch-icon" href={favicon256} />

	{#each cursorTypes as type}
		<link rel="preload" href="cursor_{type}.gif" as="image" media="(pointer:fine)" />
	{/each}
</svelte:head>

<Navbar />
{@render children()}
<Footer />
<Blottartuban />

{#if showCursor}
	<Cursor />
{/if}
