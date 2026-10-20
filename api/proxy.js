export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).json({ error: 'Falta el parámetro "url"' });
  }

  try {
    const decodedUrl = decodeURIComponent(targetUrl);
    
    const response = await fetch(decodedUrl, {
      method: 'GET',
      headers: {
        'Accept': 'text/plain, application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      redirect: 'follow'
    });

    if (!response.ok) {
      return res.status(response.status).json({ 
        error: `Google respondió ${response.status}`
      });
    }

    const data = await response.text();
    
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    return res.status(200).send(data);
  } catch (error) {
    console.error('Error en proxy:', error);
    return res.status(500).json({ error: error.message });
  }
}
