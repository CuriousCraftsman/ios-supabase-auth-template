<script>
	import '../app.css';

	import Navbar from '$lib/components/Navbar.svelte';

	let { children } = $props();
</script>

<Navbar />
<div class="flex min-h-screen flex-col">
	<main class="container mx-auto flex-1 p-4">
		{@render children()}
	</main>
</div>
