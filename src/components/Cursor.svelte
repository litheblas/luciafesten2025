<script lang="ts" module>
	export const cursorTypes = ['default', 'active'] as const;
	export type CursorType = (typeof cursorTypes)[number];
</script>

<script lang="ts">
	import { wait } from '$lib';
	import { onMount } from 'svelte';

	let x = $state(-999);
	let y = $state(-999);
	let type: CursorType = $state('default');
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

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseover', handleMouseOver);
			window.removeEventListener('mouseout', handleMouseOut);
			window.removeEventListener('click', handleClick);
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
	src="cursor_{type}.gif"
	alt=""
/>

<style>
	:global(.no-cursor, .no-cursor *) {
		cursor: none !important;
	}
</style>
