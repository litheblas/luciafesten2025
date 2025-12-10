<script lang="ts">
	import { wait } from '$lib';
	import { render } from 'svelte/server';

	const messages = [
		'Att se en spelning med LiTHe Blås är som att få en käftsmäll',
		'Vissste duatt LiTHe Blås speller hellre än bra?',
		'Jag dricker bara när jag är full.',
		'KUKEN! ÖJ!',
		'|: supa och dö :|',
		'Vilken bokstav är P?',
		'Det är utsidan som räknas.',
		'De säger att det är så farligt med alkohol, det är bättre med kokain.',
		'Visste du att solskyddskräm inte hjälper om du skulle ställa dig på solens yta?',
		'Visste du att du inte kan sticka fingret i ett svart hål och komma undan?',
		'Visste du att du inte kan andas i rymden, inte ens med snorkel?',
    'Årets julklapp är vuxenleksaken, men med en burk läsk kan man göra mycket!'
	];

	let talking = $state(false);
	let message = $state('');

	async function drawText(text: string) {
		talking = true;
		for (let i = 0; i < text.length; i++) {
			message = text.slice(0, i + 1);
			await wait(Math.min(100, 3000 / text.length));
		}
		await wait(1000);
		talking = false;
	}

	function handleClick() {
		if (!talking) drawText(messages[Math.floor(Math.random() * messages.length)]);
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
	onclick={handleClick}
	class="fixed right-0 bottom-0 hidden w-72 translate-1/2 cursor-pointer text-black lg:block"
>
	<img
		class="block -rotate-45 transition {talking ? '-translate-1/5' : 'hover:-translate-4'}"
		src="blottartuban.svg"
		alt=""
	/>

	<div
		class="
    		absolute -top-4/5 -left-8/10 flex h-50 w-60 items-center bg-contain bg-no-repeat p-6 pt-12 opacity-0 transition-all duration-300
    		{talking ? 'translate-0 scale-100 rotate-0 opacity-100' : 'translate-20 scale-75 rotate-15'}
        "
	>
		<p class="w-full text-center font-comic text-lg">{message}</p>
		<img src="speechbubble.gif" alt="" class="absolute inset-0 -z-10" />
	</div>
</div>
