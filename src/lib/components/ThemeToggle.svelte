<script>
	import { themeStore } from '$lib/stores/theme.svelte.js';
	import { Button } from '$lib/components/ui/button';
</script>

<Button
	variant="ghost"
	size="sm"
	class="h-9 w-9 px-0"
	onclick={() => themeStore.toggle()}
>
	{#if themeStore.isDark}
		<!-- Sun icon for light mode -->
		<svg
			class="h-4 w-4"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			stroke-width="2"
		>
			<circle cx="12" cy="12" r="5" />
			<path
				d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
			/>
		</svg>
		<span class="sr-only">Switch to light mode</span>
	{:else}
		<!-- Moon icon for dark mode -->
		<svg
			class="h-4 w-4"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			stroke-width="2"
		>
			<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
		</svg>
		<span class="sr-only">Switch to dark mode</span>
	{/if}
</Button>