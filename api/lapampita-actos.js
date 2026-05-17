export default async function handler(req, res) {
  const CLAVE_SECRETA = process.env.MI_CLAVE_SECRETA;
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxDULl9w-2sVNFTi6BSh8N8sKnzp6WuFU2_7FSqFp5n5jtzio-u3pni9CQdIFPcPSYW8Q/exec';

  try {
    const respuesta = await fetch(`${SCRIPT_URL}?clave=${CLAVE_SECRETA}`);
    const datos = await respuesta.text();
    
    res.status(200)
       .setHeader('Content-Type', 'text/csv')
       .send(datos);
  } catch (error) {
    res.status(500).send('Error al obtener datos');
  }
}
