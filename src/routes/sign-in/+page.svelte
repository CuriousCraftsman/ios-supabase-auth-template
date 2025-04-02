<script>
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/client/auth-client';
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Separator } from '$lib/components/ui/separator';
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

	const googleSignIn = async () => {
		const data = await authClient.signIn.social({
			provider: 'google'
		});
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
			<div class="mt-6">
				<div class="relative">
					<div class="absolute inset-0 flex items-center">
						<Separator class="w-full" />
					</div>
					<div class="relative flex justify-center text-xs uppercase">
						<span class="bg-background px-2 text-muted-foreground"> Or continue with </span>
					</div>
				</div>

				<div class="mt-6">
					<Button
						type="button"
						variant="outline"
						class="flex w-full items-center justify-center gap-2"
						onclick={googleSignIn}
					>
						<svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 24 24" width="18">
							<path
								d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
								fill="#4285F4"
							/>
							<path
								d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
								fill="#34A853"
							/>
							<path
								d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
								fill="#FBBC05"
							/>
							<path
								d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
								fill="#EA4335"
							/>
							<path d="M1 1h22v22H1z" fill="none" />
						</svg>
						Sign in with Google
					</Button>
				</div>
			</div>
		</CardContent>
	</Card>
</div>
