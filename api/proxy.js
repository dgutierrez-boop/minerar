export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();

  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).json({ error: 'Falta el parámetro url' });

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'Accept': 'text/plain, application/json'
      }
    });
    
    if (!response.ok) {
      return res.status(response.status).json({ 
        error: `Google respondió ${response.status}` 
      });
    }
    
    const data = await response.text();
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.status(200).send(data);
  } catch (error) {
    console.error('Error en proxy:', error);
    res.status(500).json({ error: 'Error al obtener los datos' });
  }
}
