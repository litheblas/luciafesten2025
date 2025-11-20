<script lang="ts">
	import type { Snippet } from 'svelte';

	type ButtonProps = {
		type?: 'primary' | 'secondary';
		icon?: string;
		class?: string;
		children?: Snippet;
	};

	const { children, icon, class: clazz, type = 'secondary' }: ButtonProps = $props();
</script>

<button
	class="
	    {clazz}
	    flex items-center gap-1.5 rounded p-3 font-display text-sm font-semibold tracking-wider uppercase shadow-[0_8px_0] transition hover:-translate-y-1 hover:shadow-[0_12px_0] active:translate-y-1 active:shadow-[0_4px_0] lg:text-base
		{type === 'primary'
		? 'hover:text-orage-800 bg-orange-400 text-orange-900 shadow-amber-800 hover:bg-orange-300'
		: 'bg-slate-700 text-slate-300 shadow-slate-800 hover:bg-slate-600 hover:text-slate-200'}
	"
>
	{#if icon != null}
		<iconify-icon class="w-5 lg:w-6" {icon}></iconify-icon>
	{/if}
	{@render children?.()}
</button>
