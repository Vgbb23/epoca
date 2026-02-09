/**
 * Vercel Serverless Function - Proxy para API PIX Fruitfy
 * 
 * As credenciais ficam seguras no servidor (env vars do Vercel),
 * nunca expostas no código do cliente.
 * 
 * Env vars necessárias no Vercel Dashboard:
 *   FRUITFY_TOKEN   - Token de autenticação da API
 *   FRUITFY_STORE_ID - ID da loja na Fruitfy
 */
export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const API_TOKEN = process.env.FRUITFY_TOKEN;
  const STORE_ID = process.env.FRUITFY_STORE_ID;
  const PRODUCT_ID = process.env.FRUITFY_PRODUCT_ID;

  if (!API_TOKEN || !STORE_ID) {
    console.error('Missing env vars: FRUITFY_TOKEN or FRUITFY_STORE_ID');
    return res.status(500).json({
      success: false,
      message: 'Erro de configuração do servidor de pagamentos.',
    });
  }

  try {
    // Garante que os items usem o PRODUCT_ID correto (UUID) do servidor
    const body = { ...req.body };
    if (PRODUCT_ID && body.items && Array.isArray(body.items)) {
      body.items = body.items.map(item => ({ ...item, id: PRODUCT_ID }));
    }

    const requestBody = JSON.stringify(body);
    console.log('Sending to Fruitfy:', requestBody);

    const response = await fetch('https://api.fruitfy.io/api/pix/charge', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_TOKEN}`,
        'Store-Id': STORE_ID,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Language': 'pt_BR',
      },
      body: requestBody,
    });

    const responseText = await response.text();
    console.log('Fruitfy response status:', response.status, 'body:', responseText);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      data = { success: false, message: responseText || 'Resposta inválida do servidor' };
    }

    return res.status(response.status).json(data);
  } catch (error) {
    console.error('Fruitfy API error:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro de conexão com o servidor de pagamentos. Tente novamente.',
      debug: String(error),
    });
  }
}
