
import React from 'react';
import { FileText, Truck, RefreshCw, AlertCircle, Scale, CreditCard, ShoppingBag } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <div className="bg-white py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        <header className="mb-24">
           <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-16 bg-pink-50 text-[#EC4899] rounded-full flex items-center justify-center shadow-inner">
                 <Scale size={32} />
              </div>
              <div>
                 <h1 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter">Termos de Uso</h1>
                 <p className="text-[10px] font-black text-[#EC4899] uppercase tracking-[0.4em]">Contrato de Compra e Venda 2024</p>
              </div>
           </div>
           <p className="text-gray-500 font-medium leading-relaxed max-w-2xl italic">
              Este documento estabelece as condições que regem a utilização deste site e a compra de produtos no mesmo. Leia-os atentamente antes de prosseguir.
           </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
           {[
             { icon: Truck, title: 'Logística', desc: 'Entregas nacionais em até 10 dias úteis.' },
             { icon: RefreshCw, title: 'Trocas', desc: '7 dias para arrependimento e 30 para defeitos.' },
             { icon: ShoppingBag, title: ' Marketplace', desc: 'Vendas sujeitas a disponibilidade.' }
           ].map((item, i) => (
             <div key={i} className="p-8 bg-gray-50 border border-gray-100 rounded-sm">
                <item.icon size={24} className="text-[#EC4899] mb-4" />
                <h4 className="text-[11px] font-black text-gray-900 uppercase tracking-widest mb-2">{item.title}</h4>
                <p className="text-[11px] text-gray-500 font-medium leading-tight">{item.desc}</p>
             </div>
           ))}
        </div>

        <div className="space-y-20">
          <section>
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-8 flex items-center gap-4">
               <span className="text-[#EC4899] font-serif italic text-4xl">01</span> OBJETO DO CONTRATO
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed">
              O presente contrato tem por objeto a venda de produtos dermo-cosméticos e acessórios através do e-commerce. A realização do pedido implica na aceitação plena e irrevogável destes termos. Reservamo-nos o direito de alterar estes termos a qualquer momento, sem aviso prévio, sendo aplicada a versão vigente no ato da compra.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-8 flex items-center gap-4">
               <span className="text-[#EC4899] font-serif italic text-4xl">02</span> POLÍTICA DE PREÇOS E ESTOQUE
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed mb-6">
              Todos os preços são expressos em Reais (BRL) e incluem impostos incidentes. Promoções marcadas como "OFERTA" possuem tempo limitado ou enquanto durarem os estoques. No caso de erro crasso no preço exibido (ex: R$ 0,01), o pedido será cancelado automaticamente e o cliente notificado.
            </p>
            <div className="p-6 bg-pink-50 border-l-4 border-[#EC4899] text-[10px] font-black uppercase text-[#BE185D] tracking-widest">
               Brindes não são cumulativos com cupons de desconto.
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-8 flex items-center gap-4">
               <span className="text-[#EC4899] font-serif italic text-4xl">03</span> FORMAS DE PAGAMENTO
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-600 font-medium text-sm leading-relaxed">
               <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-900 font-black uppercase tracking-tight">
                     <CreditCard size={18} className="text-[#EC4899]" /> Cartão de Crédito
                  </div>
                  <p>Aceitamos as principais bandeiras. O parcelamento em até 12x sem juros está sujeito ao valor mínimo de parcela de R$ 30,00.</p>
               </div>
               <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-900 font-black uppercase tracking-tight">
                     <FileText size={18} className="text-[#EC4899]" /> PIX
                  </div>
                  <p>Pagamentos via PIX possuem aprovação imediata e garantem prioridade no despacho. O código gerado expira em 30 minutos.</p>
               </div>
            </div>
          </section>

          <section className="bg-orange-50 p-10 md:p-14 border-t-8 border-orange-400">
             <div className="flex items-center gap-4 mb-8 text-orange-900">
                <AlertCircle size={32} />
                <h3 className="text-2xl font-black uppercase tracking-tight">RESPONSABILIDADE DERMATOLÓGICA</h3>
             </div>
             <p className="text-orange-900/80 font-medium leading-relaxed text-sm">
                A nossa plataforma não oferece diagnóstico médico. As descrições dos produtos são baseadas em informações do fabricante. Recomendamos fortemente a consulta a um dermatologista antes da utilização de qualquer produto de alta potência (ex: Retinol, Ácidos, Vitamina C Pura). Em caso de reação adversa, suspenda o uso e procure orientação médica.
             </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-8 flex items-center gap-4">
               <span className="text-[#EC4899] font-serif italic text-4xl">04</span> PROPRIEDADE INTELECTUAL
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed">
              O design deste site, logos, textos e imagens são de propriedade exclusiva. A reprodução, cópia ou distribuição de qualquer elemento sem autorização prévia por escrito constitui crime de violação de direitos autorais, passível de medidas judiciais cíveis e criminais.
            </p>
          </section>
        </div>

        <footer className="mt-24 pt-12 border-t border-gray-100 text-center">
           <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em]">Época Cosméticos © 2024 - Todos os Termos Aplicáveis</p>
        </footer>
      </div>
    </div>
  );
};

export default Terms;
