import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const endpoint = process.env.GOOGLE_SHEET_API_URL;
  const apiKey = process.env.GOOGLE_SHEET_API_KEY;
  if (!endpoint || !apiKey) {
    return res.status(500).json({ error: 'Content service is not configured' });
  }

  try {
    const url = new URL(endpoint);
    if (url.hostname !== 'script.google.com' || !url.pathname.endsWith('/exec')) {
      return res.status(500).json({ error: 'Content service URL is invalid' });
    }
    url.searchParams.set('key', apiKey);

    const upstream = await fetch(url, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });
    if (upstream.url.includes('ServiceLogin') || upstream.url.includes('accounts.google.com')) {
      return res.status(502).json({
        error: 'Google Apps Script redirected this server to sign-in. Redeploy the web app with access set to anyone, then use its public /macros/s/.../exec URL.',
      });
    }
    if (!upstream.ok) {
      return res.status(502).json({ error: `Google Apps Script returned HTTP ${upstream.status}` });
    }
    if (!upstream.headers.get('content-type')?.includes('application/json')) {
      return res.status(502).json({ error: 'Google Apps Script did not return JSON. Check that the deployment is public and the URL is the web app /exec URL.' });
    }
    const payload = await upstream.json();

    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    return res.status(200).json(payload);
  } catch (error) {
    console.error('Google Sheets proxy request failed:', error);
    return res.status(502).json({ error: 'Could not load project content' });
  }
}
