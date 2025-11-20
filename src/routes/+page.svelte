<script>
	import Cards from '../components/Cards.svelte';
	import CenterText from '../components/CenterText.svelte';
	import Hero from '../components/Hero.svelte';
</script>

<Hero />
<CenterText>
	<p>En lite annorlunda fest är tillbaka i jul igen,</p>
	<p>
		<span class="font-logo text-[#e8e868]">LiTHe Blås</span> fyller Kårallen med liveband, karaoke och
		Kul Små Grejer™!
	</p>
</CenterText>

<img class="mx-auto w-lg" src="/shooting-star.gif" alt="" />

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
				'På hemliga platser i Kårallens dunkel hittar du roliga upplevelser som vårat manickdepartement Kul Små Grejer™ knopat ihop.',
			image: '/ksg.jpg'
		}
	]}
/>
