
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/mockProducts';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { Check, Truck, ShieldCheck, Minus, Plus, ChevronLeft, Microscope, FlaskConical, Droplets } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'usage' | 'ingredients'>('details');

  useEffect(() => {
    const found = products.find((p) => p.id === id);
    if (found) {
      setProduct(found);
    }
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Microscope size={48} className="text-[#EC4899] mb-4" />
        <h2 className="text-2xl font-black text-gray-900 mb-4 uppercase">Produto não encontrado</h2>
        <button onClick={() => navigate('/')} className="text-[#BE185D] font-bold border-b-2 border-[#EC4899]">
          Voltar para a home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[#BE185D] font-black text-xs mb-12 hover:translate-x-1 transition-transform tracking-widest uppercase"
      >
        <ChevronLeft size={18} /> Voltar para a lista
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
        <div className="lg:col-span-7 space-y-6">
          <div className="aspect-[4/5] bg-white border border-gray-100 overflow-hidden relative shadow-sm">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain p-8"
            />
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
               <span className="text-[#EC4899] text-[10px] font-black tracking-[0.3em] uppercase">{product.category}</span>
               <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
               <span className="text-gray-400 text-[10px] font-black tracking-[0.1em] uppercase">{product.brand}</span>
            </div>
            <h1 className="text-4xl xl:text-5xl font-black text-[#BE185D] leading-tight mb-8 uppercase tracking-tighter">
               {product.name}
            </h1>
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-[#EC4899]/30" />
              <p className="text-xl text-gray-700 font-medium leading-relaxed italic">
                 {product.description}
              </p>
            </div>
          </div>

          <div className="bg-pink-50 p-8 mb-10 border border-gray-100">
             <div className="flex items-center gap-3 mb-2">
                <span className="text-gray-400 line-through text-lg font-bold">R$ {product.originalPrice.toFixed(2)}</span>
                <span className="bg-green-100 text-green-700 text-[9px] font-black px-2 py-1 uppercase tracking-wider rounded-full">
                   Você economiza R$ {(product.originalPrice - product.discountedPrice).toFixed(2)}
                </span>
             </div>
             <div className="text-5xl font-black text-gray-900 tracking-tighter mb-4">
                R$ {product.discountedPrice.toFixed(2)}
             </div>
             <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                Em até 12x sem juros de R$ {(product.discountedPrice/12).toFixed(2)}
             </p>
          </div>

          <div className="space-y-6 mb-12">
            <div className="flex gap-4">
              <div className="flex items-center border-2 border-gray-200 h-16 w-36">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="flex-1 h-full flex items-center justify-center hover:bg-gray-50 transition"
                >
                  <Minus size={20} />
                </button>
                <span className="w-10 text-center font-black text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="flex-1 h-full flex items-center justify-center hover:bg-gray-50 transition"
                >
                  <Plus size={20} />
                </button>
              </div>
              <button
                onClick={() => {
                  for(let i=0; i<quantity; i++) addToCart(product);
                  setQuantity(1);
                }}
                className="flex-1 bg-[#BE185D] text-white h-16 font-black uppercase tracking-widest hover:bg-[#EC4899] transition-all shadow-xl"
              >
                Adicionar à Sacola
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="flex flex-col gap-1 p-4 bg-pink-50/50 rounded-sm">
                  <span className="text-[10px] font-black text-[#BE185D] uppercase tracking-widest flex items-center gap-2">
                     <Truck size={14} /> Frete
                  </span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase">GRÁTIS HOJE</span>
               </div>
               <div className="flex flex-col gap-1 p-4 bg-pink-50/50 rounded-sm">
                  <span className="text-[10px] font-black text-[#BE185D] uppercase tracking-widest flex items-center gap-2">
                     <ShieldCheck size={14} /> Garantia
                  </span>
                  <span className="text-[10px] text-gray-500 font-bold uppercase">ORIGINAL FABRICANTE</span>
               </div>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-10">
             <div className="flex gap-8 border-b border-gray-100 mb-8">
                {(['details', 'usage', 'ingredients'] as const).map(tab => (
                   <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-[10px] font-black uppercase tracking-widest transition-all relative ${
                      activeTab === tab ? 'text-[#EC4899]' : 'text-gray-400'
                    }`}
                   >
                    {tab === 'details' ? 'Destaques' : tab === 'usage' ? 'Como Usar' : 'Ativos'}
                    {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#EC4899]" />}
                   </button>
                ))}
             </div>

             <div className="animate-in fade-in duration-500">
                {activeTab === 'details' && (
                   <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-8">
                         <div>
                            <h4 className="text-[10px] font-black text-[#BE185D] mb-3 uppercase tracking-widest flex items-center gap-2">
                               <Droplets size={14} /> Tipo de Pele
                            </h4>
                            <p className="text-sm text-gray-600 font-medium">{product.skinType}</p>
                         </div>
                         <div>
                            <h4 className="text-[10px] font-black text-[#BE185D] mb-3 uppercase tracking-widest flex items-center gap-2">
                               <FlaskConical size={14} /> Textura
                            </h4>
                            <p className="text-sm text-gray-600 font-medium">{product.texture}</p>
                         </div>
                      </div>
                      <div>
                         <h4 className="text-[10px] font-black text-[#BE185D] mb-4 uppercase tracking-widest">Principais Benefícios</h4>
                         <ul className="grid grid-cols-1 gap-3">
                            {product.benefits.map((b, i) => (
                               <li key={i} className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                                  <Check size={16} className="text-[#EC4899] flex-shrink-0" /> {b}
                               </li>
                            ))}
                         </ul>
                      </div>
                   </div>
                )}
                {activeTab === 'usage' && (
                   <p className="text-sm text-gray-600 leading-relaxed font-medium bg-gray-50 p-6 italic border-l-4 border-[#EC4899]">
                      "{product.howToUse}"
                   </p>
                )}
                {activeTab === 'ingredients' && (
                   <div className="flex flex-wrap gap-2">
                      {product.ingredients.map((ing, i) => (
                         <span key={i} className="text-[10px] bg-white border border-gray-100 px-3 py-1.5 rounded-full font-bold text-gray-600 uppercase tracking-wider">
                            {ing}
                         </span>
                      ))}
                   </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
