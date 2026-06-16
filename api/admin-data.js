// Vercel serverless function — admin-only data feed.
// Uses SUPABASE_SERVICE_ROLE_KEY (server-side only, never exposed to the browser).
// Protected by ADMIN_API_TOKEN — set both in Vercel > Settings > Environment Variables.

module.exports = async (req, res) => {
  try {
    const token = req.query.token || req.headers['x-admin-token'];
    if (!token || token !== process.env.ADMIN_API_TOKEN) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      res.status(500).json({
        error: 'Missing env vars',
        hasUrl: !!process.env.SUPABASE_URL,
        hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      });
      return;
    }

    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data: clients, error } = await supabase
      .from('clients')
      .select('*, documents(*), reports(*), tasks(*)')
      .order('created_at', { ascending: false });

    if (error) {
      res.status(500).json({ error: error.message });
      return;
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ clients });
  } catch (e) {
    res.status(500).json({ error: e.message, stack: e.stack });
  }
};
