<script lang="ts">
	import Blottartuban from '../../components/Blottartuban.svelte';
	import Footer from '../../components/Footer.svelte';
	import Navbar from '../../components/Navbar.svelte';

	let { children } = $props();
</script>

<Navbar />
{@render children()}
<Footer />
<Blottartuban />
