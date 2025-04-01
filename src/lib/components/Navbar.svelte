<script>
	import { authClient } from '$lib/client/auth-client';
	import { goto } from '$app/navigation';

	const session = authClient.useSession();

	console.log('session', $session);

	let { data } = $props();

	let mobileMenuOpen = $state(false);

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}
</script>

<nav class="border-b border-gray-200 bg-white px-4 py-2.5 dark:border-gray-700 dark:bg-gray-800">
	<div class="flex flex-wrap items-center justify-between">
		<!-- Brand/Logo - serves as Home link (left) -->
		<a href="/" class="flex items-center">
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Home</span>
		</a>

		<!-- Mobile menu button -->
		<button
			onclick={toggleMobileMenu}
			type="button"
			class="ml-3 inline-flex items-center rounded-lg p-2 text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
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
						href="/dashboard"
						class="py-2 text-gray-700 hover:text-blue-700 dark:text-gray-400 dark:hover:text-white"
						>Dashboard</a
					>
				</li>
			</ul>
		</div>

		<!-- Right-aligned Auth Links (Desktop) -->
		<div class="hidden space-x-4 md:flex md:items-center">
			{#if !$session.data?.user}
				<a
					href="/sign-in"
					class="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-700 dark:text-gray-400 dark:hover:text-white"
					>Sign In</a
				>
				<a
					href="/register"
					class="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>Sign Up</a
				>
			{/if}

			{#if $session.data?.user}
				<button
					onclick={async () => {
						await authClient.signOut();
						goto('/');
					}}
					class="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-700 dark:text-gray-400 dark:hover:text-white"
					>Sign Out</button
				>
			{/if}
		</div>

		<!-- Mobile Navigation Menu -->
		<div class="{mobileMenuOpen ? 'block' : 'hidden'} w-full md:hidden" id="mobile-menu">
			<ul class="mt-4 flex flex-col space-y-2 font-medium">
				<li>
					<a
						href="/dashboard"
						class="block border-b border-gray-100 py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>Dashboard</a
					>
				</li>
				<li>
					<a
						href="/signin"
						class="block border-b border-gray-100 py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>Sign In</a
					>
				</li>
				<li>
					<a
						href="/register"
						class="block border-b border-gray-100 py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>Sign Up</a
					>
				</li>
				<li>
					<a
						href="/signout"
						class="block py-2 pl-3 pr-4 text-gray-700 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
						>Sign Out</a
					>
				</li>
			</ul>
		</div>
	</div>
</nav>
