<script lang="ts">
	import 'iconify-icon';
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '../components/Navbar.svelte';
	import Footer from '../components/Footer.svelte';
	import Blottartuban from '../components/Blottartuban.svelte';
	import Cursor, { cursorTypes } from '../components/Cursor.svelte';
	import { onMount } from 'svelte';

	let { children } = $props();

	let showCursor = $state(false);
	onMount(() => {
		showCursor = matchMedia('(pointer:fine)').matches;
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
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
