<script lang="ts">
	import type { Snippet } from 'svelte';

	type ImageAndTextProps = {
		src: string;
		alt: string;
		children?: Snippet;
		dir?: 'ltr' | 'rtl';
	};

	const { src, alt, children, dir = 'ltr' }: ImageAndTextProps = $props();
</script>

<div
	class="
        container mx-auto flex gap-x-9 gap-y-3 px-6 py-12 md:max-w-6xl
        {dir === 'ltr' ? 'flex-col-reverse md:flex-row' : 'flex-col-reverse md:flex-row-reverse'}
    "
>
	<img
		{src}
		{alt}
		class="aspect-5/4 w-full rounded-lg bg-slate-700 bg-linear-60 object-cover p-4 shadow-[0_16px_0px] shadow-slate-800 md:aspect-square md:max-w-xs lg:aspect-5/4 lg:max-w-sm"
	/>
	<div class="flex-1 p-4">{@render children?.()}</div>
</div>
