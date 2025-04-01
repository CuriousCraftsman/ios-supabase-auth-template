<script>
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/client/auth-client';
	import { enhance } from '$app/forms';
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

	let email;
	let password;

	const handleSubmit = (event) => {
		event.preventDefault();
		login();
	};

	const login = async () => {
		const { data, error } = await authClient.signIn.email(
			{
				email, // user email address
				password, // user password -> min 8 characters by default
				callbackURL: '/protected/dashboard', // a url to redirect to after the user verifies their email (optional)
				rememberMe: true // TODO make this optional for the user
			},
			{
				onRequest: (ctx) => {
					//show loading
					// TODO add a spinner
					console.log('Loading');
				},
				onSuccess: (ctx) => {
					//redirect to the dashboard or sign in page
					console.log('Success');
					goto('/');
				},
				onError: (ctx) => {
					// display the error message
					alert(ctx.error.message);
				}
			}
		);
	};
</script>

<div class="flex min-h-screen items-center justify-center">
	<Card class="w-full max-w-md">
		<CardHeader>
			<CardTitle class="text-2xl font-bold">Sign In</CardTitle>
		</CardHeader>

		<CardContent>
			<form on:submit={handleSubmit} class="space-y-4">
				<div class="space-y-2">
					<Label for="email">Email</Label>
					<Input id="email" name="email" type="email" bind:value={email} />
				</div>

				<div class="space-y-2">
					<Label for="password">Password</Label>
					<Input id="password" name="password" type="password" bind:value={password} />
				</div>

				<CardFooter class="px-0 pt-4">
					<Button type="submit" class="w-full">Sign In</Button>
				</CardFooter>
			</form>
		</CardContent>
	</Card>
</div>
