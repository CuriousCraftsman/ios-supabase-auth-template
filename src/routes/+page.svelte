<script>
	import { auth } from '$lib/stores/auth.svelte.js';
	import { Button } from '$lib/components/ui/button';
</script>

<div class="flex min-h-screen items-center justify-center">
	<div class="text-center max-w-md">
		<h1 class="text-4xl font-bold mb-4 text-foreground">Welcome to AuthMe</h1>
		<p class="text-muted-foreground mb-8">A mobile-ready authentication template built with SvelteKit and Supabase</p>
		
		{#if !auth.isAuthenticated}
			<div class="space-x-4">
				<Button href="/sign-in" variant="outline">Sign In</Button>
				<Button href="/register">Get Started</Button>
			</div>
		{:else}
			<div class="space-y-4">
				<p class="text-muted-foreground">Welcome back, {auth.user?.email}!</p>
				<Button href="/protected/dashboard">Go to Dashboard</Button>
			</div>
		{/if}
	</div>
</div>
