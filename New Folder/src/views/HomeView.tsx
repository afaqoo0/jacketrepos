import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { 
  Zap, 
  ShieldCheck, 
  MessageSquare, 
  ShoppingBag, 
  ChevronRight, 
  Flame, 
  Award, 
  MapPin, 
  ArrowRight,
  Sparkles,
  Layers,
  Wind
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { products, setActiveTab, setWhatsAppModalProduct, blogs, setSelectedBlog, settings } = useStore();

  const featuredProducts = products.filter((p) => p.featured && p.status === 'active');
  const displayProducts = featuredProducts.length > 0 ? featuredProducts : products.slice(0, 4);

  const openGeneralWhatsApp = () => {
    const cleanNum = settings.whatsappNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanNum}?text=Hello%20TS%20Sports,%20I%20am%20interested%20in%20exploring%20your%20performance%20products.`, '_blank');
  };

  return (
    <div className="space-y-24 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-8">
        
        {/* Hero Background Image & Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-collage.jpg"
            alt="TS Sports Grip Socks"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/30 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-white animate-spin" />
              <span className="text-xs font-bold text-white uppercase tracking-widest font-heading">
                Next-Gen Athletic Performance & Grip Gear
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white font-heading tracking-tight leading-[1.05]">
              UNLEASH <br />
              <span className="text-white">MAXIMUM TRACTION</span> <br />
              ON THE PITCH.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Eliminate in-boot slippage, maximize lateral agility, and prevent painful blisters with TS Sports dual-density silicone pod technology. Built for matchday dominance.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setActiveTab('products')}
                className="px-8 py-4 rounded-2xl text-sm font-extrabold text-slate-950 bg-gradient-to-r from-white to-slate-300 hover:from-slate-200 hover:to-slate-400 shadow-xl shadow-white/10 flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.02] active:scale-95"
              >
                <ShoppingBag className="w-5 h-5 fill-slate-950" />
                <span>Explore Catalog</span>
              </button>

              <button
                onClick={openGeneralWhatsApp}
                className="px-8 py-4 rounded-2xl text-sm font-extrabold text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700 shadow-xl flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.02] active:scale-95"
              >
                <MessageSquare className="w-5 h-5 fill-white text-white" />
                <span>Order on WhatsApp (03085410293)</span>
              </button>
            </div>

            {/* Feature Bullets */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-slate-800/80 text-left">
              <div>
                <span className="text-xl sm:text-2xl font-black text-white font-heading">100%</span>
                <p className="text-[11px] text-slate-400 font-semibold uppercase">Zero Foot Slip</p>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-white font-heading">Pro Grade</span>
                <p className="text-[11px] text-slate-400 font-semibold uppercase">Silicone Pods</p>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black text-white font-heading">3D Mesh</span>
                <p className="text-[11px] text-slate-400 font-semibold uppercase">Sweat Wicking</p>
              </div>
            </div>

          </div>

          {/* Hero Right Visual Card */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <div className="relative glass-card p-6 rounded-3xl border border-slate-700/80 shadow-2xl space-y-6">
              
              <div className="aspect-[4/3] rounded-2xl bg-black overflow-hidden relative border border-slate-800">
                <img
                  src="/hero-pairs.jpg"
                  alt="TS Sports Grip Socks"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white text-slate-950 text-xs font-black uppercase font-heading">
                  Best Seller
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white font-heading">TS Sports Pro Grip 2.0</h3>
                  <span className="text-lg font-extrabold text-white font-heading">Rs 2499</span>
                </div>
                <p className="text-xs text-slate-400">
                  Dual-density silicone pod matrix on high-torque footbed zones.
                </p>
              </div>

              <button
                onClick={() => setWhatsAppModalProduct(products[0])}
                className="w-full py-3.5 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-white to-slate-300 hover:from-slate-200 hover:to-slate-400 shadow-md flex items-center justify-center space-x-2"
              >
                <MessageSquare className="w-4 h-4 fill-slate-950" />
                <span>Direct WhatsApp Order</span>
              </button>

            </div>
          </div>

        </div>
      </section>

      {/* FEATURED PRODUCTS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-white font-semibold text-xs uppercase tracking-wider font-heading">
              <Flame className="w-4 h-4 fill-white" />
              <span>Performance Catalog</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
              FEATURED TS SPORTS PRODUCTS
            </h2>
          </div>

          <button
            onClick={() => setActiveTab('products')}
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-white hover:text-slate-200 font-heading group"
          >
            <span>View All Products ({products.length})</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* WHY CHOOSE TS SPORTS */}
      <section className="bg-slate-900/60 border-y border-slate-800/80 py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-white/10 text-white border border-white/30 uppercase tracking-widest font-heading">
              Engineering Excellence
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white font-heading tracking-tight">
              WHY ATHLETES CHOOSE <span className="text-white">TS SPORTS</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Standard match socks allow your feet to slip inside your boots. TS Sports locks your feet into the boot sole plate for unprecedented agility and comfort.
            </p>
          </div>

          {/* 6 Advantage Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <div className="glass-card p-6 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/30 flex items-center justify-center text-white">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-heading">Anti-Slip Silicone Pod Tech</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Medical-grade silicone pads strategically mapped onto high-impact sole zones maximize friction against boot insoles.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                <Wind className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-heading">3D HydroVent Breathability</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Micro-mesh upper instep weaving channels heat and moisture out of your boots, keeping your feet dry and cool.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-heading">Ankle Lock & Arch Compression</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                High-elasticity arch compression bands cradle your foot instep while reinforced ankle collars stabilize lateral heel movements.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-heading">Blister & Friction Elimination</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                By eliminating foot movement inside the boot, friction points disappear completely, protecting your heels and toes.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/30 flex items-center justify-center text-white">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-heading">Pro Match & Training Durability</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Constructed with long-staple combed cotton and reinforced nylon threading designed to endure endless wash cycles.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl space-y-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-heading">Modern Pro Athletic Aesthetics</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Sleek branding and vibrant colorways designed to pair seamlessly with team uniforms and leg compression sleeves.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* DIGITAL SHOWROOM ONLINE TEASER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold text-white uppercase tracking-widest font-heading flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              24/7 Digital Platform
            </span>
            <h2 className="text-3xl font-extrabold text-white font-heading">
              TS SPORTS DIGITAL SHOWROOM ONLINE
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Explore our complete online digital showroom to view 3D product previews, custom color options, and place instant orders via WhatsApp at <strong>03085410293</strong>.
            </p>
            
            <button
              onClick={() => setActiveTab('showrooms')}
              className="mt-4 px-6 py-3 rounded-xl text-xs font-bold text-slate-950 bg-white hover:bg-slate-300 flex items-center space-x-2 transition-all font-heading"
            >
              <span>Explore Digital Showroom Online</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-slate-800 aspect-[16/10]">
            <img src="/hero-pairs.jpg" alt="TS Sports Digital Showroom" className="w-full h-full object-cover" />
          </div>

        </div>
      </section>

      {/* LATEST BLOGS PREVIEW */}
      {blogs.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex items-center justify-between border-b border-slate-800 pb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              TS SPORTS PERFORMANCE JOURNAL
            </h2>
            <button
              onClick={() => setActiveTab('blogs')}
              className="text-xs font-bold text-white hover:underline font-heading flex items-center gap-1"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogs.slice(0, 3).map((blog) => (
              <div
                key={blog.id}
                onClick={() => setSelectedBlog(blog)}
                className="glass-card rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between"
              >
                <div className="aspect-[16/9] bg-slate-900 overflow-hidden">
                  <img src={blog.image || '/hero-collage.jpg'} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider font-heading">{blog.category}</span>
                    <h3 className="text-sm font-bold text-white mt-1 line-clamp-2 font-heading">{blog.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{blog.summary}</p>
                  </div>
                  <div className="pt-2 text-[11px] text-slate-500 font-semibold flex justify-between">
                    <span>By {blog.author}</span>
                    <span>{blog.publishedAt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
