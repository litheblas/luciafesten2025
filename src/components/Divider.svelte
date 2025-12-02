<script lang="ts">
	type DividerProps = {
		class?: string;
	};

	const { class: clazz = '' }: DividerProps = $props();
</script>

<div class="container mx-auto h-0.5 px-8 sm:px-6 {clazz}">
	<hr class="h-full w-full border-none bg-gold-100" />
</div>
