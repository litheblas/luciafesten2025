<script lang="ts">
	type Card = {
		title: string;
		description: string;
		image: string;
	};

	type CardsProps = {
		cards: Card[];
	};

	const { cards }: CardsProps = $props();
</script>

<div class="container mx-auto flex flex-wrap items-end justify-center px-6 py-12">
	{#each cards as card}
		<div class="h-full w-full py-6 md:w-1/2 md:p-3 xl:w-1/3">
			<div class="flex w-full flex-col rounded-lg">
				<div class="justify-self-end py-3">
					<h3 class="font-display text-lg font-medium">{card.title}</h3>
					<p class="opacity-60">{card.description}</p>
				</div>
				<div class="rounded-lg bg-gradient bg-linear-60 p-4 shadow-[0_16px_0px] text-seccondary">
					<img class="aspect-9/10 h-full w-full rounded object-cover" src={card.image} alt="" />
				</div>
			</div>
		</div>
	{/each}
</div>
