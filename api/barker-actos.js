export default async function handler(req, res) {
  const CLAVE_SECRETA = process.env.MI_CLAVE_SECRETA;
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx9XgvXAI6gsxkx_ty4MCOW43zizF5hHW-h_JDaAFOcRmw9g0m3DDU8tt8VLzFNDlBm/exec';

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
