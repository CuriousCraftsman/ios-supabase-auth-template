<script>
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import { initializeCapacitor } from '$lib/capacitor.js';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		initializeCapacitor();
	});
</script>

<div class="flex min-h-screen flex-col">
	<Navbar />
	<!-- Add top padding to account for fixed navbar + iOS status bar -->
	<main class="container mx-auto flex-1 p-4" style="padding-top: calc(4.375rem + env(safe-area-inset-top, 0px));">
		{@render children()}
	</main>
</div>
