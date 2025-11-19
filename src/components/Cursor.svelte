<script lang="ts">
	import { wait } from '$lib';
	import { onMount } from 'svelte';

	let x = $state(-999);
	let y = $state(-999);
	let type = $state('default');
	let show = $state(true);

	$effect(() => {
		document.body.classList.toggle('no-cursor', show);
	});

	function handleMouseMove(evt: MouseEvent) {
		x = evt.clientX;
		y = evt.clientY;
	}

	async function handleClick() {
		type = 'active';
		await wait(220);
		type = 'default';
	}

	async function handleTouch(evt: TouchEvent) {
		x = evt.changedTouches[0].clientX;
		y = evt.changedTouches[0].clientY;
		show = true;
		type = 'active';
		await wait(220);
		type = 'default';
		await wait(220);
		show = false;
	}

	function handleMouseOver() {
		show = true;
	}

	function handleMouseOut() {
		show = false;
	}

	onMount(() => {
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseover', handleMouseOver);
		window.addEventListener('mouseout', handleMouseOut);
		window.addEventListener('click', handleClick);
		window.addEventListener('touchend', handleTouch);

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseover', handleMouseOver);
			window.removeEventListener('mouseout', handleMouseOut);
			window.removeEventListener('click', handleClick);
			window.removeEventListener('touchend', handleTouch);
		};
	});
</script>

<img
	class="
	    pointer-events-none fixed z-10 aspect-square -translate-1/2 bg-contain bg-center
		{show ? 'block' : 'hidden'}
		{type === 'active' ? 'w-16' : 'w-12'}
	"
	style="left: {x}px; top: {y}px"
	src="/cursor_{type}.gif"
	alt=""
/>

<style>
	:global(.no-cursor, .no-cursor *) {
		cursor: none !important;
	}
</style>
