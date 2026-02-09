
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { createPixCharge, extractPixData, formatApiError, PixPaymentData } from '../services/fruitfyApi';
import { 
  ShieldCheck, 
  QrCode, 
  ChevronRight, 
  Loader2, 
  CheckCircle2,
  AlertTriangle,
  Lock,
  Truck,
  MapPin,
  CreditCard as CardIcon,
  Info,
  Check,
  Clock
} from 'lucide-react';

type CheckoutStep = 'form' | 'payment_processing' | 'pix_screen' | 'success' | 'payment_error';

// === Validação de E-mail ===
const validateEmail = (email: string): boolean => {
  // Exige domínio com pelo menos 2 caracteres após o ponto (ex: .com, .br)
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
};

// === Validação de Telefone ===
const validatePhone = (phone: string): boolean => {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 11;
};

// === Validação de CPF (dígitos verificadores) ===
const validateCPF = (cpf: string): boolean => {
  const digits = cpf.replace(/\D/g, '');
  if (digits.length !== 11) return false;
  // Rejeita CPFs com todos os dígitos iguais (ex: 111.111.111-11)
  if (/^(\d)\1{10}$/.test(digits)) return false;
  // Calcula primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(digits[i]) * (10 - i);
  let remainder = (sum * 10) % 11;
  if (remainder === 10) remainder = 0;
  if (remainder !== parseInt(digits[9])) return false;
  // Calcula segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(digits[i]) * (11 - i);
  remainder = (sum * 10) % 11;
  if (remainder === 10) remainder = 0;
  if (remainder !== parseInt(digits[10])) return false;
  return true;
};

// === Máscaras de input ===
const maskCPF = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}.${digits.slice(3)}`;
  if (digits.length <= 9) return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
};

const maskPhone = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : '';
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
};

const maskCEP = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
};

const maskCardNumber = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
};

const maskCardExpiry = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

const maskCVV = (value: string): string => {
  return value.replace(/\D/g, '').slice(0, 4);
};

const Checkout: React.FC = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('form');
  const [isSearchingCep, setIsSearchingCep] = useState(false);
  const [isCepValidated, setIsCepValidated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pixData, setPixData] = useState<PixPaymentData | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isProcessingPix, setIsProcessingPix] = useState(false);

  const [formData, setFormData] = useState({ name: '', email: '', cpf: '', phone: '' });
  const [cpfError, setCpfError] = useState('');
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState({ street: '', neighborhood: '', city: '', state: '', number: '', complement: '' });
  const [cardData, setCardData] = useState({ number: '', name: '', expiry: '', cvv: '' });
  
  const shippingOptions = [
    { id: 'standard', name: 'Entrega Padrão (Correios)', price: 0, time: '7-10 dias úteis' },
    { id: 'express', name: 'Entrega Expressa (Sedex)', price: 19.73, time: '2-3 dias úteis' }
  ];
  const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0]);

  const totalWithShipping = totalPrice + (isCepValidated ? selectedShipping.price : 0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [checkoutStep]);

  useEffect(() => {
    if (cart.length === 0 && checkoutStep === 'form') navigate('/');
  }, [cart, navigate, checkoutStep]);

  const [cepError, setCepError] = useState('');

  useEffect(() => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length === 8) {
      setIsSearchingCep(true);
      setCepError('');
      fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
        .then(res => res.json())
        .then(data => {
          if (data.erro) {
            setCepError('CEP não encontrado.');
            setIsCepValidated(false);
          } else {
            setAddress(prev => ({
              ...prev,
              street: data.logradouro || '',
              neighborhood: data.bairro || '',
              city: data.localidade || '',
              state: data.uf || '',
            }));
            setIsCepValidated(true);
          }
        })
        .catch(() => {
          setCepError('Erro ao buscar CEP. Tente novamente.');
          setIsCepValidated(false);
        })
        .finally(() => setIsSearchingCep(false));
    } else {
      setIsCepValidated(false);
      setCepError('');
    }
  }, [cep]);

  const handleCopyPix = () => {
    if (pixData) {
      navigator.clipboard.writeText(pixData.qrcode_text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const generatePixCharge = async () => {
    setIsProcessingPix(true);
    try {
      const totalCents = Math.round(totalWithShipping * 100);

      const response = await createPixCharge(
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          cpf: formData.cpf,
        },
        totalCents
      );

      if (response.success && response.data) {
        const pixInfo = extractPixData(response.data);
        if (pixInfo) {
          setPixData(pixInfo);
          setCheckoutStep('pix_screen');
        } else {
          setApiError('Erro ao processar QR Code PIX. Tente novamente.');
          setCheckoutStep('form');
        }
      } else {
        setApiError(formatApiError(response));
        setCheckoutStep('form');
      }
    } catch (error) {
      console.error('Erro na API Fruitfy:', error);
      setApiError('Erro de conexão com o servidor de pagamentos. Tente novamente em instantes.');
      setCheckoutStep('form');
    } finally {
      setIsProcessingPix(false);
    }
  };

  const handleProcessOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || formData.name.trim().length < 3) {
        setApiError("Por favor, informe seu nome completo.");
        return;
    }
    if (!validateEmail(formData.email)) {
        setApiError("Por favor, informe um e-mail válido (ex: nome@email.com).");
        return;
    }
    if (!validatePhone(formData.phone)) {
        setApiError("Por favor, informe um telefone válido com DDD.");
        return;
    }
    if (!validateCPF(formData.cpf)) {
        setCpfError('CPF inválido. Verifique os números digitados.');
        setApiError("Por favor, informe um CPF válido.");
        return;
    }
    if (!isCepValidated) {
        setApiError("Por favor, preencha um CEP válido.");
        return;
    }
    setApiError(null);
    setCheckoutStep('payment_processing');
    
    if (paymentMethod === 'card') {
      // Simula erro de cartão para induzir ao PIX (estratégia de conversão)
      setTimeout(() => setCheckoutStep('payment_error'), 2800);
    } else {
      await generatePixCharge();
    }
  };

  if (checkoutStep === 'payment_processing') {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white px-4">
        <div className="relative mb-8">
          <Loader2 size={80} className="text-[#BE185D] animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <ShieldCheck size={32} className="text-[#EC4899]" />
          </div>
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-[#BE185D] uppercase tracking-tighter mb-4 text-center">Processando sua transação</h2>
        <p className="text-gray-500 font-medium animate-pulse">Criptografando dados de pagamento de forma segura...</p>
      </div>
    );
  }

  if (checkoutStep === 'payment_error') {
    return (
      <div className="bg-gray-50 min-h-screen py-10 md:py-20 flex items-center px-4">
        <div className="max-w-xl mx-auto w-full">
           <div className="bg-white p-8 md:p-12 shadow-2xl rounded-sm text-center border-t-8 border-orange-400">
              <div className="w-20 h-20 bg-orange-50 text-orange-400 rounded-full flex items-center justify-center mx-auto mb-8">
                 <AlertTriangle size={44} />
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-[#BE185D] uppercase tracking-tighter mb-6">Instabilidade com o Cartão</h2>
              <p className="text-gray-500 font-medium text-sm md:text-base mb-10 text-center">
                Infelizmente o sistema de cartões está passando por uma manutenção preventiva. <br/>
                Utilize o <span className="font-black text-[#BE185D]">PIX</span> para garantir seu desconto e frete grátis agora.
              </p>
              <button onClick={async () => { setPaymentMethod('pix'); setCheckoutStep('payment_processing'); await generatePixCharge(); }} className="w-full bg-[#BE185D] text-white py-6 font-black uppercase tracking-widest hover:bg-[#EC4899] transition-all shadow-xl rounded-sm flex items-center justify-center gap-3">
                PAGAR COM PIX AGORA <ChevronRight size={20} />
              </button>
           </div>
        </div>
      </div>
    );
  }

  if (checkoutStep === 'pix_screen' && pixData) {
    return (
      <div className="bg-gray-50 min-h-screen py-10 md:py-20">
        <div className="max-w-2xl mx-auto px-4 space-y-6">
          {/* QR Code e Valor */}
          <div className="bg-white border border-gray-100 shadow-2xl p-6 md:p-12 text-center rounded-sm">
            <div className="w-20 h-20 bg-pink-50 text-[#EC4899] rounded-full flex items-center justify-center mx-auto mb-8">
              <QrCode size={40} />
            </div>
            <h2 className="text-3xl font-black text-[#BE185D] uppercase tracking-tighter mb-4">Pagamento PIX Gerado</h2>
            <p className="text-gray-500 mb-8 font-medium">Escaneie o código abaixo ou copie a chave para pagar no app do seu banco.</p>
            <div className="bg-gray-50 p-6 md:p-10 mb-8 border-2 border-dashed border-gray-200 rounded-sm inline-block w-full">
              <div className="bg-white p-4 shadow-xl mb-8 mx-auto w-56 h-56 flex items-center justify-center">
                <img src={pixData.qrcode} alt="QR Code" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-gray-400 uppercase text-[10px] font-black tracking-widest">Valor Total</span>
                <span className="text-4xl font-black text-[#BE185D]">R$ {totalWithShipping.toFixed(2)}</span>
              </div>
            </div>

            {/* Código PIX copia e cola */}
            <div className="mb-8">
              <p className="text-sm font-bold text-gray-600 mb-3">Aqui está o PIX copia e cola</p>
              <p className="text-xs text-gray-400 mb-4">Copie o código e realize o pagamento no app do seu banco</p>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 overflow-hidden">
                <p className="text-xs text-gray-600 font-mono truncate">{pixData.qrcode_text}</p>
              </div>
              <button onClick={handleCopyPix} className={`w-full py-5 flex items-center justify-center gap-3 font-black text-[11px] uppercase tracking-widest transition-all rounded-sm shadow-md ${copied ? 'bg-green-600 text-white' : 'bg-[#EC4899] text-white hover:bg-[#BE185D]'}`}>
                {copied ? <><CheckCircle2 size={18} /> CÓDIGO COPIADO!</> : 'COPIAR CÓDIGO PIX'}
              </button>
            </div>
          </div>

          {/* Passo a passo */}
          <div className="bg-white border border-gray-100 shadow-sm p-6 md:p-10 rounded-sm">
            <h3 className="text-sm font-black text-[#BE185D] uppercase tracking-widest mb-8">Como pagar com PIX:</h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <span className="w-8 h-8 bg-[#BE185D] text-white rounded-full flex items-center justify-center text-xs font-black shrink-0">1</span>
                <p className="text-sm text-gray-600 font-medium pt-1">Abra o app do seu banco e entre na opção <span className="font-black text-gray-900">Pix</span></p>
              </div>
              <div className="flex items-start gap-4">
                <span className="w-8 h-8 bg-[#BE185D] text-white rounded-full flex items-center justify-center text-xs font-black shrink-0">2</span>
                <p className="text-sm text-gray-600 font-medium pt-1">Escolha a opção <span className="font-black text-gray-900">Pagar / Pix copia e cola</span></p>
              </div>
              <div className="flex items-start gap-4">
                <span className="w-8 h-8 bg-[#BE185D] text-white rounded-full flex items-center justify-center text-xs font-black shrink-0">3</span>
                <p className="text-sm text-gray-600 font-medium pt-1">Escaneie o QR Code. Se preferir, <span className="font-black text-gray-900">copie e cole o código</span></p>
              </div>
              <div className="flex items-start gap-4">
                <span className="w-8 h-8 bg-[#BE185D] text-white rounded-full flex items-center justify-center text-xs font-black shrink-0">4</span>
                <p className="text-sm text-gray-600 font-medium pt-1">Depois, <span className="font-black text-gray-900">confirme o pagamento</span></p>
              </div>
            </div>
            <p className="text-xs text-gray-400 font-bold mt-8 pt-6 border-t border-gray-100">
              Após realizar o pagamento, volte para essa tela e clique no botão abaixo para confirmar.
            </p>
          </div>

          {/* Botão de confirmação */}
          <button onClick={() => { clearCart(); setCheckoutStep('success'); }} className="w-full bg-[#BE185D] text-white py-6 font-black uppercase tracking-widest hover:bg-[#EC4899] transition-all shadow-2xl rounded-sm flex items-center justify-center gap-3">
            JÁ FIZ O PAGAMENTO <ChevronRight size={22} />
          </button>
        </div>
      </div>
    );
  }

  if (checkoutStep === 'success') {
    return (
      <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="w-32 h-32 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-10">
          <CheckCircle2 size={80} />
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-[#BE185D] uppercase tracking-tighter mb-6">Pedido Confirmado</h1>
        <p className="text-gray-600 max-w-md mx-auto text-lg mb-12 font-medium">
          Obrigado pela sua compra! Você receberá os detalhes da entrega no e-mail cadastrado em instantes.
        </p>
        <button onClick={() => navigate('/')} className="bg-[#BE185D] text-white px-16 py-6 font-black uppercase tracking-widest hover:bg-[#EC4899] transition-all rounded-sm shadow-xl">
          VOLTAR PARA A LOJA
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 md:py-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#BE185D] font-black text-[10px] mb-12 uppercase tracking-widest hover:translate-x-[-4px] transition-transform">
           VOLTAR PARA A SACOLA
        </button>
        
        <form onSubmit={handleProcessOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-6 md:p-10 border border-gray-100 shadow-sm rounded-sm">
              <h2 className="text-xl font-black text-[#BE185D] uppercase tracking-tight mb-10 flex items-center gap-4">
                 <span className="w-8 h-8 bg-[#BE185D] text-white rounded-full flex items-center justify-center text-[11px] font-black">1</span> Dados Pessoais
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nome Completo</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="bg-gray-50 border border-gray-100 p-4 text-sm focus:border-[#EC4899] outline-none transition-colors" placeholder="Ex: Maria Oliveira" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">E-mail para confirmação</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="bg-gray-50 border border-gray-100 p-4 text-sm focus:border-[#EC4899] outline-none transition-colors" placeholder="Ex: maria@email.com" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">CPF</label>
                  <input required type="text" value={formData.cpf} onChange={e => {
                    const masked = maskCPF(e.target.value);
                    setFormData({...formData, cpf: masked});
                    const digits = masked.replace(/\D/g, '');
                    if (digits.length === 11) {
                      setCpfError(validateCPF(masked) ? '' : 'CPF inválido. Verifique os números digitados.');
                    } else {
                      setCpfError('');
                    }
                  }} className={`bg-gray-50 border p-4 text-sm outline-none transition-colors ${cpfError ? 'border-red-300 focus:border-red-400' : 'border-gray-100 focus:border-[#EC4899]'}`} placeholder="000.000.000-00" maxLength={14} />
                  {cpfError && <span className="text-[10px] text-red-500 font-bold">{cpfError}</span>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Celular / WhatsApp</label>
                  <input required type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: maskPhone(e.target.value)})} className="bg-gray-50 border border-gray-100 p-4 text-sm focus:border-[#EC4899] outline-none transition-colors" placeholder="(00) 00000-0000" maxLength={15} />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 md:p-10 border border-gray-100 shadow-sm rounded-sm">
              <h2 className="text-xl font-black text-[#BE185D] uppercase tracking-tight mb-10 flex items-center gap-4">
                 <span className="w-8 h-8 bg-[#BE185D] text-white rounded-full flex items-center justify-center text-[11px] font-black">2</span> Endereço de Entrega
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                <div className="md:col-span-2 flex flex-col gap-2 relative">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">CEP</label>
                  <input required type="text" value={cep} onChange={e => setCep(maskCEP(e.target.value))} className={`bg-gray-50 border p-4 text-sm outline-none transition-colors ${cepError ? 'border-red-300 focus:border-red-400' : 'border-gray-100 focus:border-[#EC4899]'}`} placeholder="00000-000" maxLength={9} />
                  {isSearchingCep && <Loader2 className="absolute right-4 bottom-4 animate-spin text-[#BE185D]" size={18} />}
                  {isCepValidated && !isSearchingCep && <Check className="absolute right-4 bottom-4 text-green-500" size={18} />}
                  {cepError && <span className="text-[10px] text-red-500 font-bold mt-1">{cepError}</span>}
                </div>
                <div className="md:col-span-4 flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Rua / Avenida</label>
                  <input required type="text" value={address.street} onChange={e => setAddress({...address, street: e.target.value})} className="bg-gray-50 border border-gray-100 p-4 text-sm outline-none focus:border-[#EC4899] transition-colors" placeholder="Ex: Av. Brasil" />
                </div>
                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Número</label>
                  <input required type="text" value={address.number} onChange={e => setAddress({...address, number: e.target.value})} className="bg-gray-50 border border-gray-100 p-4 text-sm outline-none focus:border-[#EC4899] transition-colors" placeholder="Ex: 123" />
                </div>
                <div className="md:col-span-4 flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Complemento</label>
                  <input type="text" value={address.complement} onChange={e => setAddress({...address, complement: e.target.value})} className="bg-gray-50 border border-gray-100 p-4 text-sm outline-none focus:border-[#EC4899] transition-colors" placeholder="Ex: Apto 402" />
                </div>
                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Bairro</label>
                  <input required type="text" value={address.neighborhood} onChange={e => setAddress({...address, neighborhood: e.target.value})} className="bg-gray-50 border border-gray-100 p-4 text-sm outline-none focus:border-[#EC4899] transition-colors" placeholder="Bairro" />
                </div>
                <div className="md:col-span-3 flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Cidade</label>
                  <input required type="text" value={address.city} onChange={e => setAddress({...address, city: e.target.value})} className="bg-gray-50 border border-gray-100 p-4 text-sm outline-none focus:border-[#EC4899] transition-colors" placeholder="Cidade" />
                </div>
                <div className="md:col-span-1 flex flex-col gap-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">UF</label>
                  <input required type="text" value={address.state} onChange={e => setAddress({...address, state: e.target.value})} className="bg-gray-50 border border-gray-100 p-4 text-sm outline-none focus:border-[#EC4899] transition-colors text-center" placeholder="SP" maxLength={2} />
                </div>
              </div>

              {isCepValidated && (
                 <div className="mt-10 space-y-4">
                    <h3 className="text-[10px] font-black text-[#BE185D] uppercase tracking-[0.2em] mb-4">Escolha o Frete</h3>
                    {shippingOptions.map(option => (
                       <button
                          key={option.id}
                          type="button"
                          onClick={() => setSelectedShipping(option)}
                          className={`w-full flex items-center justify-between p-5 border-2 transition-all rounded-sm ${selectedShipping.id === option.id ? 'border-[#EC4899] bg-pink-50' : 'border-gray-50 bg-white hover:border-gray-200'}`}
                       >
                          <div className="flex items-center gap-4">
                             <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedShipping.id === option.id ? 'border-[#EC4899]' : 'border-gray-300'}`}>
                                {selectedShipping.id === option.id && <div className="w-2.5 h-2.5 bg-[#EC4899] rounded-full" />}
                             </div>
                             <div className="text-left">
                                <p className={`text-xs font-black uppercase tracking-tight ${selectedShipping.id === option.id ? 'text-[#BE185D]' : 'text-gray-900'}`}>{option.name}</p>
                                <p className="text-[10px] text-gray-400 font-bold">{option.time}</p>
                             </div>
                          </div>
                          <span className="text-sm font-black text-gray-900">{option.price === 0 ? 'GRÁTIS' : `R$ ${option.price.toFixed(2)}`}</span>
                       </button>
                    ))}
                 </div>
              )}
            </div>

            <div className="bg-white p-6 md:p-10 border border-gray-100 shadow-sm rounded-sm">
              <h2 className="text-xl font-black text-[#BE185D] uppercase tracking-tight mb-10 flex items-center gap-4">
                 <span className="w-8 h-8 bg-[#BE185D] text-white rounded-full flex items-center justify-center text-[11px] font-black">3</span> Pagamento
              </h2>
              <div className="grid grid-cols-2 gap-6 mb-10">
                 <button 
                  type="button" 
                  onClick={() => setPaymentMethod('pix')} 
                  className={`p-6 md:p-10 border-2 flex flex-col items-center gap-4 font-black transition-all rounded-sm ${paymentMethod === 'pix' ? 'border-[#EC4899] bg-pink-50 text-[#EC4899]' : 'border-gray-50 text-gray-300 hover:border-gray-200'}`}
                 >
                    <QrCode size={32} />
                    <span className="text-[10px] md:text-xs uppercase tracking-widest">PIX</span>
                 </button>
                 <button 
                  type="button" 
                  onClick={() => setPaymentMethod('card')} 
                  className={`p-6 md:p-10 border-2 flex flex-col items-center gap-4 font-black transition-all rounded-sm ${paymentMethod === 'card' ? 'border-[#EC4899] bg-pink-50 text-[#EC4899]' : 'border-gray-50 text-gray-300 hover:border-gray-200'}`}
                 >
                    <CardIcon size={32} />
                    <span className="text-[10px] md:text-xs uppercase tracking-widest">CARTÃO</span>
                 </button>
              </div>
              
              {paymentMethod === 'pix' && (
                <div className="bg-[#f8fbff] border border-[#e2efff] p-6 md:p-10 rounded-xl flex flex-col md:flex-row gap-8 items-center animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-sm mb-8">
                  <div className="w-full md:w-56 flex flex-col items-center gap-4">
                    <div className="aspect-square w-full bg-white border-2 border-dashed border-[#dce9ff] rounded-2xl flex flex-col items-center justify-center relative group">
                      <div className="absolute inset-0 flex items-center justify-center opacity-5">
                        <QrCode size={120} />
                      </div>
                      <div className="bg-white p-4 rounded-full shadow-lg border border-gray-50 z-10">
                        <Clock size={32} className="text-[#BE185D] animate-pulse" />
                      </div>
                    </div>
                    <span className="text-[10px] font-black text-[#EC4899] uppercase tracking-widest">Preview do QR Code</span>
                  </div>
                  
                  <div className="flex-1 space-y-6">
                    <div className="inline-flex items-center gap-2 bg-[#BE185D] text-white px-4 py-2 rounded-full shadow-md">
                      <Info size={16} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Informação Importante</span>
                    </div>
                    
                    <div>
                      <h3 className="text-xl md:text-2xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-2">
                        SEU QR CODE EXCLUSIVO SERÁ <span className="text-[#EC4899]">GERADO AGORA</span>
                      </h3>
                    </div>

                    <ul className="space-y-3">
                      <li className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center shadow-sm">
                          <Check size={14} />
                        </div>
                        <span className="text-[11px] md:text-xs font-black text-gray-600 uppercase tracking-tight">Aprovação imediata via PIX</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center shadow-sm">
                          <Check size={14} />
                        </div>
                        <span className="text-[11px] md:text-xs font-black text-gray-600 uppercase tracking-tight">Prioridade no despacho do pedido</span>
                      </li>
                    </ul>

                    <p className="text-[11px] md:text-xs text-gray-400 font-bold uppercase tracking-tight leading-relaxed max-w-md">
                      Ao confirmar, você receberá o código para pagar no seu banco. Seu tratamento será preparado com <span className="text-[#BE185D]">máxima urgência</span>.
                    </p>
                  </div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nome no Cartão</label>
                    <input type="text" value={cardData.name} onChange={e => setCardData({...cardData, name: e.target.value.toUpperCase()})} className="bg-gray-50 border border-gray-100 p-4 text-sm outline-none focus:border-[#EC4899] transition-colors uppercase" placeholder="Ex: MARIA O SILVA" maxLength={50} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Número do Cartão</label>
                    <input type="text" inputMode="numeric" value={cardData.number} onChange={e => setCardData({...cardData, number: maskCardNumber(e.target.value)})} className="bg-gray-50 border border-gray-100 p-4 text-sm outline-none focus:border-[#EC4899] transition-colors tracking-widest" placeholder="0000 0000 0000 0000" maxLength={19} />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Validade</label>
                      <input type="text" inputMode="numeric" value={cardData.expiry} onChange={e => setCardData({...cardData, expiry: maskCardExpiry(e.target.value)})} className="bg-gray-50 border border-gray-100 p-4 text-sm outline-none focus:border-[#EC4899] transition-colors tracking-widest" placeholder="MM/AA" maxLength={5} />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">CVV</label>
                      <input type="text" inputMode="numeric" value={cardData.cvv} onChange={e => setCardData({...cardData, cvv: maskCVV(e.target.value)})} className="bg-gray-50 border border-gray-100 p-4 text-sm outline-none focus:border-[#EC4899] transition-colors tracking-widest" placeholder="123" maxLength={4} />
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-8 p-4 bg-gray-50 flex items-center gap-4 rounded-sm border border-gray-100">
                 <Lock size={18} className="text-green-500" />
                 <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider leading-tight">
                    Ambiente seguro criptografado. Seus dados estão protegidos sob os mais altos padrões de segurança.
                 </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white border border-gray-100 shadow-2xl p-8 rounded-sm sticky top-32">
               <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-8 border-b border-gray-50 pb-4">Resumo do Pedido</h3>
               
               <div className="space-y-4 mb-10 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center gap-4">
                       <div className="flex items-center gap-3">
                          <span className="w-8 h-8 bg-gray-50 border border-gray-100 flex items-center justify-center text-[10px] font-black rounded-sm">{item.quantity}x</span>
                          <span className="text-[10px] font-bold text-gray-600 truncate max-w-[140px] uppercase">{item.name}</span>
                       </div>
                       <span className="text-[11px] font-black text-gray-900">R$ {(item.discountedPrice * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
               </div>

               <div className="space-y-4 pt-6 border-t border-gray-100">
                  <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                     <span>Subtotal</span>
                     <span>R$ {totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                     <span>Frete</span>
                     <span>{isCepValidated ? (selectedShipping.price === 0 ? 'GRÁTIS' : `R$ ${selectedShipping.price.toFixed(2)}`) : '--'}</span>
                  </div>
                  <div className="flex justify-between items-end pt-6 border-t-2 border-gray-900">
                     <span className="text-sm font-black text-gray-900 uppercase tracking-tighter">Total</span>
                     <div className="text-right">
                        <span className="block text-4xl font-black text-[#BE185D] tracking-tighter">R$ {totalWithShipping.toFixed(2)}</span>
                        {paymentMethod === 'pix' && <span className="text-[9px] font-black text-green-600 uppercase tracking-widest">Desconto PIX Aplicado</span>}
                     </div>
                  </div>
               </div>

               {apiError && (
                 <div className="mt-6 p-3 bg-red-50 text-red-600 text-[10px] font-black uppercase text-center border border-red-100">
                    {apiError}
                 </div>
               )}

               <button 
                type="submit" 
                disabled={!isCepValidated && !isSearchingCep} 
                className={`w-full mt-10 py-6 font-black uppercase tracking-widest transition-all rounded-sm flex items-center justify-center gap-3 shadow-xl ${!isCepValidated ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#BE185D] text-white hover:bg-[#EC4899] active:scale-95'}`}
               >
                 {paymentMethod === 'pix' ? 'GERAR PIX AGORA' : 'FINALIZAR PEDIDO'} <ChevronRight size={20} />
               </button>
               
               <div className="mt-8 flex flex-col gap-4">
                  <div className="flex items-center gap-3 opacity-40 justify-center grayscale">
                     <ShieldCheck size={24} />
                     <CardIcon size={24} />
                     <Truck size={24} />
                  </div>
                  <p className="text-center text-[9px] text-gray-300 font-black uppercase tracking-[0.2em]">Entrega Segura em Todo o Brasil</p>
               </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
