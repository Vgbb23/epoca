/**
 * Vercel Serverless Function - Proxy para API PIX Fruitfy
 * 
 * Env vars necessárias no Vercel Dashboard:
 *   FRUITFY_TOKEN      - Token de autenticação da API
 *   FRUITFY_STORE_ID   - ID da loja na Fruitfy
 *   FRUITFY_PRODUCT_ID - ID do produto (UUID)
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
    return res.status(500).json({
      success: false,
      message: 'Erro de configuração do servidor de pagamentos.',
    });
  }

  try {
    // Parse do body - pode vir como objeto ou string dependendo do Vercel
    let clientData;
    if (typeof req.body === 'string') {
      clientData = JSON.parse(req.body);
    } else {
      clientData = req.body || {};
    }

    // Monta o body da requisição, sempre usando o PRODUCT_ID do servidor
    const fruitfyBody = {
      name: clientData.name || '',
      email: clientData.email || '',
      phone: clientData.phone || '',
      cpf: clientData.cpf || '',
      amount: clientData.amount || 0,
      items: [
        {
          id: PRODUCT_ID || clientData.items?.[0]?.id || '',
          value: clientData.amount || clientData.items?.[0]?.value || 0,
          quantity: 1,
        },
      ],
    };

    const requestBody = JSON.stringify(fruitfyBody);
    console.log('[PIX] Request to Fruitfy:', requestBody);

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
    console.log('[PIX] Fruitfy status:', response.status, 'response:', responseText.substring(0, 500));

    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      data = { success: false, message: 'Resposta inválida do servidor de pagamentos.' };
    }

    return res.status(response.status).json(data);
  } catch (error) {
    console.error('[PIX] Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Erro de conexão com o servidor de pagamentos. Tente novamente.',
    });
  }
}
