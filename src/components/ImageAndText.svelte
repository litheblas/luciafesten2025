<script lang="ts">
	import type { Snippet } from 'svelte';

	type ImageAndTextProps = {
		src: string;
		alt: string;
		children?: Snippet;
		buttons?: Snippet;
		dir?: 'ltr' | 'rtl';
	};

	const { src, alt, children, dir = 'ltr', buttons }: ImageAndTextProps = $props();
</script>

<div
	class="
        container mx-auto flex items-center gap-x-9 gap-y-3 px-6 py-12 md:max-w-6xl
        {dir === 'ltr' ? 'flex-col-reverse md:flex-row' : 'flex-col-reverse md:flex-row-reverse'}
    "
>
	<img
		{src}
		{alt}
		class="aspect-5/4 w-full rounded-lg bg-gradient bg-linear-60 object-cover p-4 shadow-[0_16px_0px] text-seccondary md:aspect-square md:max-w-xs lg:aspect-5/4 lg:max-w-sm"
	/>
	<div class="flex flex-1 flex-col gap-3 p-4 md:gap-6">
		<div>
			{@render children?.()}
		</div>
		<div class="flex flex-wrap gap-3">
			{@render buttons?.()}
		</div>
	</div>
</div>
