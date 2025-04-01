import { error } from '@sveltejs/kit';
import { auth } from "$lib/server/auth";

export function securityHandler(event) {
    const user = event.locals.user;

    return {
        /**
         * Checks if the user is authenticated
         * @throws 401 error if user is not authenticated
         */
        requireAuth: () => {
            if (!session || !session.user) {
                error(401, 'Unauthorized: Please sign in to access this resource');
            }
            return session.user;
        },

        /**
         * Checks if user is an admin
         * @throws 403 error if user is not an admin
         */
        requireAdmin: () => {
            const authenticatedUser = requireAuth();
            if (!user.isAdmin) {
                error(403, 'Forbidden: Admin access required');
            }
            return authenticatedUser;
        },

        /**
         * Gets the current user (may be undefined if not authenticated)
         */
        getUser: () => session?.user || null,

        getSession: () => session
    };

    // Helper so admin doesn't have to repeat this code
    function requireAuth() {
        if (!session || !session.user) {
            error(401, 'Unauthorized: Please sign in to access this resource');
        }
        return session.user;
    }
}