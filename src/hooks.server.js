import { auth } from "$lib/server/auth";
import { svelteKitHandler } from "better-auth/svelte-kit";
import { securityHandler } from "$lib/server/security"

export async function handle({ event, resolve }) {

    console.log(event.locals)

    try {
        const session = await auth.api.getSession({
            headers: event.request.headers
        })

        event.locals.session = session

        console.log("Success")
        console.log(session)
    } catch (error) {
        console.log(error)
    }

    // // adds the security functions to locals to make it accessible in other server side code
    event.locals.security = securityHandler(event)

    return svelteKitHandler({ event, resolve, auth });
}