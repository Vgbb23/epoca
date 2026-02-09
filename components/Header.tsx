
import React, { useState, useMemo, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/mockProducts';
import { Category } from '../types';
import { Link, useNavigate } from 'react-router-dom';

interface HeaderProps {
  onCartOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartOpen }) => {
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Adicionamos uma margem de segurança (hysteresis) para evitar o loop de abrir/fechar
      if (currentScrollY > 80) {
        setIsScrolled(true);
      } else if (currentScrollY < 10) {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sortedCategories = useMemo(() => {
    const counts: Record<string, number> = {};
    products.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return Object.values(Category).sort((a, b) => (counts[b] || 0) - (counts[a] || 0));
  }, []);

  return (
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${isScrolled ? 'shadow-md' : 'shadow-sm'}`}>
      {/* Banner de Topo - Usamos max-height para permitir animação suave */}
      <div className={`bg-[#EC4899] text-white text-center text-[9px] md:text-xs font-black tracking-[0.15em] uppercase px-4 transition-all duration-300 overflow-hidden ${isScrolled ? 'max-h-0 opacity-0' : 'max-h-10 py-1.5 md:py-2 opacity-100'}`}>
        ÉPOCA COSMÉTICOS: REVENDEDOR AUTORIZADO LA ROCHE-POSAY | OFERTAS DE ATÉ 50% OFF
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Container Principal do Logo e Ações */}
        <div className={`flex justify-between items-center border-b border-gray-50 transition-all duration-300 ${isScrolled ? 'h-16 md:h-20' : 'h-20 md:h-32 lg:h-36'}`}>
          <div className="flex md:hidden w-10">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#BE185D]">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className="flex-shrink-0 cursor-pointer py-2" onClick={() => navigate('/')}>
             <img 
               src="https://i.ibb.co/214wn6pS/2226d74285533c592b7603d888925a6c01923031.png" 
               alt="Época Cosméticos" 
               className={`w-auto object-contain transition-all duration-300 ${isScrolled ? 'h-7 md:h-10' : 'h-10 md:h-16 lg:h-20'} hover:scale-105`}
             />
          </div>

          <div className="flex items-center justify-end gap-1 md:gap-5 w-10 md:w-auto">
            <div className={`hidden md:flex items-center gap-6 mr-6 text-[11px] font-black text-[#BE185D] tracking-widest uppercase transition-opacity duration-300 ${isScrolled ? 'opacity-80' : 'opacity-100'}`}>
              <Link to="/sobre" className="hover:text-[#EC4899] transition-colors">Nossa Parceria</Link>
              <Link to="/contato" className="hover:text-[#EC4899] transition-colors">Atendimento</Link>
            </div>
            <button className="p-2 md:p-3 text-gray-400 hover:text-[#EC4899] transition">
              <Search size={22} className={`transition-all duration-300 ${isScrolled ? 'md:w-5 md:h-5' : 'md:w-6 md:h-6'}`} />
            </button>
            <button
              onClick={onCartOpen}
              className="relative p-2 md:p-3 text-gray-800 hover:text-[#EC4899] transition group"
            >
              <ShoppingBag size={24} className={`transition-all duration-300 ${isScrolled ? 'md:w-6 md:h-6' : 'md:w-7 md:h-7'}`} />
              {totalItems > 0 && (
                <span className={`absolute bg-[#EC4899] text-white font-black flex items-center justify-center rounded-full border-2 border-white shadow-md transition-all duration-300 ${isScrolled ? 'top-1 right-1 md:top-1 md:right-1 text-[7px] md:text-[8px] w-4 h-4 md:w-5 md:h-5' : 'top-1 right-1 md:top-0 md:right-0 text-[8px] md:text-[10px] w-5 h-5 md:w-6 md:h-6'}`}>
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Navegação de Categorias Desktop */}
        <nav className={`hidden xl:flex items-center justify-center gap-x-8 transition-all duration-300 overflow-hidden ${isScrolled ? 'h-10' : 'h-12'}`}>
          {sortedCategories.map((cat) => (
            <Link
              key={cat}
              to={`/category/${cat}`}
              className="text-[10px] font-black text-gray-900 hover:text-[#EC4899] border-b-2 border-transparent hover:border-[#EC4899] transition-all h-full flex items-center px-1 tracking-[0.15em] uppercase whitespace-nowrap"
            >
              {cat}
            </Link>
          ))}
        </nav>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white fixed inset-0 z-50 top-[64px] px-6 py-8 animate-in slide-in-from-left duration-300 overflow-y-auto border-t border-gray-100">
          <div className="flex flex-col gap-6 pb-20">
            <h3 className="text-[10px] font-black text-[#EC4899] uppercase tracking-[0.3em] mb-4">Nossas Linhas</h3>
            {sortedCategories.map((cat) => (
              <Link
                key={cat}
                to={`/category/${cat}`}
                onClick={() => setIsMenuOpen(false)}
                className="text-lg font-black text-gray-900 border-b border-gray-50 pb-5 uppercase tracking-tighter flex justify-between items-center"
              >
                {cat} <ChevronDown size={18} className="text-gray-300 -rotate-90" />
              </Link>
            ))}
            <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col gap-8">
              <Link to="/sobre" onClick={() => setIsMenuOpen(false)} className="text-sm font-black text-[#BE185D] uppercase tracking-widest">Sobre a Época</Link>
              <Link to="/contato" onClick={() => setIsMenuOpen(false)} className="text-sm font-black text-[#BE185D] uppercase tracking-widest">Fale Conosco</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
