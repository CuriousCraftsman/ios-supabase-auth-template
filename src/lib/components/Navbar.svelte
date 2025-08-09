<script>
	import { auth } from '$lib/stores/auth.svelte.js';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import ThemeToggle from './ThemeToggle.svelte';

	let mobileMenuOpen = $state(false);

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	async function handleSignOut() {
		await auth.signOut();
		goto('/');
	}

	// Close mobile menu when clicking outside
	onMount(() => {
		function handleClickOutside(event) {
			if (mobileMenuOpen && !event.target.closest('nav')) {
				mobileMenuOpen = false;
			}
		}

		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	});
</script>

<nav class="fixed left-0 right-0 z-50 border-b bg-background px-4 py-2.5 shadow-sm" style="top: env(safe-area-inset-top, 0px);">
	<div class="flex flex-wrap items-center justify-between">
		<!-- Brand/Logo - serves as Home link (left) -->
		<a href="/" class="flex items-center">
			<span class="self-center whitespace-nowrap text-xl font-semibold text-foreground">Home</span>
		</a>

		<!-- Mobile menu button -->
		<button
			type="button"
			class="ml-3 inline-flex items-center rounded-lg p-2 text-muted-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring md:hidden"
			onclick={toggleMobileMenu}
		>
			<span class="sr-only">Open main menu</span>
			<svg
				class="h-6 w-6"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fill-rule="evenodd"
					d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
					clip-rule="evenodd"
				></path>
			</svg>
		</button>

		<!-- Desktop Navigation -->
		<div class="hidden md:flex md:flex-1 md:items-center md:justify-center">
			<!-- Centered Navigation Link -->
			<ul class="flex flex-row space-x-8 text-sm font-medium">
				<li>
					<a
						href="/protected/dashboard"
						class="py-2 text-foreground hover:text-primary"
						>Dashboard</a
					>
				</li>
			</ul>
		</div>

		<!-- Right-aligned Auth Links (Desktop) -->
		<div class="hidden space-x-4 md:flex md:items-center">
			<ThemeToggle />
			{#if !auth.isAuthenticated}
				<a
					href="/sign-in"
					class="px-3 py-2 text-sm font-medium text-foreground hover:text-primary"
					>Sign In</a
				>
				<a
					href="/register"
					class="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:ring-4 focus:ring-ring"
					>Sign Up</a
				>
			{:else}
				<span class="text-sm text-muted-foreground">
					{auth.user?.email}
				</span>
				<button
					type="button"
					onclick={handleSignOut}
					class="px-3 py-2 text-sm font-medium text-foreground hover:text-primary"
					>Sign Out</button
				>
			{/if}
		</div>

		<!-- Mobile Navigation Menu -->
		<div class="{mobileMenuOpen ? 'block' : 'hidden'} w-full md:hidden" id="mobile-menu">
			<ul class="mt-4 flex flex-col space-y-2 font-medium">
				<li class="flex justify-center py-2">
					<ThemeToggle />
				</li>
				{#if !auth.isAuthenticated}
					<li>
						<a
							href="/sign-in"
							class="block border-b py-2 pl-3 pr-4 text-foreground hover:bg-accent"
							onclick={closeMobileMenu}
							>Sign In</a
						>
					</li>
					<li>
						<a
							href="/register"
							class="block border-b py-2 pl-3 pr-4 text-foreground hover:bg-accent"
							onclick={closeMobileMenu}
							>Sign Up</a
						>
					</li>
				{:else}
					<li>
						<a
							href="/protected/dashboard"
							class="block border-b py-2 pl-3 pr-4 text-foreground hover:bg-accent"
							onclick={closeMobileMenu}
							>Dashboard</a
						>
					</li>
					<li>
						<button
							type="button"
							class="w-full text-left border-b py-2 pl-3 pr-4 text-foreground hover:bg-accent"
							onclick={() => { handleSignOut(); closeMobileMenu(); }}
							>Sign Out</button
						>
					</li>
				{/if}
			</ul>
		</div>
	</div>
</nav>
