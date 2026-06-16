// Vercel serverless function — admin write actions (status changes, notes, messages).
// Uses SUPABASE_SERVICE_ROLE_KEY (server-side only). Protected by ADMIN_API_TOKEN.

module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const token = body.token || req.headers['x-admin-token'];
    if (!token || token !== process.env.ADMIN_API_TOKEN) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      res.status(500).json({ error: 'Missing Supabase env vars' });
      return;
    }

    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

    const VALID_STATUSES = ['lead', 'onboarded', 'collecting', 'validating', 'analyzing', 'delivered', 'feedback'];

    switch (body.action) {
      case 'update_client': {
        const { client_id, status, quality_score, notes } = body;
        if (!client_id) return res.status(400).json({ error: 'client_id required' });

        const update = {};
        if (status !== undefined) {
          if (!VALID_STATUSES.includes(status)) return res.status(400).json({ error: 'Invalid status' });
          update.status = status;
        }
        if (quality_score !== undefined) update.quality_score = quality_score;
        if (notes !== undefined) update.notes = notes;

        const { data, error } = await supabase.from('clients').update(update).eq('id', client_id).select().single();
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json({ client: data });
      }

      case 'send_message': {
        const { client_id, message_body } = body;
        if (!client_id || !message_body) return res.status(400).json({ error: 'client_id and message_body required' });

        const { data, error } = await supabase.from('messages').insert({
          client_id, sender: 'admin', body: message_body,
        }).select().single();
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json({ message: data });
      }

      case 'list_messages': {
        const { client_id } = body;
        if (!client_id) return res.status(400).json({ error: 'client_id required' });

        const { data, error } = await supabase
          .from('messages').select('*').eq('client_id', client_id).order('created_at', { ascending: true });
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json({ messages: data });
      }

      default:
        return res.status(400).json({ error: 'Unknown action' });
    }
  } catch (e) {
    res.status(500).json({ error: e.message, stack: e.stack });
  }
};
