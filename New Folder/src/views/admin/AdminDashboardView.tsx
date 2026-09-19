import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import type { Product, Blog } from '../../types';
import { uploadFile } from '../../lib/services/storage';
import { 
  ShoppingBag, 
  BookOpen, 
  MapPin, 
  Users, 
  Truck, 
  MessageSquare, 
  Settings, 
  Plus, 
  Edit3, 
  Trash2, 
  LogOut, 
  Sparkles, 
  ShieldCheck, 
  Save, 
  CheckCircle2, 
  X,
  Upload,
  Loader2,
  Database
} from 'lucide-react';

type AdminTab = 'overview' | 'products' | 'blogs' | 'showrooms' | 'leadership' | 'suppliers' | 'inquiries' | 'settings';

export const AdminDashboardView: React.FC = () => {
  const { 
    logoutAdmin, 
    adminUser, 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct,
    blogs,
    addBlog,
    updateBlog,
    deleteBlog,
    showrooms,
    leadership,
    suppliers,
    inquiries,
    updateInquiryStatus,
    settings,
    updateSettings,
    isBackendConnected
  } = useStore();

  const [activeAdminTab, setActiveAdminTab] = useState<AdminTab>('overview');

  // Image Uploading State
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Product Modal State
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    SKU: '',
    category: 'Full Length' as Product['category'],
    price: 24.99,
    description: '',
    shortDescription: '',
    colors: 'Pure White, Midnight Black',
    sizes: 'S (EU 35-38), M (EU 39-42), L (EU 43-46)',
    materialSpecs: '68% Combed Cotton, 22% Nylon, 10% Elastane',
    gripPattern: 'Hexagonal Pod Matrix',
    images: [] as string[],
    status: 'active' as Product['status'],
    featured: true,
  });

  // Blog Modal State
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [blogForm, setBlogForm] = useState({
    title: '',
    summary: '',
    content: '',
    author: 'Kashif Tufail',
    category: 'Sports Science',
    image: '/hero-collage.jpg',
    status: 'published' as Blog['status'],
  });

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState({ ...settings });
  const [settingsSaved, setSettingsSaved] = useState(false);

  // File Upload Handlers
  const handleProductImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError('');
    setUploadingImage(true);

    const { url, error } = await uploadFile('product-images', file);
    if (error) {
      setUploadError(error.message || 'Image upload failed. Check Cloudinary env vars on Render.');
    } else if (url) {
      setProductForm((prev) => ({
        ...prev,
        images: [...prev.images, url],
      }));
    }
    setUploadingImage(false);
    // reset file input so same file can be re-uploaded if needed
    e.target.value = '';
  };

  const handleBlogImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError('');
    setUploadingImage(true);

    const { url, error } = await uploadFile('blog-images', file);
    if (error) {
      setUploadError(error.message || 'Image upload failed');
    } else if (url) {
      setBlogForm((prev) => ({ ...prev, image: url }));
    }
    setUploadingImage(false);
  };

  // Open Product Modal
  const handleOpenProductModal = (product?: Product) => {
    setUploadError('');
    if (product) {
      setEditingProduct(product);
      setProductForm({
        name: product.name,
        SKU: product.SKU,
        category: product.category,
        price: product.price || 0,
        description: product.description,
        shortDescription: product.shortDescription,
        colors: product.colors.join(', '),
        sizes: product.sizes.join(', '),
        materialSpecs: product.materialSpecs.join(', '),
        gripPattern: product.gripPattern,
        images: [...product.images], // use the actual array
        status: product.status,
        featured: product.featured,
      });
    } else {
      setEditingProduct(null);
      setProductForm({
        name: '',
        SKU: 'TS-SPORTS-' + Math.floor(100 + Math.random() * 900),
        category: 'Full Length',
        price: 24.99,
        description: '',
        shortDescription: '',
        colors: 'Pure White / Black Pods',
        sizes: 'S (EU 35-38), M (EU 39-42), L (EU 43-46)',
        materialSpecs: '68% Combed Cotton, 22% Nylon, 10% Elastane',
        gripPattern: 'Dual-Density Silicone Pod Matrix',
        images: [],
        status: 'active',
        featured: true,
      });
    }
    setProductModalOpen(true);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const colorsArr = productForm.colors.split(',').map((s) => s.trim()).filter(Boolean);
    const sizesArr = productForm.sizes.split(',').map((s) => s.trim()).filter(Boolean);
    const specsArr = productForm.materialSpecs.split(',').map((s) => s.trim()).filter(Boolean);

    const payload = {
      name: productForm.name,
      slug: productForm.name.toLowerCase().replace(/\s+/g, '-'),
      SKU: productForm.SKU,
      category: productForm.category,
      price: Number(productForm.price),
      description: productForm.description,
      shortDescription: productForm.shortDescription,
      colors: colorsArr,
      sizes: sizesArr,
      materialSpecs: specsArr,
      gripPattern: productForm.gripPattern,
      images: productForm.images.length > 0 ? productForm.images : [],
      status: productForm.status,
      featured: productForm.featured,
    };

    try {
      if (editingProduct) {
        await updateProduct(editingProduct.id, payload);
      } else {
        await addProduct(payload);
      }
      setProductModalOpen(false);
    } catch (error) {
      console.error('Failed to save product:', error);
      // Modal stays open so user can fix issues
    }
  };

  // Open Blog Modal
  const handleOpenBlogModal = (blog?: Blog) => {
    setUploadError('');
    if (blog) {
      setEditingBlog(blog);
      setBlogForm({
        title: blog.title,
        summary: blog.summary,
        content: blog.content,
        author: blog.author,
        category: blog.category,
        image: blog.image,
        status: blog.status,
      });
    } else {
      setEditingBlog(null);
      setBlogForm({
        title: '',
        summary: '',
        content: '',
        author: 'Kashif Tufail',
        category: 'Sports Science',
        image: '/hero-collage.jpg',
        status: 'published',
      });
    }
    setBlogModalOpen(true);
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title: blogForm.title,
      slug: blogForm.title.toLowerCase().replace(/\s+/g, '-'),
      summary: blogForm.summary,
      content: blogForm.content,
      author: blogForm.author,
      category: blogForm.category,
      image: blogForm.image,
      status: blogForm.status,
    };

    if (editingBlog) {
      updateBlog(editingBlog.id, payload);
    } else {
      addBlog(payload);
    }
    setBlogModalOpen(false);
  };

  // Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(settingsForm);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header Bar */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-white text-slate-950 flex items-center justify-center font-bold font-heading">
            <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-extrabold text-white font-heading">TS SPORTS ADMIN MANAGEMENT</h1>
              {isBackendConnected ? (
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-white text-[10px] font-bold flex items-center gap-1 border border-white/20">
                  <Database className="w-3 h-3" /> PostgreSQL (Prisma)
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold flex items-center gap-1 border border-amber-500/30">
                  Offline Fallback
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">Authenticated Session: <strong className="text-white">{adminUser}</strong></p>
          </div>
        </div>

        <button
          onClick={logoutAdmin}
          className="px-4 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 text-xs font-bold flex items-center space-x-2 transition-colors font-heading"
        >
          <LogOut className="w-4 h-4" />
          <span>Secure Logout</span>
        </button>
      </div>

      {/* Admin Sub-Navigation Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 border-b border-slate-800">
        {[
          { id: 'overview', label: 'Dashboard Overview', icon: <Sparkles className="w-4 h-4" /> },
          { id: 'products', label: `Products (${products.length})`, icon: <ShoppingBag className="w-4 h-4" /> },
          { id: 'blogs', label: `Blogs (${blogs.length})`, icon: <BookOpen className="w-4 h-4" /> },
          { id: 'showrooms', label: `Digital Showrooms (${showrooms.length})`, icon: <MapPin className="w-4 h-4" /> },
          { id: 'leadership', label: `Leadership CEO`, icon: <Users className="w-4 h-4" /> },
          { id: 'suppliers', label: `Suppliers (${suppliers.length})`, icon: <Truck className="w-4 h-4" /> },
          { id: 'inquiries', label: `Inquiries (${inquiries.length})`, icon: <MessageSquare className="w-4 h-4" /> },
          { id: 'settings', label: 'Site Settings', icon: <Settings className="w-4 h-4" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveAdminTab(tab.id as AdminTab)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center space-x-1.5 transition-all ${
              activeAdminTab === tab.id
                ? 'bg-white text-slate-950 font-heading shadow-md shadow-white/10'
                : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* DASHBOARD OVERVIEW TAB */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-6 rounded-2xl space-y-2 border border-slate-800">
              <span className="text-xs font-bold uppercase text-slate-400 font-heading">Total Products</span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-black text-white font-heading">{products.length}</span>
                <span className="text-xs text-white font-bold">{products.filter((p) => p.status === 'active').length} Active</span>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl space-y-2 border border-slate-800">
              <span className="text-xs font-bold uppercase text-slate-400 font-heading">Featured Showcase</span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-black text-white font-heading">{products.filter((p) => p.featured).length}</span>
                <span className="text-xs text-slate-400">On Home Page</span>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl space-y-2 border border-slate-800">
              <span className="text-xs font-bold uppercase text-slate-400 font-heading">Published Articles</span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-black text-white font-heading">{blogs.length}</span>
                <span className="text-xs text-white font-bold">Active Blogs</span>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl space-y-2 border border-slate-800">
              <span className="text-xs font-bold uppercase text-slate-400 font-heading">Customer Inquiries</span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-black text-white font-heading">{inquiries.length}</span>
                <span className="text-xs text-white font-bold">{inquiries.filter((i) => i.status === 'new').length} New</span>
              </div>
            </div>
          </div>

          {/* Quick Actions & Recent Items */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-white" />
                <span>Quick Actions</span>
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleOpenProductModal()}
                  className="p-4 rounded-2xl bg-white text-slate-950 font-bold text-xs flex items-center justify-center space-x-2 hover:bg-slate-300 transition-colors font-heading"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
                <button
                  onClick={() => handleOpenBlogModal()}
                  className="p-4 rounded-2xl bg-slate-800 text-white font-bold text-xs flex items-center justify-center space-x-2 hover:bg-slate-700 transition-colors font-heading"
                >
                  <Plus className="w-4 h-4 text-white" />
                  <span>Create Blog Post</span>
                </button>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-white font-heading">Database Info</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Backend Status: <strong className="text-white">{isBackendConnected ? 'Connected to PostgreSQL (Prisma)' : 'Offline / Demo Mode'}</strong>.
              </p>
              <p className="text-xs text-slate-400">
                All data, images, blogs, showrooms, and settings are managed securely with Row Level Security (RLS) policies.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* PRODUCTS MANAGER TAB */}
      {activeAdminTab === 'products' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white font-heading">Product Catalog Management</h2>
            <button
              onClick={() => handleOpenProductModal()}
              className="px-4 py-2 rounded-xl bg-white text-slate-950 text-xs font-bold flex items-center space-x-2 hover:bg-slate-300 transition-colors font-heading"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {products.map((product) => (
              <div key={product.id} className="glass-card p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <img src={product.images[0]} alt={product.name} className="w-14 h-14 rounded-xl object-cover border border-slate-800" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-sm font-bold text-white font-heading">{product.name}</h4>
                      {product.featured && <span className="px-2 py-0.5 rounded-md bg-white/20 text-white text-[10px] font-bold">Featured</span>}
                    </div>
                    <p className="text-xs text-slate-400">SKU: {product.SKU} • Category: {product.category} • ${product.price}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleOpenProductModal(product)}
                    className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="p-2 rounded-xl bg-slate-800 text-rose-400 hover:bg-rose-500/20 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* BLOGS MANAGER TAB */}
      {activeAdminTab === 'blogs' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white font-heading">Blog Posts & News Articles</h2>
            <button
              onClick={() => handleOpenBlogModal()}
              className="px-4 py-2 rounded-xl bg-white text-slate-950 text-xs font-bold flex items-center space-x-2 hover:bg-slate-300 transition-colors font-heading"
            >
              <Plus className="w-4 h-4" />
              <span>Create Blog Post</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {blogs.map((blog) => (
              <div key={blog.id} className="glass-card p-4 rounded-2xl border border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <img src={blog.image} alt={blog.title} className="w-14 h-14 rounded-xl object-cover border border-slate-800" />
                  <div>
                    <h4 className="text-sm font-bold text-white font-heading">{blog.title}</h4>
                    <p className="text-xs text-slate-400">By {blog.author} • Category: {blog.category} • {blog.publishedAt}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleOpenBlogModal(blog)}
                    className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteBlog(blog.id)}
                    className="p-2 rounded-xl bg-slate-800 text-rose-400 hover:bg-rose-500/20 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SHOWROOMS TAB */}
      {activeAdminTab === 'showrooms' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <h2 className="text-xl font-bold text-white font-heading">Digital Showrooms Platform</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {showrooms.map((sr) => (
              <div key={sr.id} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
                <h4 className="text-base font-bold text-white font-heading">{sr.name}</h4>
                <p className="text-xs text-slate-300">{sr.address}, {sr.city}, {sr.country}</p>
                <p className="text-xs text-white">Phone: {sr.phone}</p>
                <p className="text-xs text-slate-400">Hours: {sr.hours}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LEADERSHIP TAB */}
      {activeAdminTab === 'leadership' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <h2 className="text-xl font-bold text-white font-heading">CEO Leadership Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {leadership.map((person) => (
              <div key={person.id} className="glass-card p-5 rounded-2xl border border-slate-800 flex items-center space-x-4">
                <img src={person.image} alt={person.name} className="w-14 h-14 rounded-xl object-cover border border-slate-800" />
                <div>
                  <h4 className="text-base font-bold text-white font-heading">{person.name}</h4>
                  <p className="text-xs text-white font-semibold">{person.designation}</p>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">{person.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUPPLIERS TAB */}
      {activeAdminTab === 'suppliers' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <h2 className="text-xl font-bold text-white font-heading">Suppliers & Partners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {suppliers.map((supplier) => (
              <div key={supplier.id} className="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
                <span className="text-[10px] font-bold text-white uppercase">{supplier.category}</span>
                <h4 className="text-base font-bold text-white font-heading">{supplier.name}</h4>
                <p className="text-xs text-slate-300">{supplier.description}</p>
                <p className="text-[11px] text-slate-400">Location: {supplier.location}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* INQUIRIES MANAGER TAB */}
      {activeAdminTab === 'inquiries' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <h2 className="text-xl font-bold text-white font-heading">Customer Inquiry Submissions</h2>
          <div className="space-y-4">
            {inquiries.map((inq) => (
              <div key={inq.id} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold text-white font-heading">{inq.subject}</span>
                    <h4 className="text-base font-bold text-white font-heading">{inq.name} ({inq.email})</h4>
                    <p className="text-xs text-slate-400">Phone: {inq.phone || 'N/A'} • Submitted {inq.createdAt}</p>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${inq.status === 'new' ? 'bg-white text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                    {inq.status}
                  </span>
                </div>
                <p className="text-xs text-slate-200 bg-slate-950 p-4 rounded-xl border border-slate-800 whitespace-pre-wrap">
                  {inq.message}
                </p>
                <div className="flex items-center space-x-2 pt-2">
                  <button
                    onClick={() => updateInquiryStatus(inq.id, 'replied')}
                    className="px-3 py-1 rounded-lg bg-white/10 text-white text-xs font-bold hover:bg-white/20"
                  >
                    Mark as Replied
                  </button>
                  <button
                    onClick={() => updateInquiryStatus(inq.id, 'archived')}
                    className="px-3 py-1 rounded-lg bg-slate-800 text-slate-400 text-xs font-bold hover:bg-slate-700"
                  >
                    Archive
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SETTINGS TAB */}
      {activeAdminTab === 'settings' && (
        <div className="glass-card p-8 rounded-3xl border border-slate-800 max-w-2xl space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white font-heading">Site & WhatsApp Configuration</h2>
              <p className="text-xs text-slate-400">Manage business WhatsApp ordering number and brand meta</p>
            </div>
            {settingsSaved && (
              <span className="text-xs font-bold text-white flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Settings Saved!
              </span>
            )}
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1 font-heading">
                Official WhatsApp Ordering Number (e.g. 923085410293)
              </label>
              <input
                type="text"
                value={settingsForm.whatsappNumber}
                onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white font-mono font-bold"
              />
              <p className="text-[11px] text-slate-500 mt-1">Formated for wa.me/ deep link: 923085410293 (03085410293).</p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1 font-heading">Brand Slogan</label>
              <input
                type="text"
                value={settingsForm.slogan}
                onChange={(e) => setSettingsForm({ ...settingsForm, slogan: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1 font-heading">Official Email</label>
              <input
                type="email"
                value={settingsForm.contactEmail}
                onChange={(e) => setSettingsForm({ ...settingsForm, contactEmail: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white"
              />
            </div>

            <button
              type="submit"
              className="py-3 px-6 rounded-xl text-xs font-bold text-slate-950 bg-white hover:bg-slate-300 shadow-md flex items-center space-x-2 font-heading"
            >
              <Save className="w-4 h-4" />
              <span>Save Configuration</span>
            </button>
          </form>
        </div>
      )}

      {/* PRODUCT CREATE/EDIT MODAL */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl glass-panel p-6 rounded-3xl border border-slate-700 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white font-heading">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button onClick={() => setProductModalOpen(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            {uploadError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                {uploadError}
              </div>
            )}

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 uppercase mb-1">Product Name</label>
                  <input type="text" required value={productForm.name} onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white" />
                </div>
                <div>
                  <label className="block font-bold text-slate-300 uppercase mb-1">SKU Reference</label>
                  <input type="text" required value={productForm.SKU} onChange={(e) => setProductForm({ ...productForm, SKU: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 uppercase mb-1">Category</label>
                  <select value={productForm.category} onChange={(e) => setProductForm({ ...productForm, category: e.target.value as any })} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white">
                    <option value="Full Length">Full Length</option>
                    <option value="Ankle Cut">Ankle Cut</option>
                    <option value="Sleeve Socks">Sleeve Socks</option>
                    <option value="Team Edition">Team Edition</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-300 uppercase mb-1">Price ($)</label>
                  <input type="number" step="0.01" value={productForm.price} onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white" />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 uppercase mb-1">Short Description</label>
                <input type="text" value={productForm.shortDescription} onChange={(e) => setProductForm({ ...productForm, shortDescription: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white" />
              </div>

              <div>
                <label className="block font-bold text-slate-300 uppercase mb-1">Full Description</label>
                <textarea rows={3} value={productForm.description} onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white" />
              </div>

              {/* Image Upload Field */}
              <div>
                <label className="block font-bold text-slate-300 uppercase mb-1">
                  Product Images ({productForm.images.length} uploaded — unlimited)
                </label>

                {/* Thumbnail Preview Grid */}
                {productForm.images.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {productForm.images.map((img, idx) => (
                      <div key={idx} className="relative group w-20 h-20 flex-shrink-0">
                        <img
                          src={img}
                          alt={`img-${idx}`}
                          className="w-full h-full object-cover rounded-xl border border-slate-700"
                          onError={(e) => { (e.target as HTMLImageElement).src = '/hero-pairs.jpg'; }}
                        />
                        <button
                          type="button"
                          onClick={() => setProductForm((prev) => ({
                            ...prev,
                            images: prev.images.filter((_, i) => i !== idx),
                          }))}
                          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity font-bold"
                          title="Remove image"
                        >
                          ×
                        </button>
                        {idx === 0 && (
                          <span className="absolute bottom-0 left-0 right-0 text-[9px] text-center bg-white text-slate-950 font-bold rounded-b-xl">MAIN</span>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Upload Button */}
                <div className="flex items-center space-x-3">
                  <label className={`px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center space-x-1.5 cursor-pointer border border-slate-700 ${uploadingImage ? 'opacity-60 cursor-not-allowed' : ''}`}>
                    {uploadingImage ? (
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                    ) : (
                      <Upload className="w-4 h-4 text-white" />
                    )}
                    <span>{uploadingImage ? 'Uploading...' : '+ Add Image'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProductImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>
                  <span className="text-[11px] text-slate-400">Max 5MB per image · No limit on count</span>
                </div>
              </div>

              <div className="flex items-center space-x-6 pt-2">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" checked={productForm.featured} onChange={(e) => setProductForm({ ...productForm, featured: e.target.checked })} />
                  <span className="font-bold text-slate-300">Mark as Featured</span>
                </label>
              </div>

              <button type="submit" className="w-full py-3 rounded-xl bg-white text-slate-950 font-bold uppercase font-heading">
                Save Product
              </button>
            </form>
          </div>
        </div>
      )}

      {/* BLOG CREATE/EDIT MODAL */}
      {blogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl glass-panel p-6 rounded-3xl border border-slate-700 shadow-2xl max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white font-heading">{editingBlog ? 'Edit Blog Article' : 'Create Blog Article'}</h3>
              <button onClick={() => setBlogModalOpen(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>

            {uploadError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                {uploadError}
              </div>
            )}

            <form onSubmit={handleSaveBlog} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 uppercase mb-1">Article Title</label>
                <input type="text" required value={blogForm.title} onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white" />
              </div>

              <div>
                <label className="block font-bold text-slate-300 uppercase mb-1">Category</label>
                <input type="text" value={blogForm.category} onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white" />
              </div>

              <div>
                <label className="block font-bold text-slate-300 uppercase mb-1">Summary</label>
                <input type="text" value={blogForm.summary} onChange={(e) => setBlogForm({ ...blogForm, summary: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white" />
              </div>

              {/* Featured Image Upload */}
              <div>
                <label className="block font-bold text-slate-300 uppercase mb-1">Featured Article Image</label>
                <div className="flex items-center space-x-3 mb-2">
                  <label className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center space-x-1.5 cursor-pointer border border-slate-700">
                    {uploadingImage ? (
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                    ) : (
                      <Upload className="w-4 h-4 text-white" />
                    )}
                    <span>Upload Featured Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleBlogImageUpload}
                      disabled={uploadingImage}
                      className="hidden"
                    />
                  </label>
                </div>
                <input type="text" value={blogForm.image} onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white" placeholder="https://..." />
              </div>

              <div>
                <label className="block font-bold text-slate-300 uppercase mb-1">Full Article Content</label>
                <textarea rows={6} value={blogForm.content} onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })} className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white" />
              </div>

              <button type="submit" className="w-full py-3 rounded-xl bg-white text-slate-950 font-bold uppercase font-heading">
                Publish Blog Post
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
