// Supabase client — partagé entre toutes les pages
// Les variables SUPABASE_URL et SUPABASE_ANON_KEY sont injectées
// par Vercel via window.ENV (voir _env.js généré au build)

const SUPABASE_URL  = window.SUPABASE_URL  || '';
const SUPABASE_ANON = window.SUPABASE_ANON || '';

const { createClient } = supabase;
const sb = createClient(SUPABASE_URL, SUPABASE_ANON);

async function getSession() {
  const { data: { session } } = await sb.auth.getSession();
  return session;
}

async function requireAuth(redirectTo = '/portal/login.html') {
  const session = await getSession();
  if (!session) { window.location.href = redirectTo; }
  return session;
}

async function signOut() {
  await sb.auth.signOut();
  window.location.href = '/';
}
