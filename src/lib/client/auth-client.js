import { createAuthClient } from "better-auth/svelte"
import { PUBLIC_BETTER_AUTH_URL } from '$env/static/public'


export const authClient = createAuthClient({
    /** the base url of the server (optional if you're using the same domain) */
    baseURL: PUBLIC_BETTER_AUTH_URL
})

export const { signIn, signUp, useSession } = createAuthClient()