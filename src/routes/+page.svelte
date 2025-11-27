<script>
	import Button from '../components/Button.svelte';
	import Cards from '../components/Cards.svelte';
	import CenterText from '../components/CenterText.svelte';
	import Divider from '../components/Divider.svelte';
	import Hero from '../components/Hero.svelte';
	import ImageAndText from '../components/ImageAndText.svelte';
	import LiTHeBlas from '../components/LiTHeBlas.svelte';
	import Tree from '../components/Tree.svelte';
</script>

{#snippet heroButtons()}
	<Button
		href="https://fb.me/e/3KcG9aF2U"
		target="_blank"
		class="pointer-events-auto w-full sm:w-max"
		icon="bxl:facebook"
	>
		Dela på Facebook
	</Button>

	<Button
		href="https://go.orbiapp.io/BE2nvOg6mYb"
		target="_blank"
		class="pointer-events-auto w-full sm:w-max"
		icon="bxs:rocket"
	>
		Biljetter
	</Button>
{/snippet}

<Hero buttons={heroButtons} />
<CenterText>
	<p>
		I rymden kan ingen höra dig spela… En lite annorlunda fest är tillbaka i jul igen,
		<LiTHeBlas /> fyller Kårallen med liveband, karaoke och Kul Små Grejer™!
	</p>
</CenterText>

<video class="mx-auto w-full max-w-lg px-6" autoplay muted loop src="/star.webm" />

<Cards
	cards={[
		{
			title: 'Ett hus fyllt med musik',
			description:
				'Vi har fyllt Kårallen till bristningsgränsen med goda vibrationer, inte mindre än TRE band spelar under kvällen!',
			image: '/band.jpg'
		},
		{
			title: 'Livekaraoke',
			description: 'Luciafestens husband Harakiri uppträder med dig i rampljuset.',
			image: '/harakiri-2.jpg'
		},
		{
			title: 'Kul Små Grejer™',
			description:
				'På hemliga platser i Kårallens dunkel hittar du roliga upplevelser som vårt manickdepartement Kul Små Grejer™ knopat ihop.',
			image: '/ksg.jpg'
		}
	]}
/>

<Tree />

<video class="mx-auto mb-20 w-full max-w-md px-6" autoplay muted loop src="/rocketman.webm" />

<ImageAndText src="/kladkod.jpg" alt="">
	<h2 class="mb-2 font-display text-3xl font-semibold">Klädkod? Ja tack!</h2>
	<p class="text-lg">Lämna Ovven hemma, på Luciafesten är det fint eller finurligt som gäller.</p>
</ImageAndText>

<Divider class="max-w-6xl" />

<ImageAndText dir="rtl" src="/luciatag.jpg" alt="">
	<h2 class="mb-2 font-display text-3xl font-semibold">Men blir det något tåg på Lucia?</h2>
	<p class="text-lg">Självklart! <LiTHeBlas /> fixar universums prydligaste tåg.</p>
</ImageAndText>

<img
	src="/julslinga.webp"
	class="mx-auto w-full max-w-7xl mask-radial-[70%_70%] mask-radial-from-20% mask-radial-at-center px-6 md:my-20"
	alt=""
/>
