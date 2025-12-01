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
		type="primary"
	>
		Facebook-event
	</Button>

	<Button
		href="https://go.orbiapp.io/BE2nvOg6mYb"
		target="_blank"
		class="pointer-events-auto w-full sm:w-max"
		icon="bxs:rocket"
		type="primary"
	>
		Biljetter
	</Button>
{/snippet}

{#snippet kladkodButtons()}
	<Button
		href="https://fb.me/e/3KcG9aF2U"
		target="_blank"
		class="pointer-events-auto w-full sm:w-max"
		icon="bxl:facebook"
	>
		Dela på Facebook
	</Button>
{/snippet}

{#snippet luciatagButtons()}
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
		<LiTHeBlas /> fyller Kårallen med liveband, karaoke och Kul Små Grejer!
	</p>
</CenterText>

<video class="mx-auto w-full max-w-lg px-6" autoplay muted loop src="star.webm" />

<Cards
	cards={[
		{
			title: 'Livemusik av- och med LiU-studenter!',
			description: 'På scen har vi D-band, LiTHe Blås, Synkopter och en hemlig överraskning...',
			image: 'band.jpg'
		},
		{
			title: 'Karaoke med livebandet Harakiri!',
			description:
				'Sjung (eller skråla) med till dina favoriter bland schlagerdängor, dansgolvshits och, såklart, julklassikerna!',
			image: 'harakiri-3.jpg'
		},
		{
			title: 'Knasiga tema-barer och Kul Små Grejer!',
			description:
				'Vi kommer ha inte mindre än tre barer, varav en är på 3e våningen, dessutom är festen strösslad med andra överraskningar och roliga påhitt. ',
			image: 'ksg.jpg'
		}
	]}
/>

<Tree />

<video
	class="mx-auto mb-8 w-full max-w-md px-6 sm:mb-20"
	autoplay
	muted
	loop
	src="rocketman.webm"
/>

<ImageAndText src="kladkod.jpg" alt="" buttons={kladkodButtons}>
	<h2 class="mb-2 font-display text-3xl font-semibold">Klädkod: Rymdig eller rosa!</h2>
	<p class="text-lg">
		Lämna Ovven hemma—på Luciafesten ska vi ut i galaxen och upptäcka julstjärnorna på nära håll.
		Kom i dina rymdigaste och/eller rosaste kläder!
	</p>
</ImageAndText>

<Divider class="max-w-6xl" />

<ImageAndText dir="rtl" src="luciatag.jpg" alt="" buttons={luciatagButtons}>
	<h2 class="mb-2 font-display text-3xl font-semibold">
		Vad vore en orkester utan dess balett? Vad vore Lucia utan hennes tåg? 🚂
	</h2>
	<p class="text-lg">
		På Luciafesten får du uppleva ett sjudundrades Luciatåg utan dess like. Ingenstans i det kända
		universum hittar du ett tåg som detta!
	</p>
</ImageAndText>

<img
	src="julslinga.webp"
	class="mx-auto w-full max-w-7xl mask-radial-[70%_70%] mask-radial-from-20% mask-radial-at-center px-6 md:my-20"
	alt=""
/>
