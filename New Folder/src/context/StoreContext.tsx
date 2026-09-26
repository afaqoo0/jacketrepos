import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, Blog, Showroom, Leadership, Supplier, Inquiry, SiteSettings, ActiveTab } from '../types';
import * as authService from '../lib/services/auth';
import * as productService from '../lib/services/products';
import * as blogService from '../lib/services/blogs';
import * as showroomService from '../lib/services/showrooms';
import * as leadershipService from '../lib/services/leadership';
import * as supplierService from '../lib/services/suppliers';
import * as inquiryService from '../lib/services/inquiries';
import * as settingService from '../lib/services/settings';

interface StoreContextType {
  // Navigation State
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;

  // Selected Items for Modals
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  selectedBlog: Blog | null;
  setSelectedBlog: (blog: Blog | null) => void;
  whatsAppModalProduct: Product | null;
  setWhatsAppModalProduct: (product: Product | null) => void;

  // Admin Auth State
  isAdminAuthenticated: boolean;
  adminUser: string | null;
  loginAdmin: (email: string, pass: string) => Promise<boolean>;
  logoutAdmin: () => void;

  // Data Collections
  products: Product[];
  blogs: Blog[];
  showrooms: Showroom[];
  leadership: Leadership[];
  suppliers: Supplier[];
  inquiries: Inquiry[];
  settings: SiteSettings;

  // Global Loading State
  loading: boolean;
  isBackendConnected: boolean;

  // Product CRUD
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;

  // Blog CRUD
  addBlog: (blog: Omit<Blog, 'id' | 'publishedAt'>) => Promise<void>;
  updateBlog: (id: string, blog: Partial<Blog>) => Promise<void>;
  deleteBlog: (id: string) => Promise<void>;

  // Showroom CRUD
  addShowroom: (showroom: Omit<Showroom, 'id'>) => Promise<void>;
  updateShowroom: (id: string, showroom: Partial<Showroom>) => Promise<void>;
  deleteShowroom: (id: string) => Promise<void>;

  // Leadership CRUD
  addLeadership: (person: Omit<Leadership, 'id'>) => Promise<void>;
  updateLeadership: (id: string, person: Partial<Leadership>) => Promise<void>;
  deleteLeadership: (id: string) => Promise<void>;

  // Supplier CRUD
  addSupplier: (supplier: Omit<Supplier, 'id'>) => Promise<void>;
  updateSupplier: (id: string, supplier: Partial<Supplier>) => Promise<void>;
  deleteSupplier: (id: string) => Promise<void>;

  // Inquiries
  submitInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  updateInquiryStatus: (id: string, status: 'new' | 'replied' | 'archived') => Promise<void>;

  // Site Settings
  updateSettings: (newSettings: Partial<SiteSettings>) => Promise<void>;

  // Search and Filter Helper
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;

  // Refresh data from Backend API
  refreshData: () => Promise<void>;
}

const defaultSettings: SiteSettings = {
  brandName: 'TS Sports',
  slogan: 'Elevate Your Performance with Elite Athletic Wear',
  whatsappNumber: '03085410293',
  contactEmail: 'sportspakistan10@gmail.com',
  contactPhone: '+92 308 5410293',
  address: 'Industrial Estate, Sialkot, Punjab, Pakistan',
  instagramUrl: 'http://instagram.com/tssports1018?utm_source=qr',
  tiktokUrl: 'https://www.tiktok.com/@tssports10?_r=1&_t=ZS-99y6lu5Ngs1',
  youtubeUrl: 'https://youtube.com/@tssports',
  facebookUrl: 'https://facebook.com/tssports',
  metaTitle: 'TS Sports | Premium Sports & Athletic Gear',
  metaDescription: 'Leading manufacturer of elite sports grip socks, athletic compression wear, and team edition accessories.',
};

// All data is loaded from the database. No dummy/fallback data.

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>(
    window.location.pathname.startsWith('/admin') ? 'admin-dashboard' : 'home'
  );
  
  // Cleanup URL if they came in via /admin so it doesn't look weird if they navigate away
  useEffect(() => {
    if (window.location.pathname.startsWith('/admin')) {
      window.history.replaceState({}, '', '/');
    }
  }, []);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [whatsAppModalProduct, setWhatsAppModalProduct] = useState<Product | null>(null);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Loading & Backend status
  const [loading, setLoading] = useState(true);
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // Auth State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(Boolean(authService.getAdminSessionToken()));
  const [adminUser, setAdminUser] = useState<string | null>(authService.getAdminSessionToken() ? 'Admin' : null);

  // Data Collections
  const [products, setProducts] = useState<Product[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [showrooms, setShowrooms] = useState<Showroom[]>([]);
  const [leadership, setLeadership] = useState<Leadership[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);

  // Refresh Data from Backend API
  const refreshData = async () => {
    setLoading(true);
    try {
      const [
        fetchedProducts,
        fetchedBlogs,
        fetchedShowrooms,
        fetchedLeadership,
        fetchedSuppliers,
        fetchedInquiries,
        fetchedSettings,
      ] = await Promise.all([
        productService.fetchProducts(),
        blogService.fetchBlogs(),
        showroomService.fetchShowrooms(),
        leadershipService.fetchLeadership(),
        supplierService.fetchSuppliers(),
        isAdminAuthenticated ? inquiryService.fetchInquiries() : Promise.resolve([]),
        settingService.fetchSiteSettings(),
      ]);

      // Always set data from backend, even if empty (so deleted items disappear)
      setProducts(fetchedProducts);
      setBlogs(fetchedBlogs);
      setShowrooms(fetchedShowrooms);
      setLeadership(fetchedLeadership);
      setSuppliers(fetchedSuppliers);
      setInquiries(fetchedInquiries);
      if (Object.keys(fetchedSettings).length > 0) {
        setSettings((prev) => ({ ...prev, ...fetchedSettings }));
      }
      setIsBackendConnected(true);
    } catch (err) {
      console.warn('Backend API unavailable, using fallback data:', err);
      setIsBackendConnected(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, [isAdminAuthenticated]);

  // Auth Methods
  const loginAdmin = async (email: string, pass: string): Promise<boolean> => {
    try {
      const auth = await authService.loginAdmin(email, pass);
      if (auth.token) {
        setIsAdminAuthenticated(true);
        setAdminUser(auth.user.email || email);
        return true;
      }
    } catch (error) {
      console.warn('API Auth failed:', error);
    }

    return false;
  };

  const logoutAdmin = () => {
    authService.logoutAdmin();
    setIsAdminAuthenticated(false);
    setAdminUser(null);
    if (activeTab === 'admin-dashboard') {
      setActiveTab('home');
    }
  };

  // Product CRUD
  const addProduct = async (productData: Omit<Product, 'id' | 'createdAt'>) => {
    try {
      const created = await productService.createProduct(productData);
      setProducts((prev) => [created, ...prev]);
    } catch (error: any) {
      console.error('Failed to add product to backend:', error);
      alert(`Error saving product: ${error.message || 'Check console'}`);
      throw error; // Throw so the UI can know it failed!
    }
  };

  const updateProduct = async (id: string, updatedFields: Partial<Product>) => {
    try {
      const updated = await productService.updateProduct(id, updatedFields);
      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    } catch (error: any) {
      console.error('Failed to update product in backend:', error);
      alert(`Error updating product: ${error.message || 'Check console'}`);
      throw error;
    }
  };

  const deleteProduct = async (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    try {
      await productService.deleteProduct(id);
    } catch (error) {
      console.warn('Backend delete failed, removed locally:', error);
    }
  };

  // Blog CRUD
  const addBlog = async (blogData: Omit<Blog, 'id' | 'publishedAt'>) => {
    try {
      const created = await blogService.createBlog({
        ...blogData,
        status: blogData.status || 'published',
      });
      setBlogs((prev) => [created, ...prev]);
    } catch (error: any) {
      console.error('Failed to add blog:', error);
      alert(`Error saving blog: ${error.message || 'Check console'}`);
      throw error;
    }
  };

  const updateBlog = async (id: string, updatedFields: Partial<Blog>) => {
    try {
      const updated = await blogService.updateBlog(id, updatedFields);
      setBlogs((prev) => prev.map((b) => (b.id === id ? updated : b)));
    } catch (error: any) {
      console.error('Failed to update blog:', error);
      alert(`Error updating blog: ${error.message || 'Check console'}`);
      throw error;
    }
  };

  const deleteBlog = async (id: string) => {
    try {
      await blogService.deleteBlog(id);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (error: any) {
      console.error('Failed to delete blog:', error);
      alert(`Error deleting blog: ${error.message || 'Check console'}`);
      throw error;
    }
  };

  // Showroom CRUD
  const addShowroom = async (showroomData: Omit<Showroom, 'id'>) => {
    try {
      const created = await showroomService.createShowroom(showroomData);
      setShowrooms((prev) => [...prev, created]);
    } catch (error: any) {
      console.error('Failed to add showroom:', error);
      alert(`Error saving showroom: ${error.message || 'Check console'}`);
      throw error;
    }
  };

  const updateShowroom = async (id: string, updatedFields: Partial<Showroom>) => {
    try {
      const updated = await showroomService.updateShowroom(id, updatedFields);
      setShowrooms((prev) => prev.map((s) => (s.id === id ? updated : s)));
    } catch (error: any) {
      console.error('Failed to update showroom:', error);
      alert(`Error updating showroom: ${error.message || 'Check console'}`);
      throw error;
    }
  };

  const deleteShowroom = async (id: string) => {
    try {
      await showroomService.deleteShowroom(id);
      setShowrooms((prev) => prev.filter((s) => s.id !== id));
    } catch (error: any) {
      console.error('Failed to delete showroom:', error);
      alert(`Error deleting showroom: ${error.message || 'Check console'}`);
      throw error;
    }
  };

  // Leadership CRUD
  const addLeadership = async (personData: Omit<Leadership, 'id'>) => {
    try {
      const created = await leadershipService.createLeader(personData);
      setLeadership((prev) => [...prev, created]);
    } catch (error: any) {
      console.error('Failed to add leadership:', error);
      alert(`Error saving leader: ${error.message || 'Check console'}`);
      throw error;
    }
  };

  const updateLeadership = async (id: string, updatedFields: Partial<Leadership>) => {
    try {
      const updated = await leadershipService.updateLeader(id, updatedFields);
      setLeadership((prev) => prev.map((l) => (l.id === id ? updated : l)));
    } catch (error: any) {
      console.error('Failed to update leadership:', error);
      alert(`Error updating leader: ${error.message || 'Check console'}`);
      throw error;
    }
  };

  const deleteLeadership = async (id: string) => {
    try {
      await leadershipService.deleteLeader(id);
      setLeadership((prev) => prev.filter((l) => l.id !== id));
    } catch (error: any) {
      console.error('Failed to delete leadership:', error);
      alert(`Error deleting leader: ${error.message || 'Check console'}`);
      throw error;
    }
  };

  // Supplier CRUD
  const addSupplier = async (supplierData: Omit<Supplier, 'id'>) => {
    try {
      const created = await supplierService.createSupplier(supplierData);
      setSuppliers((prev) => [...prev, created]);
    } catch (error: any) {
      console.error('Failed to add supplier:', error);
      alert(`Error saving supplier: ${error.message || 'Check console'}`);
      throw error;
    }
  };

  const updateSupplier = async (id: string, updatedFields: Partial<Supplier>) => {
    try {
      const updated = await supplierService.updateSupplier(id, updatedFields);
      setSuppliers((prev) => prev.map((s) => (s.id === id ? updated : s)));
    } catch (error: any) {
      console.error('Failed to update supplier:', error);
      alert(`Error updating supplier: ${error.message || 'Check console'}`);
      throw error;
    }
  };

  const deleteSupplier = async (id: string) => {
    try {
      await supplierService.deleteSupplier(id);
      setSuppliers((prev) => prev.filter((s) => s.id !== id));
    } catch (error: any) {
      console.error('Failed to delete supplier:', error);
      alert(`Error deleting supplier: ${error.message || 'Check console'}`);
      throw error;
    }
  };

  // Inquiries
  const submitInquiry = async (inquiryData: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => {
    try {
      const created = await inquiryService.createInquiry(inquiryData);
      setInquiries((prev) => [created, ...prev]);
    } catch (error: any) {
      console.error('Failed to submit inquiry:', error);
      alert(`Error submitting inquiry: ${error.message || 'Check console'}`);
      throw error;
    }
  };

  const updateInquiryStatus = async (id: string, status: 'new' | 'replied' | 'archived') => {
    try {
      await inquiryService.updateInquiryStatus(id, status);
      setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
    } catch (error: any) {
      console.error('Failed to update inquiry:', error);
      alert(`Error updating inquiry: ${error.message || 'Check console'}`);
      throw error;
    }
  };

  // Site Settings
  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    try {
      await settingService.updateSiteSettings(newSettings);
      setSettings((prev) => ({ ...prev, ...newSettings }));
    } catch (error: any) {
      console.error('Failed to update settings:', error);
      alert(`Error saving settings: ${error.message || 'Check console'}`);
      throw error;
    }
  };

  return (
    <StoreContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedProduct,
        setSelectedProduct,
        selectedBlog,
        setSelectedBlog,
        whatsAppModalProduct,
        setWhatsAppModalProduct,
        isAdminAuthenticated,
        adminUser,
        loginAdmin,
        logoutAdmin,
        products,
        blogs,
        showrooms,
        leadership,
        suppliers,
        inquiries,
        settings,
        loading,
        isBackendConnected,
        addProduct,
        updateProduct,
        deleteProduct,
        addBlog,
        updateBlog,
        deleteBlog,
        addShowroom,
        updateShowroom,
        deleteShowroom,
        addLeadership,
        updateLeadership,
        deleteLeadership,
        addSupplier,
        updateSupplier,
        deleteSupplier,
        submitInquiry,
        updateInquiryStatus,
        updateSettings,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        refreshData,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
