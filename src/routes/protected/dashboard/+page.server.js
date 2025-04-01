/** @type {import('./$types').PageServerLoad} */
export async function load({ locals }) {

    locals.security.requireAuth()

    return {};
};