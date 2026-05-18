export default async function handler(req, res) {
  const CLAVE_SECRETA = 'PMMasAgiles1122SEG';
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx0jGx6mdQJyvYa11gerDHpqirDkAxiflTd-nNy01SQ0vyP2pSZzGoBCBL_tPGMoZ8/exec';

  try {
    const respuesta = await fetch(`${SCRIPT_URL}?key=${CLAVE_SECRETA}`);
    const datos = await respuesta.text();
    
    if (datos.includes('ACCESO DENEGADO')) {
      return res.status(403).send('Error: La clave no coincide');
    }
    
    res.status(200).setHeader('Content-Type', 'text/csv').send(datos);
  } catch (error) {
    res.status(500).send('Error: ' + error.message);
  }
}
