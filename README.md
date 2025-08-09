
## Project Overview

This is a SvelteKit-based mobile application template with Supabase authentication, designed for iOS deployment using Capacitor. The app uses SPA mode with static adapter for mobile compatibility.

This template is **not** designed for web use. 

Install dependencies with `npm install` (or `pnpm install` or `yarn`)

## Note
CMD + F "AuthMe" and "com.authme.test" and change those to your app name.

## Developing

### Mobile Development

```bash
# Build and sync with Capacitor
npm run build && npx cap sync ios

# Open iOS project in Xcode
npx cap open ios

# Run on iOS simulator
npx cap run ios

# Add iOS platform (if needed)
npx cap add ios
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.




## Architecture

### Authentication System
- **Authentication methods**: Email/password authentication (Google OAuth code exists but is not functional in mobile)
- **Client-side authentication**: Uses Supabase Auth with `src/lib/stores/auth.svelte.js` as the main auth store
- **Session management**: Smart storage adapter in `src/lib/supabase.js` handles native mobile storage vs. web localStorage
- **Route protection**: Client-side route guards in `src/routes/protected/+layout.svelte` redirect unauthenticated users
- **Server-side auth**: Currently disabled (commented out in `src/hooks.server.js` and `src/lib/server/security.js`) due to mobile deployment constraints


### Mobile-First Design
- **Capacitor integration**: Native mobile features through Capacitor plugins
- **Cross-platform storage**: Automatic fallback from native Preferences to localStorage
- **iOS-specific**: Configured for iOS deployment with proper status bar handling
- **SPA mode**: Uses `fallback: 'index.html'` in svelte.config.js for mobile compatibility

### UI Components
- **shadcn/ui**: Component library with Tailwind CSS styling
- **Responsive design**: Mobile-first approach with container layouts

## Environment Setup

Required environment variables in `.env`:
```
PUBLIC_SUPABASE_URL=your-supabase-url
PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Key File Locations

- **Supabase client**: `src/lib/supabase.js`
- **Auth store**: `src/lib/stores/auth.svelte.js`
- **Route protection**: `src/routes/protected/+layout.svelte`
- **Main layout**: `src/routes/+layout.svelte`
- **Capacitor config**: `capacitor.config.ts`

## Important Notes

- This template is **not** designed for web use. 
- Server-side functionality is limited due to mobile deployment - prefer client-side solutions
- OAuth authentication is not functional in mobile builds due to lack of clean deep linking solution in Capacitor
- Session detection in URLs is disabled (`detectSessionInUrl: false`) for mobile reliability
- iOS project files are in the `ios/` directory and managed by Capacitor