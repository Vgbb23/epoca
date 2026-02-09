
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/mockProducts';
import ProductCard from '../components/ProductCard';
import { Product, Category } from '../types';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { categoryDescriptions } from './Home';

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (categoryName) {
      setFilteredProducts(products.filter(p => p.category === categoryName || categoryName === 'All'));
    } else {
      setFilteredProducts(products);
    }
    window.scrollTo(0, 0);
  }, [categoryName]);

  const currentDescription = categoryName ? categoryDescriptions[categoryName as Category] : "Cuidados dermatológicos especializados desenvolvidos com foco na eficácia e tolerância para peles sensíveis.";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-12">
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 uppercase tracking-tight">
          LINHA {categoryName}
        </h1>
        <div className="h-1.5 w-16 md:w-24 bg-[#BE185D] mb-6"></div>
        <p className="text-sm md:text-lg text-gray-600 max-w-3xl font-medium leading-relaxed">
          {currentDescription} Aproveite nossas <span className="text-[#BE185D] font-black underline">ofertas imperdíveis</span>.
        </p>
      </div>

      <div className="flex items-center justify-between border-y border-gray-100 py-4 md:py-6 mb-12 gap-4">
        <div className="flex items-center gap-4 md:gap-6">
          <button className="flex items-center gap-2 text-[10px] md:text-sm font-black text-gray-900 uppercase tracking-widest group">
            <Filter size={16} className="text-[#EC4899] md:w-5 md:h-5" /> FILTRAR
          </button>
          <button className="flex items-center gap-2 text-[10px] md:text-sm font-black text-gray-900 uppercase tracking-widest group">
            <SlidersHorizontal size={16} className="text-[#EC4899] md:w-5 md:h-5" /> ORDENAR
          </button>
        </div>
        <div className="text-[10px] md:text-sm font-bold text-gray-400">
          {filteredProducts.length} itens
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-10 md:gap-y-12">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="min-h-[40vh] flex flex-col items-center justify-center bg-gray-50 rounded-lg">
          <button onClick={() => window.history.back()} className="bg-[#BE185D] text-white px-6 py-3 font-bold rounded-sm">
            Voltar
          </button>
        </div>
      )}

      <div className="mt-20 md:mt-24 p-8 md:p-12 bg-pink-50/20 rounded-sm">
         <h2 className="text-xl md:text-2xl font-black text-[#BE185D] mb-6 uppercase tracking-wider">A CIÊNCIA POR TRÁS DE {categoryName}</h2>
         <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-medium mb-4">
            A linha {categoryName} é fruto de anos de pesquisa nos Laboratórios Dermatológicos La Roche-Posay. 
            Cada formulação é testada rigorosamente para garantir que até as peles mais reativas possam se beneficiar 
            de ingredientes ativos potentes.
         </p>
      </div>
    </div>
  );
};

export default CategoryPage;
