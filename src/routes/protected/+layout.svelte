<script>
	import { auth } from '$lib/stores/auth.svelte.js';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let { data, children } = $props();

	onMount(() => {
		if (!auth.loading && !auth.isAuthenticated) {
			goto('/sign-in');
		}
	});

	// Watch for auth changes and redirect if user logs out
	$effect(() => {
		if (!auth.loading && !auth.isAuthenticated) {
			goto('/sign-in');
		}
	});
</script>

{#if auth.loading}
	<div class="flex items-center justify-center min-h-screen">
		<div class="text-lg">Loading...</div>
	</div>
{:else if auth.isAuthenticated}
	{@render children()}
{:else}
	<div class="flex items-center justify-center min-h-screen">
		<div class="text-lg">Redirecting...</div>
	</div>
{/if}
