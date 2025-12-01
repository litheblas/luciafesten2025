<script lang="ts">
	import type { Snippet } from 'svelte';

	type ButtonProps = {
		type?: 'primary' | 'secondary';
		icon?: string;
		class?: string;
		href?: string;
		target?: string;
		children?: Snippet;
	};

	const { children, icon, href, target, class: clazz, type = 'secondary' }: ButtonProps = $props();

	const buttonClass = `
	    flex justify-center items-center gap-1.5 rounded p-3 font-display text-sm font-semibold tracking-wider uppercase
		transition hover:-translate-y-1 active:translate-y-1 lg:text-base
	`;

	const typeClasses = {
		primary:
			'shadow-[0_20px_0] hover:shadow-[0_24px_0] active:shadow-[0_16px_0] bg-linear-to-b from-gold-100 to-wine-400 brightness-110 text-wine-800 shadow-wine-500 hover:brightness-125',
		secondary:
			'shadow-[0_8px_0] hover:shadow-[0_12px_0] active:shadow-[0_4px_0] bg-linear-to-b from-gold-100 from-[-150%] brightness-110 to-wine-400 text-wine-800 shadow-wine-600 hover:brightness-125'
	} as const;
</script>

{#snippet buttonContent()}
	{#if icon}
		<iconify-icon class="bg-linear-to w-5 lg:w-6" {icon}></iconify-icon>
	{/if}
	{@render children?.()}
{/snippet}

{#if href}
	<a {href} {target} class="{clazz} {buttonClass} {typeClasses[type]}">
		{@render buttonContent()}
	</a>
{:else}
	<button class="{clazz} {buttonClass} {typeClasses[type]}">
		{@render buttonContent()}
	</button>
{/if}
