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
	<Button class="pointer-events-auto" icon="bxl:facebook">Dela på Facebook</Button>
	<Button class="pointer-events-auto" icon="bxs:rocket">Biljetter</Button>
{/snippet}

<Hero buttons={heroButtons} />
<CenterText>
	<p>
		I rymden kan ingen höra dig spela… En lite annorlunda fest är tillbaka i jul igen,
		<LiTHeBlas /> fyller Kårallen med liveband, karaoke och Kul Små Grejer™!
	</p>
</CenterText>

<img class="mx-auto w-full max-w-lg" src="/shooting-star.gif" alt="" />

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

<ImageAndText src="/kladkod.jpg" alt="">
	<h2 class="mb-2 font-display text-3xl font-semibold">Klädkod? Ja tack!</h2>
	<p class="text-lg">Lämna Ovven hemma, på Luciafesten är det fint eller finurligt som gäller.</p>
</ImageAndText>

<Divider class="max-w-6xl" />

<ImageAndText dir="rtl" src="/gran.gif" alt="">
	<h2 class="mb-2 font-display text-3xl font-semibold">Men blir det något luciatåg?</h2>
	<p class="text-lg">Självklart! <LiTHeBlas /> fixar universums prydligaste tåg.</p>
</ImageAndText>
