<script lang="ts">
	import { type Snippet } from 'svelte';
	import Space from './Space.svelte';

	type HeroProps = {
		buttons?: Snippet;
	};

	const { buttons }: HeroProps = $props();
</script>

<div class="relative h-[calc(100vh-6rem)] w-full">
	<Space />
	<div
		class="pointer-events-none absolute top-[50vh] left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 text-center font-display drop-shadow-2xl"
	>
		<h1 class="text-[calc(1rem+8vw)]/[1]">
			<p class="hidden">LUCIAFESTEN IN SPACE</p>

			<img style="width: 70vw; max-width: 1000px;" src="titel.webp" alt="LUCIAFESTEN - IN SPACE" />
			<div class="mt-10 flex items-center justify-center md:-mt-16">
				<div
					class="pointer-events-auto flex w-full max-w-60 flex-col justify-center gap-5 sm:max-w-none sm:flex-row sm:gap-3"
				>
					{@render buttons?.()}
				</div>
			</div>
		</h1>
	</div>
	<div
		class="pointer-events-none absolute bottom-0 h-[calc(20vh)] w-full bg-linear-180 from-rouge-800/0 to-rouge-800"
	></div>
</div>
