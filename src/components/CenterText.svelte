<script lang="ts">
	import type { Snippet } from 'svelte';

	type CenterTextProps = {
		children?: Snippet;
	};

	const { children }: CenterTextProps = $props();
</script>

<div class="container mx-auto max-w-md py-12 text-center font-display text-2xl">
	{@render children?.()}
</div>
