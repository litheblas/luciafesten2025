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
		shadow-[0_8px_0] transition hover:-translate-y-1 hover:shadow-[0_12px_0] active:translate-y-1
		active:shadow-[0_4px_0] lg:text-base
	`;

	const typeClasses = {
		primary:
			'hover:text-orange-800 bg-orange-400 text-orange-900 shadow-amber-800 hover:bg-orange-300',
		secondary:
			'bg-gradient text-seccondary brighten-on-hover' // Fanns inte några färger som matchar vårt tema i tailwind
	} as const;
</script>

{#snippet buttonContent()}
	{#if icon}
		<iconify-icon class="w-5 lg:w-6" {icon}></iconify-icon>
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
