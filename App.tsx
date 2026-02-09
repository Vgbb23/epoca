
import React, { useState, useEffect, useRef } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import CategoryPage from './pages/CategoryPage';
import Checkout from './pages/Checkout';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import CartModal from './components/CartModal';

// Componente para garantir que a página sempre role para o topo ao mudar de rota
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Handler para carga inicial
const InitialLoadHandler = () => {
  const navigate = useNavigate();
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (!hasInitialized) {
      if (window.location.hash !== '#/' && !window.location.hash.includes('#/checkout') && !window.location.hash.includes('#/product') && !window.location.hash.includes('#/category') && !window.location.hash.includes('#/sobre') && !window.location.hash.includes('#/privacidade') && !window.location.hash.includes('#/termos') && !window.location.hash.includes('#/contato')) {
        navigate('/', { replace: true });
      }
      setHasInitialized(true);
    }
  }, [hasInitialized, navigate]);

  return <ScrollToTop />;
};

// Componente para monitorar a primeira adição ao carrinho
const CartAutoOpenTrigger = ({ onOpen }: { onOpen: () => void }) => {
  const { totalItems } = useCart();
  const hasTriggered = useRef(false);

  useEffect(() => {
    // Se houver itens e ainda não disparou a abertura automática nesta sessão
    if (totalItems > 0 && !hasTriggered.current) {
      onOpen();
      hasTriggered.current = true;
    }
  }, [totalItems, onOpen]);

  return null;
};

const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <CartProvider>
      <Router>
        <InitialLoadHandler />
        {/* Acionador de abertura automática inserido dentro do provedor */}
        <CartAutoOpenTrigger onOpen={() => setIsCartOpen(true)} />
        
        <div className="min-h-screen flex flex-col bg-white">
          <Header onCartOpen={() => setIsCartOpen(true)} />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/category/:categoryName" element={<CategoryPage />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/sobre" element={<About />} />
              <Route path="/privacidade" element={<PrivacyPolicy />} />
              <Route path="/termos" element={<Terms />} />
              <Route path="/contato" element={<Contact />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />

          <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
