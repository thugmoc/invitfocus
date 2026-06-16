// Vercel serverless function — exposes public (anon) Supabase config to the browser.
// Set SUPABASE_URL and SUPABASE_ANON_KEY in Vercel > Project > Settings > Environment Variables.
// Never expose SUPABASE_SERVICE_ROLE_KEY here — it must stay server-side only.

module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/javascript');
  res.send(
    `window.SUPABASE_URL = ${JSON.stringify(process.env.SUPABASE_URL || '')};` +
    `window.SUPABASE_ANON = ${JSON.stringify(process.env.SUPABASE_ANON_KEY || '')};`
  );
};
