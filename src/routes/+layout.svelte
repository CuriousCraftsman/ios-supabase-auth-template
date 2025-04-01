<script>
	import '../app.css';

	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col">
	<main class="container mx-auto flex-1 p-4">
		{@render children()}
	</main>
</div>
