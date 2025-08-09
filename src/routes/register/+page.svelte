<script>
	import { goto } from '$app/navigation';
	import { auth } from '$lib/stores/auth.svelte.js';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';

	let name = $state('');
	let email = $state('');
	let password = $state('');
	let confirmedPassword = $state('');
	let loading = $state(false);
	let errorMessage = $state('');
	let successMessage = $state('');

	const handleSubmit = (event) => {
		event.preventDefault();
		registerUser();
	};

	const registerUser = async () => {
		if (!email || !password || !confirmedPassword) {
			errorMessage = 'Please fill in all fields';
			return;
		}

		if (password !== confirmedPassword) {
			errorMessage = 'Passwords do not match';
			return;
		}

		if (password.length < 6) {
			errorMessage = 'Password must be at least 6 characters';
			return;
		}

		loading = true;
		errorMessage = '';
		successMessage = '';

		try {
			const { data, error } = await auth.signUp(email, password);

			if (error) {
				errorMessage = error.message;
			} else {
				// Since email confirmation is disabled, redirect to dashboard
				goto('/protected/dashboard');
			}
		} catch (err) {
			errorMessage = 'Network error occurred';
		} finally {
			loading = false;
		}
	};
</script>

<div class="flex min-h-screen items-center justify-center">
	<Card class="w-full max-w-md">
		<CardHeader>
			<CardTitle class="text-2xl font-bold">Create an account</CardTitle>
			<CardDescription>Enter your information to register</CardDescription>
		</CardHeader>

		<CardContent>
			{#if errorMessage}
				<div class="mb-4 rounded border border-red-200 bg-red-50 p-3 text-sm text-red-600">
					{errorMessage}
				</div>
			{/if}

			{#if successMessage}
				<div class="mb-4 rounded border border-green-200 bg-green-50 p-3 text-sm text-green-600">
					{successMessage}
				</div>
			{/if}

			<form onsubmit={handleSubmit} class="space-y-4">
				<div class="space-y-2">
					<Label for="name">Full Name (Optional)</Label>
					<Input id="name" name="name" type="text" bind:value={name} disabled={loading} />
				</div>

				<div class="space-y-2">
					<Label for="email">Email</Label>
					<Input id="email" name="email" type="email" bind:value={email} disabled={loading} />
				</div>

				<div class="space-y-2">
					<Label for="password">Password</Label>
					<Input
						id="password"
						name="password"
						type="password"
						bind:value={password}
						disabled={loading}
					/>
				</div>

				<div class="space-y-2">
					<Label for="confirmPassword">Confirm Password</Label>
					<Input
						id="confirmPassword"
						name="confirmPassword"
						type="password"
						bind:value={confirmedPassword}
						disabled={loading}
					/>
				</div>

				<CardFooter class="px-0 pt-4">
					<Button type="submit" class="w-full" disabled={loading}>
						{loading ? 'Creating Account...' : 'Register'}
					</Button>
				</CardFooter>
			</form>

			<div class="mt-4 text-center text-sm">
				<span class="text-gray-600">Already have an account?</span>
				<a href="/sign-in" class="text-blue-600 hover:underline">Sign in</a>
			</div>
		</CardContent>
	</Card>
</div>
