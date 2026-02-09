
import React from 'react';
import { ShieldCheck, Lock, EyeOff, FileText, Database, Share2 } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-white py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        <header className="mb-20 text-center">
           <div className="w-20 h-20 bg-pink-50 text-[#EC4899] rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
              <ShieldCheck size={40} />
           </div>
           <h1 className="text-5xl font-black text-gray-900 uppercase tracking-tighter mb-4">Política de Privacidade</h1>
           <div className="flex items-center justify-center gap-4">
              <span className="h-px w-10 bg-gray-200"></span>
              <p className="text-[10px] font-black text-[#EC4899] uppercase tracking-[0.4em]">LGPD COMPLIANT 2024</p>
              <span className="h-px w-10 bg-gray-200"></span>
           </div>
        </header>

        <div className="space-y-16">
          <section className="prose prose-pink max-w-none">
            <div className="flex items-center gap-4 mb-8">
               <Database className="text-[#EC4899]" />
               <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight m-0">1. Introdução e Coleta de Dados</h2>
            </div>
            <p className="text-gray-600 font-medium leading-relaxed">
              Esta política descreve as práticas de privacidade de nossa plataforma. Ao utilizar nossos serviços, você confia a nós informações valiosas, e estamos comprometidos em proteger cada bit desse dado. Coletamos informações de contato (nome, e-mail, telefone), dados de faturamento (CPF, endereço) e dados de navegação técnica através de cookies persistentes e de sessão para garantir a melhor experiência possível.
            </p>
          </section>

          <section className="prose prose-pink max-w-none">
            <div className="flex items-center gap-4 mb-8">
               <Lock className="text-[#EC4899]" />
               <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight m-0">2. Finalidade do Tratamento</h2>
            </div>
            <p className="text-gray-600 font-medium leading-relaxed">Seus dados são processados para:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none pl-0 mt-6">
               {[
                 'Processamento e entrega de pedidos',
                 'Prevenção contra fraudes e segurança',
                 'Comunicações sobre status do pedido',
                 'Personalização de ofertas dermatológicas',
                 'Cumprimento de obrigações legais fiscais',
                 'Melhoria contínua da interface do usuário'
               ].map((item, i) => (
                 <li key={i} className="bg-gray-50 p-4 border-l-4 border-[#EC4899] text-xs font-black uppercase tracking-tight text-gray-700 m-0">
                    {item}
                 </li>
               ))}
            </ul>
          </section>

          <div className="bg-[#BE185D] p-10 md:p-14 text-white rounded-sm shadow-2xl relative overflow-hidden">
             <div className="relative z-10">
                <h3 className="text-2xl font-black uppercase tracking-widest mb-6">Segurança Bancária</h3>
                <p className="text-sm opacity-80 font-medium leading-relaxed mb-8">
                  Utilizamos criptografia ponta-a-ponta (SSL 256 bits) em todas as transações. Seus dados de cartão de crédito são processados diretamente pelo gateway de pagamento, sem nunca serem armazenados em nossos servidores.
                </p>
                <div className="flex items-center gap-4">
                   <div className="px-4 py-2 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest">PCI DSS Compliant</div>
                   <div className="px-4 py-2 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest">SSL Secure Connect</div>
                </div>
             </div>
             <ShieldCheck size={200} className="absolute right-[-40px] bottom-[-40px] opacity-10" />
          </div>

          <section className="prose prose-pink max-w-none">
            <div className="flex items-center gap-4 mb-8">
               <Share2 className="text-[#EC4899]" />
               <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight m-0">3. Compartilhamento com Terceiros</h2>
            </div>
            <p className="text-gray-600 font-medium leading-relaxed">
              Não vendemos suas informações. Compartilhamos dados apenas com parceiros essenciais para a operação: empresas de logística (para entrega), gateways de pagamento (para processamento) e ferramentas de análise de tráfego (Google Analytics). Todos os parceiros possuem contratos de confidencialidade rigorosos.
            </p>
          </section>

          <section className="prose prose-pink max-w-none">
            <div className="flex items-center gap-4 mb-8">
               <FileText className="text-[#EC4899]" />
               <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight m-0">4. Seus Direitos (LGPD)</h2>
            </div>
            <p className="text-gray-600 font-medium leading-relaxed">Como titular dos dados, você tem direito a:</p>
            <div className="space-y-4 mt-6">
               {[
                 'Acesso: Saber quais dados temos sobre você.',
                 'Correção: Atualizar dados incompletos ou errados.',
                 'Eliminação: Solicitar a exclusão total da sua conta.',
                 'Portabilidade: Receber seus dados em formato estruturado.',
                 'Revogação: Retirar consentimento para newsletters a qualquer momento.'
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-4 text-sm font-bold text-gray-700">
                    <div className="w-2 h-2 bg-[#EC4899] rounded-full" />
                    {item}
                 </div>
               ))}
            </div>
          </section>

          <footer className="pt-20 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
             <div className="flex items-center gap-4 text-gray-400">
                <EyeOff size={24} />
                <p className="text-[10px] font-black uppercase tracking-[0.2em]">Navegação Segura Privada</p>
             </div>
             <p className="text-[10px] text-gray-300 font-medium">Contate nosso encarregado de dados em: dpo@epocacosmeticos.com.br</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
