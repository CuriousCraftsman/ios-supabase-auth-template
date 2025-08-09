<script>
	import { auth } from '$lib/stores/auth.svelte.js';

	let { data } = $props();
</script>

<div class="max-w-4xl mx-auto p-6">
	<div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
		<h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Dashboard</h1>
		
		<div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
			<h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">User Information</h2>
			
			{#if auth.user}
				<div class="space-y-2">
					<p class="text-gray-600 dark:text-gray-300">
						<strong>Email:</strong> {auth.user.email}
					</p>
					<p class="text-gray-600 dark:text-gray-300">
						<strong>User ID:</strong> {auth.user.id}
					</p>
					<p class="text-gray-600 dark:text-gray-300">
						<strong>Last Sign In:</strong> {auth.user.last_sign_in_at ? new Date(auth.user.last_sign_in_at).toLocaleString() : 'N/A'}
					</p>
				</div>
			{:else}
				<p class="text-gray-600 dark:text-gray-300">No user information available</p>
			{/if}
		</div>
	</div>
</div>
