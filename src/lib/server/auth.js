import { betterAuth } from "better-auth";
import pg from "pg"
const { Pool } = pg;
import { DATABASE_URL, BETTER_AUTH_SECRET } from '$env/static/private';

export const auth = betterAuth({
    database: new Pool({
        connectionString: DATABASE_URL
    }),
    secret: BETTER_AUTH_SECRET,
    emailAndPassword: {
        enabled: true
    },
    // SEE THIS: https://www.better-auth.com/docs/authentication/google
    // socialProviders: {
    //     google: {
    //         clientId: process.env.GOOGLE_CLIENT_ID,
    //         clientSecret: process.env.GOOGLE_CLIENT_SECRET
    //     },
    // },
});
