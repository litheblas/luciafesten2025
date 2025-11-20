<script lang="ts">
	import 'iconify-icon';
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '../components/Navbar.svelte';
	import Footer from '../components/Footer.svelte';
	import Blottartuban from '../components/Blottartuban.svelte';
	import Cursor from '../components/Cursor.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navbar />
{@render children()}
<Footer />
<Blottartuban />
<Cursor />
