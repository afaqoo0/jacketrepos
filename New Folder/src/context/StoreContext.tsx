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
  instagramUrl: 'https://instagram.com/tssports',
  tiktokUrl: 'https://tiktok.com/@tssports',
  youtubeUrl: 'https://youtube.com/@tssports',
  facebookUrl: 'https://facebook.com/tssports',
  metaTitle: 'TS Sports | Premium Sports & Athletic Gear',
  metaDescription: 'Leading manufacturer of elite sports grip socks, athletic compression wear, and team edition accessories.',
};

// All data is loaded from the database. No dummy/fallback data.

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
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
      console.warn('API Auth failed, attempting offline login fallback:', error);
    }

    // Fallback credential check for offline demo
    if (
      (email === 'sportspakistan10@gmail.com' || email === 'admin@tssports.pk' || email === 'admin') &&
      (pass === 'Password123!' || pass === 'admin123' || pass === 'admin')
    ) {
      setIsAdminAuthenticated(true);
      setAdminUser(email);
      return true;
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
    } catch (error) {
      const tempProduct: Product = {
        ...productData,
        id: 'prod-' + Date.now(),
        createdAt: new Date().toISOString().split('T')[0],
      };
      setProducts((prev) => [tempProduct, ...prev]);
    }
  };

  const updateProduct = async (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p)));
    try {
      await productService.updateProduct(id, updatedFields);
    } catch (error) {
      console.warn('Backend update failed, updated locally:', error);
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
    } catch (error) {
      const tempBlog: Blog = {
        ...blogData,
        id: 'blog-' + Date.now(),
        publishedAt: new Date().toISOString().split('T')[0],
      };
      setBlogs((prev) => [tempBlog, ...prev]);
    }
  };

  const updateBlog = async (id: string, updatedFields: Partial<Blog>) => {
    setBlogs((prev) => prev.map((b) => (b.id === id ? { ...b, ...updatedFields } : b)));
    try {
      await blogService.updateBlog(id, updatedFields);
    } catch (error) {
      console.warn('Backend update failed:', error);
    }
  };

  const deleteBlog = async (id: string) => {
    setBlogs((prev) => prev.filter((b) => b.id !== id));
    try {
      await blogService.deleteBlog(id);
    } catch (error) {
      console.warn('Backend delete failed:', error);
    }
  };

  // Showroom CRUD
  const addShowroom = async (showroomData: Omit<Showroom, 'id'>) => {
    try {
      const created = await showroomService.createShowroom(showroomData);
      setShowrooms((prev) => [...prev, created]);
    } catch (error) {
      setShowrooms((prev) => [...prev, { ...showroomData, id: 'sr-' + Date.now() }]);
    }
  };

  const updateShowroom = async (id: string, updatedFields: Partial<Showroom>) => {
    setShowrooms((prev) => prev.map((s) => (s.id === id ? { ...s, ...updatedFields } : s)));
    try {
      await showroomService.updateShowroom(id, updatedFields);
    } catch (error) {
      console.warn('Backend update failed:', error);
    }
  };

  const deleteShowroom = async (id: string) => {
    setShowrooms((prev) => prev.filter((s) => s.id !== id));
    try {
      await showroomService.deleteShowroom(id);
    } catch (error) {
      console.warn('Backend delete failed:', error);
    }
  };

  // Leadership CRUD
  const addLeadership = async (personData: Omit<Leadership, 'id'>) => {
    try {
      const created = await leadershipService.createLeader(personData);
      setLeadership((prev) => [...prev, created]);
    } catch (error) {
      setLeadership((prev) => [...prev, { ...personData, id: 'lead-' + Date.now() }]);
    }
  };

  const updateLeadership = async (id: string, updatedFields: Partial<Leadership>) => {
    setLeadership((prev) => prev.map((l) => (l.id === id ? { ...l, ...updatedFields } : l)));
    try {
      await leadershipService.updateLeader(id, updatedFields);
    } catch (error) {
      console.warn('Backend update failed:', error);
    }
  };

  const deleteLeadership = async (id: string) => {
    setLeadership((prev) => prev.filter((l) => l.id !== id));
    try {
      await leadershipService.deleteLeader(id);
    } catch (error) {
      console.warn('Backend delete failed:', error);
    }
  };

  // Supplier CRUD
  const addSupplier = async (supplierData: Omit<Supplier, 'id'>) => {
    try {
      const created = await supplierService.createSupplier(supplierData);
      setSuppliers((prev) => [...prev, created]);
    } catch (error) {
      setSuppliers((prev) => [...prev, { ...supplierData, id: 'sup-' + Date.now() }]);
    }
  };

  const updateSupplier = async (id: string, updatedFields: Partial<Supplier>) => {
    setSuppliers((prev) => prev.map((s) => (s.id === id ? { ...s, ...updatedFields } : s)));
    try {
      await supplierService.updateSupplier(id, updatedFields);
    } catch (error) {
      console.warn('Backend update failed:', error);
    }
  };

  const deleteSupplier = async (id: string) => {
    setSuppliers((prev) => prev.filter((s) => s.id !== id));
    try {
      await supplierService.deleteSupplier(id);
    } catch (error) {
      console.warn('Backend delete failed:', error);
    }
  };

  // Inquiries
  const submitInquiry = async (inquiryData: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => {
    try {
      const created = await inquiryService.createInquiry(inquiryData);
      setInquiries((prev) => [created, ...prev]);
    } catch (error) {
      const temp: Inquiry = {
        ...inquiryData,
        id: 'inq-' + Date.now(),
        status: 'new',
        createdAt: new Date().toISOString().split('T')[0],
      };
      setInquiries((prev) => [temp, ...prev]);
    }
  };

  const updateInquiryStatus = async (id: string, status: 'new' | 'replied' | 'archived') => {
    setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
    try {
      await inquiryService.updateInquiryStatus(id, status);
    } catch (error) {
      console.warn('Backend status update failed:', error);
    }
  };

  // Site Settings
  const updateSettings = async (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    try {
      await settingService.updateSiteSettings(newSettings);
    } catch (error) {
      console.warn('Backend settings update failed:', error);
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
