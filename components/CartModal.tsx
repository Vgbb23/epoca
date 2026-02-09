
import React from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-8 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-4">
            <div className="relative">
               <ShoppingBag className="text-[#BE185D]" size={28} />
               <span className="absolute -top-2 -right-2 bg-[#EC4899] text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                  {totalItems}
               </span>
            </div>
            <h2 className="text-2xl font-black text-[#BE185D] uppercase tracking-tighter">Minha Sacola</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition text-gray-400">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-60">
              <ShoppingBag size={64} className="text-gray-200 mb-6" />
              <p className="text-gray-900 font-black uppercase tracking-widest text-sm mb-4">Sua sacola está vazia</p>
              <button
                onClick={onClose}
                className="text-[#EC4899] font-black text-xs border-b-2 border-[#EC4899] pb-1 hover:pb-2 transition-all uppercase tracking-widest"
              >
                Escolher Produtos
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-6 pb-6 border-b border-gray-50 last:border-0 group">
                <div className="w-24 h-32 bg-gray-50 flex-shrink-0 border border-gray-100 rounded-sm p-2">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xs font-black text-gray-900 leading-tight uppercase tracking-tight">{item.name}</h3>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-[9px] text-[#EC4899] font-black uppercase tracking-widest mb-4">{item.category}</p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center border border-gray-200 rounded-sm h-8">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-full flex items-center justify-center hover:bg-gray-50 transition"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-xs font-black">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-full flex items-center justify-center hover:bg-gray-50 transition"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="text-right">
                       <span className="block text-[10px] text-gray-400 line-through font-bold">R$ {(item.originalPrice * item.quantity).toFixed(2)}</span>
                       <span className="block text-sm font-black text-[#BE185D]">R$ {(item.discountedPrice * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-8 bg-gray-50 border-t border-gray-100">
            <div className="space-y-3 mb-8">
              <div className="flex justify-between text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                <span>Subtotal</span>
                <span>R$ {totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-2xl font-black text-[#BE185D] pt-4 border-t border-gray-200">
                <span className="tracking-tighter uppercase">Total</span>
                <span className="tracking-tighter">R$ {totalPrice.toFixed(2)}</span>
              </div>
            </div>
            
            <button 
              onClick={handleCheckout}
              className="w-full bg-[#BE185D] text-white py-5 font-black uppercase tracking-widest hover:bg-[#EC4899] transition-all shadow-xl"
            >
              FINALIZAR COMPRA
            </button>
            <p className="text-center text-[9px] text-gray-400 mt-6 font-black uppercase tracking-[0.2em] italic">
               Ambiente 100% Seguro & Protegido
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
