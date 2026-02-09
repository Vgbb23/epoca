/**
 * Serviço de integração com a API PIX da Fruitfy
 * Documentação: https://fruitfy.io
 * 
 * Em produção (Vercel): a chamada vai para /api/pix/charge (serverless function)
 *   → as credenciais ficam seguras no servidor (env vars do Vercel)
 * Em desenvolvimento (Vite): a chamada vai para /api/pix/charge (proxy do Vite)
 *   → o proxy repassa para https://api.fruitfy.io com as credenciais
 */

const API_TOKEN = import.meta.env.VITE_FRUITFY_TOKEN || '';
const STORE_ID = import.meta.env.VITE_FRUITFY_STORE_ID || '';
const PRODUCT_ID = import.meta.env.VITE_FRUITFY_PRODUCT_ID || 'produto-loja';
const IS_DEV = import.meta.env.DEV;

export interface FruitfyChargeRequest {
  name: string;
  email: string;
  phone: string;
  cpf: string;
  amount: number;
  items: Array<{
    id: string;
    value: number;
    quantity?: number;
  }>;
}

export interface FruitfyChargeResponse {
  success: boolean;
  message?: string;
  data?: Record<string, any>;
  errors?: Record<string, string[]>;
}

export interface PixPaymentData {
  qrcode: string;
  qrcode_text: string;
  orderId?: string;
}

/**
 * Cria uma cobrança PIX via Fruitfy API
 */
export async function createPixCharge(
  customer: { name: string; email: string; phone: string; cpf: string },
  totalAmountCents: number
): Promise<FruitfyChargeResponse> {
  const body: FruitfyChargeRequest = {
    name: customer.name.trim(),
    email: customer.email.trim(),
    phone: customer.phone.replace(/\D/g, ''),
    cpf: customer.cpf.replace(/\D/g, ''),
    amount: totalAmountCents,
    items: [
      {
        id: PRODUCT_ID,
        value: totalAmountCents,
        quantity: 1,
      },
    ],
  };

  // Em dev, envia headers de auth (proxy do Vite repassa para a API)
  // Em produção, a serverless function /api/pix/charge cuida da autenticação
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Accept-Language': 'pt_BR',
  };

  if (IS_DEV) {
    headers['Authorization'] = `Bearer ${API_TOKEN}`;
    headers['Store-Id'] = STORE_ID;
  }

  const response = await fetch('/api/pix/charge', {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  const result: FruitfyChargeResponse = await response.json();
  return result;
}

/**
 * Extrai dados do PIX da resposta da API Fruitfy
 * 
 * Estrutura real da resposta:
 * {
 *   order_id: "uuid",
 *   status: "waiting_payment",
 *   amount: 4950,
 *   pix: {
 *     code: "00020101...",       // Código copia-e-cola
 *     expires_at: "2026-...",
 *     qr_code_base64: "data:image/svg+xml;base64,..."  // QR Code em SVG base64
 *   }
 * }
 */
export function extractPixData(data: Record<string, any>): PixPaymentData | null {
  // Estrutura Fruitfy: dados PIX ficam dentro de data.pix
  const pix = data.pix || {};

  // Código copia-e-cola do PIX
  const qrcodeText =
    pix.code ||
    pix.qrcode_text ||
    pix.pix_code ||
    pix.copy_paste ||
    pix.emv ||
    pix.brcode ||
    data.qrcode_text ||
    data.pix_code ||
    '';

  // Imagem do QR Code
  let qrcodeImage =
    pix.qr_code_base64 ||
    pix.qrcode ||
    pix.qr_code ||
    pix.qr_code_url ||
    pix.qr_code_image ||
    data.qr_code_base64 ||
    data.qrcode ||
    data.qr_code ||
    '';

  if (!qrcodeText && !qrcodeImage) return null;

  // Se a imagem veio em base64 sem prefixo data:, adiciona
  if (qrcodeImage && !qrcodeImage.startsWith('http') && !qrcodeImage.startsWith('data:')) {
    qrcodeImage = `data:image/png;base64,${qrcodeImage}`;
  }

  // Se não tem imagem mas tem o código texto, gera o QR Code via serviço externo
  if (!qrcodeImage && qrcodeText) {
    qrcodeImage = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrcodeText)}`;
  }

  // ID do pedido
  const orderId = data.order_id || data.id || data.charge_id || undefined;

  return {
    qrcode: qrcodeImage,
    qrcode_text: qrcodeText,
    orderId,
  };
}

/**
 * Formata erro da API para exibição ao usuário
 */
export function formatApiError(response: FruitfyChargeResponse): string {
  if (response.message) return response.message;

  if (response.errors) {
    const messages = Object.values(response.errors).flat();
    if (messages.length > 0) return messages.join('. ');
  }

  return 'Erro ao processar pagamento. Verifique seus dados e tente novamente.';
}
