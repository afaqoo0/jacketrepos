import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { ProductsView } from './views/ProductsView';
import { ShowroomsView } from './views/ShowroomsView';
import { AboutView } from './views/AboutView';
import { LeadershipView } from './views/LeadershipView';
import { SuppliersView } from './views/SuppliersView';
import { BlogsView } from './views/BlogsView';
import { ContactView } from './views/ContactView';
import { AdminLoginView } from './views/admin/AdminLoginView';
import { AdminDashboardView } from './views/admin/AdminDashboardView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { WhatsAppOrderModal } from './components/WhatsAppOrderModal';
import { LoadingSpinner } from './components/LoadingSpinner';

const MainContent: React.FC = () => {
  const { 
    activeTab, 
    selectedProduct, 
    setSelectedProduct, 
    whatsAppModalProduct, 
    setWhatsAppModalProduct,
    isAdminAuthenticated,
    loading
  } = useStore();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900 selection:bg-slate-900 selection:text-white font-sans">
      <Navbar />

      <main className="flex-1">
        {loading && <LoadingSpinner fullScreen label="Connecting to TS Sports database..." />}
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'products' && <ProductsView />}
        {activeTab === 'showrooms' && <ShowroomsView />}
        {activeTab === 'about' && <AboutView />}
        {activeTab === 'leadership' && <LeadershipView />}
        {activeTab === 'suppliers' && <SuppliersView />}
        {activeTab === 'blogs' && <BlogsView />}
        {activeTab === 'contact' && <ContactView />}
        {activeTab === 'admin-login' && <AdminLoginView />}
        {activeTab === 'admin-dashboard' && (isAdminAuthenticated ? <AdminDashboardView /> : <AdminLoginView />)}
      </main>

      <Footer />

      {/* Global Product Details Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Global WhatsApp Prefilled Order Generator Modal */}
      {whatsAppModalProduct && (
        <WhatsAppOrderModal
          product={whatsAppModalProduct}
          onClose={() => setWhatsAppModalProduct(null)}
        />
      )}
    </div>
  );
};

export function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}

export default App;
