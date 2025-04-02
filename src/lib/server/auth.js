import { betterAuth } from "better-auth";
import pg from "pg"
const { Pool } = pg;
import { DATABASE_URL, BETTER_AUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';

export const auth = betterAuth({
    database: new Pool({
        connectionString: DATABASE_URL
    }),
    secret: BETTER_AUTH_SECRET,
    emailAndPassword: {
        enabled: true
    },
    socialProviders: {
        google: {
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET
        },
    },
});
