
import React, { useMemo, useRef } from 'react';
import { products } from '../data/mockProducts';
import ProductCard from '../components/ProductCard';
import { Category } from '../types';
import { ArrowRight, Microscope, FlaskConical, ShieldCheck, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';

export const categoryDescriptions: Record<string, string> = {
  [Category.ANTHELIOS]: "Os produtos da linha Anthelios são pioneiros no segmento de proteção solar. Sua alta proteção de amplo espectro é o resultado de mais de 25 anos de pesquisas clínicas avançadas na área de proteção solar e sobre a pele sensível ao sol.",
  [Category.EFFACLAR]: "EFFACLAR é a linha completa para peles oleosas com tendência a acne e peles oleosas sensíveis ou sensibilizadas, garantindo alta eficácia e tolerância. Com o seu conhecimento único sobre a fisiologia da pele, os Laboratórios da La Roche-Posay desenvolveram uma gama que garante uma solução dermatológica para cada perfil de pele oleosa.",
  [Category.LIPIKAR]: "LIPIKAR é a primeira linha de hidratação e higienização corporal para peles sensíveis, muito secas e com ressecamento severo. Recomendado por dermatologistas.",
  [Category.HYALU_B5]: "A partir dos 25 anos o corpo vai diminuindo a produção de ácido hialurônico. Nossos produtos, que possuem ácido hialurônico, tem como principais benefícios a reposição dessa substância na pele, a redução de rugas e linhas finas, além de preencher e devolver a elasticidade. Respeitando a tolerância das peles sensíveis.",
  [Category.CICAPLAST]: "CICAPLAST é um creme multirreparador calmante que acalma, repara e protege a função de barreira da pele. Rico em ingredientes suavizantes e restauradores, como pantenol, manteiga de karité, madecassoside e Água Termal da La Roche-Posay. A linha CICAPLAST hidrata e repara a barreira cutânea.",
  [Category.RETINOL]: "O Retinol é reconhecido como um dos ativos anti-idade mais eficazes na dermatologia, pois atua na correção dos sinais de fotoenvelhecimento. Nossos produtos que possuem a molécula retinol, tem como principais benefícios a redução de rugas acentuadas, uniformização da tonalidade e textura da pele. Respeitando a tolerância das peles sensíveis.",
  [Category.VITAMINA_C]: "A Vitamina C é um dos ativos antirrugas mais prescritos por dermatologistas. Que age na recuperação da luminosidade da pele. Nossos produtos que possuem vitamina C Pura, tem como principais benefícios a redução de rugas e linhas finas, uniformização da textura e tonalidade da pele e suavização de poros dilatados. Respeitando a tolerância das peles sensíveis.",
  [Category.MELA_B3]: "A linha Mela-B3 é a solução nº1 para quem deseja uma rotina antimanchas eficaz. Formulada com Niacinamida + Melasyl ™, novo ativo patenteado para combater a hiperpigmentação como nunca antes. Melasyl™ tem um novo e único mecanismo de ação: ele intercepta o excesso de melanina antes que cause diferenças de tonalidade na pele."
};

const Home: React.FC = () => {
  const firstCategoryRef = useRef<HTMLElement>(null);

  const sortedCategories = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return Object.values(Category).sort((a, b) => (counts[b] || 0) - (counts[a] || 0));
  }, []);

  const scrollToProducts = () => {
    if (firstCategoryRef.current) {
      firstCategoryRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="pb-32">
      <section className="relative h-[500px] lg:h-[750px] flex items-center bg-[#FDF2F8] overflow-hidden mb-16 md:mb-24">
        <div className="absolute inset-0">
          <img
            src="https://i.ibb.co/Ng21RmK1/Untitled-design-2.png"
            alt="Ciência Época Cosméticos"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 md:via-white/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 w-full">
          <div className="max-w-xl animate-in fade-in slide-in-from-left duration-700">
            <div className="flex items-center gap-2 mb-6 md:mb-8">
               <span className="w-10 h-10 md:w-14 md:h-14 bg-[#EC4899] flex items-center justify-center rounded-sm text-white shadow-xl">
                  <Microscope size={24} className="md:w-8 md:h-8" />
               </span>
               <div className="flex flex-col">
                  <span className="text-[#BE185D] text-[10px] md:text-xs font-black tracking-[0.2em] uppercase">Revendedor Autorizado</span>
                  <span className="text-[#EC4899] text-[8px] md:text-[10px] font-bold uppercase tracking-widest">Procedência Garantida Época</span>
               </div>
            </div>
            <h1 className="text-4xl md:text-7xl lg:text-9xl font-black text-[#BE185D] leading-[0.9] md:leading-[0.82] mb-6 md:mb-10 uppercase tracking-tighter">
              A MELHOR <br /><span className="text-[#EC4899]">ESCOLHA</span>
            </h1>
            <p className="text-base md:text-xl text-gray-700 mb-8 md:mb-12 font-medium leading-relaxed border-l-4 border-[#EC4899] pl-4 md:pl-6">
               A Época Cosméticos traz para você a tecnologia de ponta da La Roche-Posay com ofertas exclusivas e entrega expressa. 
               <br/><strong className="text-[#BE185D] text-lg md:text-2xl font-black">SÓ NA ÉPOCA: 50% OFF EM DERMO-COSMÉTICOS.</strong>
            </p>
            <div className="flex">
              <button 
                onClick={scrollToProducts}
                className="bg-[#BE185D] text-white px-8 md:px-12 py-4 md:py-5 text-sm md:text-base font-black uppercase tracking-widest hover:bg-[#EC4899] transition-all shadow-2xl flex items-center gap-4 group"
              >
                 APROVEITAR OFERTAS <ArrowRight size={18} className="group-hover:translate-x-2 transition" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 lg:px-8 mb-16 md:mb-24">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 py-12 md:py-16 border-b border-gray-100">
            <div className="flex flex-col items-center text-center">
               <div className="w-12 h-12 md:w-16 md:h-16 bg-pink-50 text-[#EC4899] rounded-full flex items-center justify-center mb-4 md:mb-6">
                  <ShieldCheck size={24} className="md:w-8 md:h-8" />
               </div>
               <h4 className="text-[11px] md:text-sm font-black text-[#BE185D] uppercase tracking-widest mb-2 md:mb-3">100% ORIGINAL</h4>
               <p className="text-[10px] md:text-xs text-gray-500 font-medium">Produtos com selo de originalidade e nota fiscal emitida pela Época.</p>
            </div>
            <div className="flex flex-col items-center text-center">
               <div className="w-12 h-12 md:w-16 md:h-16 bg-pink-50 text-[#EC4899] rounded-full flex items-center justify-center mb-4 md:mb-6">
                  <FlaskConical size={24} className="md:w-8 md:h-8" />
               </div>
               <h4 className="text-[11px] md:text-sm font-black text-[#BE185D] uppercase tracking-widest mb-2 md:mb-3">ESTOQUE ÉPOCA</h4>
               <p className="text-[10px] md:text-xs text-gray-500 font-medium">Disponibilidade imediata e envio prioritário para todo o Brasil.</p>
            </div>
            <div className="flex flex-col items-center text-center">
               <div className="w-12 h-12 md:w-16 md:h-16 bg-pink-50 text-[#EC4899] rounded-full flex items-center justify-center mb-4 md:mb-6">
                  <Droplets size={24} className="md:w-8 md:h-8" />
               </div>
               <h4 className="text-[11px] md:text-sm font-black text-[#BE185D] uppercase tracking-widest mb-2 md:mb-3">SUPORTE ÉPOCA</h4>
               <p className="text-[10px] md:text-xs text-gray-500 font-medium">Equipe de atendimento pronta para te ajudar na escolha do tratamento.</p>
            </div>
         </div>
      </section>

      {sortedCategories.map((cat, index) => {
        const catProducts = products.filter(p => p.category === cat).slice(0, 4);
        if (catProducts.length === 0) return null;

        return (
          <section 
            key={cat} 
            ref={index === 0 ? firstCategoryRef : null}
            className={`${index % 2 !== 0 ? 'bg-pink-50/20 py-16 md:py-24' : 'py-16 md:py-24'}`}
          >
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
              <div className="mb-12 md:mb-16">
                <h2 className="text-3xl md:text-5xl font-black text-[#831843] mb-4 uppercase tracking-tight leading-none">
                  LINHA {cat}
                </h2>
                <div className="h-1.5 w-16 md:w-24 bg-[#BE185D] mb-6"></div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                  <p className="text-sm md:text-lg text-gray-600 max-w-3xl font-medium leading-relaxed">
                    {categoryDescriptions[cat]} <Link to={`/category/${cat}`} className="text-[#BE185D] font-black underline hover:text-[#EC4899] transition-colors whitespace-nowrap">Confira os preços na Época Cosméticos</Link>.
                  </p>
                  <Link to={`/category/${cat}`} className="bg-white border-2 border-[#BE185D] text-[#BE185D] px-6 md:px-8 py-2 md:py-3 font-black text-[10px] md:text-xs tracking-widest hover:bg-[#BE185D] hover:text-white transition-all flex items-center gap-3 uppercase flex-shrink-0">
                    Ver Tudo <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                {catProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="bg-[#BE185D] py-20 md:py-28 mt-16 md:mt-24 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-1/2 md:w-1/3 h-full opacity-10">
            <Microscope size={400} className="text-white" />
         </div>
         <div className="max-w-4xl mx-auto px-4 text-center text-white relative z-10">
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-black mb-6 md:mb-8 uppercase tracking-tighter">ÉPOCA COSMÉTICOS: SUA DERMO-FARMÁCIA ONLINE</h2>
            <p className="text-base md:text-xl opacity-80 mb-8 md:mb-12 font-medium">Os melhores cuidados dermatológicos com a conveniência e segurança que só a Época oferece.</p>
            <Link to={`/category/${Category.ANTHELIOS}`} className="inline-block bg-[#EC4899] text-white px-10 md:px-14 py-4 md:py-6 text-sm md:text-base font-black uppercase tracking-widest hover:bg-white hover:text-[#BE185D] transition-all shadow-2xl scale-100 md:scale-110">
               GARANTIR MEUS PRODUTOS AGORA
            </Link>
         </div>
      </section>
    </div>
  );
};

export default Home;
