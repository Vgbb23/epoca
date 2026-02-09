
import React from 'react';
import { Mail, Phone, MapPin, MessageSquare, Clock, Globe, ChevronRight } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Header Section */}
      <section className="py-24 md:py-32 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-pink-50 text-[#EC4899] px-4 py-2 rounded-full mb-8">
             <MessageSquare size={16} />
             <span className="text-[10px] font-black uppercase tracking-widest">Centro de Atendimento</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-gray-900 uppercase tracking-tighter mb-8">COMO PODEMOS <br/><span className="text-[#BE185D]">TE AJUDAR?</span></h1>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Nossa equipe de especialistas está pronta para tirar suas dúvidas sobre produtos, pedidos e entregas.
          </p>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Contact Info */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-8">Canais Diretos</h2>
              <div className="space-y-6">
                 <div className="flex items-center gap-6 p-6 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all rounded-sm group">
                    <div className="w-14 h-14 bg-pink-50 text-[#EC4899] rounded-full flex items-center justify-center group-hover:bg-[#BE185D] group-hover:text-white transition-all">
                       <Mail size={24} />
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">E-mail Suporte</p>
                       <p className="text-lg font-black text-gray-900 lowercase">atendimento@epocacosmeticos.com.br</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-6 p-6 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all rounded-sm group">
                    <div className="w-14 h-14 bg-pink-50 text-[#EC4899] rounded-full flex items-center justify-center group-hover:bg-[#BE185D] group-hover:text-white transition-all">
                       <Phone size={24} />
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Televendas / SAC</p>
                       <p className="text-lg font-black text-gray-900">4020-0230 / (11) 98765-4321</p>
                    </div>
                 </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-8">Nossa Base</h2>
              <div className="space-y-6">
                 <div className="flex gap-6">
                    <MapPin className="text-[#EC4899] flex-shrink-0" size={24} />
                    <div>
                       <h4 className="font-black text-gray-900 uppercase text-xs mb-2">Centro de Distribuição</h4>
                       <p className="text-sm text-gray-500 font-medium leading-relaxed">
                          Rua Maria Margarida Pinto Dona Belinha, 742<br />
                          Extrema - MG, 37642-908
                       </p>
                    </div>
                 </div>
                 <div className="flex gap-6">
                    <Clock className="text-[#EC4899] flex-shrink-0" size={24} />
                    <div>
                       <h4 className="font-black text-gray-900 uppercase text-xs mb-2">Horário de Operação</h4>
                       <p className="text-sm text-gray-500 font-medium">
                          Segunda a Sexta: 08:00 às 20:00<br />
                          Sábados: 09:00 às 13:00
                       </p>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
             <div className="bg-white p-8 md:p-14 shadow-2xl border border-gray-50 rounded-sm">
                <h3 className="text-3xl font-black text-[#BE185D] uppercase tracking-tighter mb-10 leading-none">Mande uma Mensagem</h3>
                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="flex flex-col gap-2">
                         <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nome Completo</label>
                         <input type="text" className="bg-gray-50 border border-gray-100 p-4 text-sm outline-none focus:border-[#EC4899]" placeholder="Sua identificação" />
                      </div>
                      <div className="flex flex-col gap-2">
                         <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">E-mail de Contato</label>
                         <input type="email" className="bg-gray-50 border border-gray-100 p-4 text-sm outline-none focus:border-[#EC4899]" placeholder="seu@email.com" />
                      </div>
                   </div>
                   <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Assunto</label>
                      <select className="bg-gray-50 border border-gray-100 p-4 text-sm outline-none focus:border-[#EC4899]">
                         <option>Dúvida sobre Produto</option>
                         <option>Status do Pedido</option>
                         <option>Trocas e Devoluções</option>
                         <option>Elogios / Reclamações</option>
                         <option>Parcerias e Marketplace</option>
                      </select>
                   </div>
                   <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sua Mensagem</label>
                      <textarea rows={5} className="bg-gray-50 border border-gray-100 p-4 text-sm outline-none focus:border-[#EC4899]" placeholder="Como podemos ajudar detalhadamente?"></textarea>
                   </div>
                   <button className="w-full bg-[#BE185D] text-white py-6 font-black uppercase tracking-widest hover:bg-[#EC4899] transition-all shadow-xl flex items-center justify-center gap-3">
                      ENVIAR MENSAGEM <ChevronRight size={20} />
                   </button>
                </form>
             </div>
          </div>
        </div>
      </section>

      {/* Social Banner */}
      <section className="py-20 bg-gray-900">
         <div className="max-w-7xl mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-center md:text-left">
               <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter mb-2">Siga nossa ciência</h3>
               <p className="text-white/40 font-medium text-sm md:text-lg">Dicas diárias de skincare e ofertas exclusivas no Instagram.</p>
            </div>
            <div className="flex gap-6">
               <div className="w-16 h-16 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-[#EC4899] transition-all cursor-pointer">
                  <Globe size={24} />
               </div>
               <div className="w-16 h-16 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-[#EC4899] transition-all cursor-pointer">
                  <MessageSquare size={24} />
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Contact;
