
import React from 'react';
// Fix: Import Link from react-router-dom to resolve "Cannot find name 'Link'" errors
import { Link } from 'react-router-dom';
import { Microscope, Heart, ShieldCheck, FlaskConical, Award, Globe, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-24 md:py-40 bg-pink-50/40 overflow-hidden relative border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-9xl font-black text-[#BE185D] uppercase tracking-tighter leading-[0.8] mb-12">
              ÉPOCA & <br/><span className="text-[#EC4899]">CIÊNCIA.</span>
            </h1>
            <p className="text-xl md:text-3xl text-gray-700 font-medium leading-relaxed border-l-8 border-[#EC4899] pl-8 italic max-w-2xl">
              Como revendedor autorizado, a Época Cosméticos conecta você à excelência dermatológica da La Roche-Posay.
            </p>
          </div>
        </div>
        <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
          <Microscope size={800} className="text-[#BE185D]" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white border-b border-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, val: '100%', label: 'Produtos Originais' },
              { icon: Users, val: 'Milhões', label: 'Clientes Época' },
              { icon: Globe, val: 'Brasil', label: 'Entrega em todo o país' },
              { icon: Award, val: 'Autorizado', label: 'Parceiro Oficial' }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center p-8 bg-gray-50/50 rounded-sm">
                <stat.icon size={28} className="text-[#EC4899] mb-4" />
                <span className="text-4xl font-black text-gray-900 mb-1">{stat.val}</span>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-tight">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-10">
            <div>
              <h2 className="text-[11px] font-black text-[#EC4899] uppercase tracking-[0.5em] mb-4">A Época Cosméticos</h2>
              <h3 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-8">CURADORIA DERMATOLÓGICA DE ELITE.</h3>
              <p className="text-lg text-gray-600 font-medium leading-relaxed">
                A Época Cosméticos nasceu com o propósito de democratizar a beleza e o cuidado com a pele no Brasil. Como parceiros estratégicos da La Roche-Posay, garantimos que cada frasco que chega à sua casa possua a integridade e a tecnologia francesa original.
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="text-[#EC4899]" />
                </div>
                <div>
                  <h4 className="font-black text-[#BE185D] uppercase text-sm mb-1">Selos de Garantia</h4>
                  <p className="text-sm text-gray-500 font-medium">Todos os produtos possuem selos de importação oficial e autorização da ANVISA.</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-pink-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="text-[#EC4899]" />
                </div>
                <div>
                  <h4 className="font-black text-[#BE185D] uppercase text-sm mb-1">Compromisso com o Cliente</h4>
                  <p className="text-sm text-gray-500 font-medium">Suporte especializado Época para te guiar na melhor rotina de skincare.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] bg-gray-100 overflow-hidden rounded-sm shadow-2xl">
               <img src="https://i.ibb.co/Ng21RmK1/Untitled-design-2.png" alt="Época Lab" className="w-full h-full object-cover grayscale opacity-80" />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-12 shadow-2xl border border-gray-100 hidden md:block">
               <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">AUTORIZADO PELA</span>
               <img src="https://i.ibb.co/214wn6pS/2226d74285533c592b7603d888925a6c01923031.png" alt="LRP" className="h-8 w-auto opacity-50" />
            </div>
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="bg-gray-900 py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8">COMPRE COM TOTAL SEGURANÇA</h2>
          <p className="text-white/60 text-lg md:text-xl font-medium max-w-3xl mx-auto mb-12">
            Na Época Cosméticos, sua experiência é nossa prioridade. Oferecemos pagamento facilitado, frete grátis e a certeza de estar adquirindo o melhor do cuidado dermatológico mundial.
          </p>
          <Link to="/" className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-4 font-black uppercase tracking-widest text-xs">
            Voltar para a Loja
          </Link>
        </div>
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      </section>
    </div>
  );
};

export default About;
