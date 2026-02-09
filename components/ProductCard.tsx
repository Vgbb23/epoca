
import React from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Plus, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = React.useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group flex flex-col bg-white border border-gray-100 hover:shadow-2xl transition-all duration-500 relative rounded-sm overflow-hidden">
      <Link to={`/product/${product.id}`} className="block relative aspect-[4/5] bg-gray-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-[#BE185D]/0 group-hover:bg-[#BE185D]/5 transition-colors duration-500" />
      </Link>

      <div className="p-3 md:p-6 flex flex-col flex-1">
        <span className="text-[#EC4899] text-[7px] md:text-[9px] font-black uppercase tracking-[0.2em] mb-1 md:mb-2">
          {product.category}
        </span>
        
        <Link to={`/product/${product.id}`} className="block flex-1 mb-2 md:mb-4">
          <h3 className="text-gray-900 font-black text-[10px] md:text-sm leading-tight uppercase tracking-tight group-hover:text-[#EC4899] transition-colors mb-1 md:mb-2 line-clamp-2 h-[2.5em] md:h-auto">
            {product.name}
          </h3>
          <p className="hidden md:block text-gray-500 text-[11px] font-medium leading-tight line-clamp-1 h-[1.2em]">
            {product.description}
          </p>
        </Link>

        <div className="hidden md:flex gap-2 mb-4 overflow-hidden h-[18px]">
           <span className="text-[9px] bg-gray-50 text-gray-400 font-bold px-2 py-0.5 whitespace-nowrap border border-gray-100 uppercase">{product.skinType}</span>
        </div>

        <div className="flex flex-col mb-3 md:mb-6">
             <span className="text-gray-300 text-[9px] md:text-[11px] line-through font-bold">
                R$ {product.originalPrice.toFixed(2)}
             </span>
             <span className="text-sm md:text-2xl font-black text-gray-900 tracking-tighter">
                R$ {product.discountedPrice.toFixed(2)}
             </span>
        </div>

        <button
          onClick={handleAdd}
          className={`w-full flex items-center justify-center gap-1 md:gap-2 py-2.5 md:py-4 text-[8px] md:text-[10px] font-black uppercase tracking-widest transition-all shadow-md ${
            added ? 'bg-green-600 text-white' : 'bg-[#BE185D] text-white hover:bg-[#EC4899]'
          }`}
        >
          {added ? (
            <>
              <Check size={12} className="md:w-4 md:h-4" /> ADICIONADO
            </>
          ) : (
            <>
              <Plus size={12} className="md:w-4 md:h-4" /> COMPRAR
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
