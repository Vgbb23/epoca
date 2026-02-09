
import React from 'react';
import { Microscope, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          <div className="md:col-span-4">
            <div className="mb-10">
               <img 
                 src="https://i.ibb.co/214wn6pS/2226d74285533c592b7603d888925a6c01923031.png" 
                 alt="Época Cosméticos" 
                 className="h-12 md:h-16 lg:h-20 w-auto object-contain"
               />
            </div>
            <p className="text-sm text-gray-500 font-medium leading-relaxed mb-8">
               A Época Cosméticos é revendedora autorizada La Roche-Posay. Oferecemos o catálogo completo de 
               cuidados especializados com a garantia de procedência e suporte oficial da marca.
            </p>
            <div className="flex gap-4">
               {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-[#EC4899] hover:border-[#EC4899] transition-all">
                     <Icon size={22} />
                  </a>
               ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[11px] font-black text-[#BE185D] uppercase tracking-widest mb-8">A ÉPOCA</h4>
            <ul className="space-y-4 text-xs font-bold text-gray-500">
              <li><Link to="/sobre" className="hover:text-[#EC4899]">Nossa História</Link></li>
              <li><Link to="/sobre" className="hover:text-[#EC4899]">Revendedor Autorizado</Link></li>
              <li><Link to="/sobre" className="hover:text-[#EC4899]">Sustentabilidade</Link></li>
              <li><Link to="/sobre" className="hover:text-[#EC4899]">Trabalhe Conosco</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-[11px] font-black text-[#BE185D] uppercase tracking-widest mb-8">SUPORTE</h4>
            <ul className="space-y-4 text-xs font-bold text-gray-500">
              <li><Link to="/contato" className="hover:text-[#EC4899]">Fale Conosco</Link></li>
              <li><Link to="/termos" className="hover:text-[#EC4899]">Envio e Frete</Link></li>
              <li><Link to="/termos" className="hover:text-[#EC4899]">Trocas e Devoluções</Link></li>
              <li><Link to="/privacidade" className="hover:text-[#EC4899]">Privacidade</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-[11px] font-black text-[#BE185D] uppercase tracking-widest mb-8">NEWSLETTER ÉPOCA</h4>
            <p className="text-xs text-gray-500 font-medium mb-6">Receba as melhores ofertas de dermo-cosméticos diretamente no seu e-mail.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
               <input 
                  type="email" 
                  placeholder="Seu melhor e-mail" 
                  className="flex-1 bg-gray-50 border border-gray-100 px-4 py-4 text-xs font-medium focus:outline-none focus:border-[#EC4899]"
               />
               <button className="bg-[#BE185D] text-white px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-[#EC4899] transition-all">
                  ASSINAR
               </button>
            </form>
          </div>
        </div>

        <div className="pt-12 border-t border-gray-50 flex flex-col gap-8">
           <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                 <Microscope size={14} className="text-[#EC4899]" /> PARCEIRO OFICIAL LA ROCHE-POSAY
              </div>
              <div className="text-[10px] text-gray-400 font-medium text-center md:text-right">
                 © 2024 ÉPOCA COSMÉTICOS. TODOS OS DIREITOS RESERVADOS.<br />
                 <span className="opacity-50 font-black uppercase">REVENDEDOR AUTORIZADO - PRODUTOS ORIGINAIS COM NOTA FISCAL.</span>
              </div>
           </div>
           
           <div className="bg-gray-50 p-6 rounded-sm text-center md:text-left">
              <p className="text-[9px] text-gray-400 font-medium leading-relaxed uppercase tracking-tight">
                Época Cosméticos Perfumaria | 4020-0230 | site.sac@epocacosmeticos.com.br (por favor, entre em contato conosco através do formulário de atendimento) | www.epocacosmeticos.com.br 
                Razão Social: Campos Floridos Comercio de Cosmeticos Ltda | CNPJ: 01.239.313/0004-02 
                Rua Maria Margarida Pinto Dona Belinha, 742 (CD Magalu- Época Cosméticos) Cond. Fernão Dias Business Park, Galpão 9 - Bairro dos Pires Extrema - MG 37642-908 (não realizamos vendas no local). 
                O preço válido será o da finalização da compra. Vendas sujeitas à análise de dados. Brindes não são vendidos. Brindes, cupons e descontos não são cumulativos. 
                As imagens em nosso site são meramente ilustrativas. *Política de frete grátis não inclui compras em parcerias do tipo marketplace.
              </p>
           </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
