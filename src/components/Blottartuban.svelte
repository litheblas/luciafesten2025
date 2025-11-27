<script lang="ts">
	import { wait } from '$lib';
	import { render } from 'svelte/server';

	const messages = ['Att se en spelning med LiTHe Blås är som att få en käftsmäll'];

	let hovered = $state(false);
	let talking = $state(false);
	let message = $state('');

	async function drawText(text: string) {
		talking = true;
		for (let i = 0; i < text.length; i++) {
			message = text.slice(0, i + 1);
			await wait(3000 / text.length);
		}
		talking = false;
	}

	function handlePointerOver() {
		hovered = true;
		if (!talking) drawText(messages[Math.floor(Math.random() * messages.length)]);
	}

	function handlePointerOut() {
		hovered = false;
	}
</script>

<div
	onpointerover={handlePointerOver}
	onpointerout={handlePointerOut}
	class="fixed right-0 bottom-0 hidden w-72 translate-1/2 cursor-pointer text-black lg:block"
>
	<a
		class="block -rotate-45 transition {hovered && '-translate-1/5'}"
		href="https://litheblas.org/"
		target="_blank"
	>
		<img src="./blottartuban.svg" alt="" />
	</a>

	<div
		class="
    		absolute -top-4/5 -left-8/10 flex h-60 w-70 items-center bg-[url(./speechbubble.gif)] bg-contain bg-no-repeat p-4 pr-16 pb-4 opacity-0 transition-all duration-300
    		{hovered ? 'translate-0 scale-100 rotate-0 opacity-100' : 'translate-20 scale-75 rotate-15'}
        "
	>
		<p class="w-full text-center font-comic text-lg">{message}</p>
	</div>
</div>
