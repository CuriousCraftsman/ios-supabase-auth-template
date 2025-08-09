import { supabase } from '$lib/supabase.js'

class AuthStore {
  session = $state(null)
  user = $state(null)
  loading = $state(true)

  constructor() {
    this.initialize()
  }

  async initialize() {
    // Get initial session
    const { data: { session } } = await supabase.auth.getSession()
    this.setSession(session)
    this.loading = false

    // Listen for auth changes
    supabase.auth.onAuthStateChange((event, session) => {
      this.setSession(session)
    })
  }

  setSession(session) {
    this.session = session
    this.user = session?.user ?? null
  }

  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  }

  async signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })
    return { data, error }
  }

  async signInWithProvider(provider) {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider
    })
    return { data, error }
  }

  async signOut() {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  get isAuthenticated() {
    return !!this.user
  }
}

export const auth = new AuthStore()