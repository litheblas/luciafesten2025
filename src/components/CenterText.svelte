<script lang="ts">
	import type { Snippet } from 'svelte';

	type CenterTextProps = {
		children?: Snippet;
	};

	const { children }: CenterTextProps = $props();
</script>

<div class="container mx-auto max-w-xl px-6 py-12 text-center font-display text-2xl">
	{@render children?.()}
</div>
