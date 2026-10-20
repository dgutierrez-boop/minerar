export default async function handler(req, res) {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).json({ error: 'Falta el parámetro "url"' });
  }

  try {
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'Accept': 'text/plain, application/json',
      },
    });

    const data = await response.text();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'text/plain');
    
    res.status(200).send(data);
  } catch (error) {
    console.error('Error en el proxy de Vercel:', error);
    res.status(500).json({ error: 'Error al obtener los datos de Google' });
  }
}
