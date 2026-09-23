import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { Search, ShoppingBag, Sparkles } from 'lucide-react';

export const ProductsView: React.FC = () => {
  const { 
    products, 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory 
  } = useStore();

  const categories = ['All', 'Full Length', 'Ankle Cut', 'Sleeve Socks', 'Team Edition'];

  const filteredProducts = products.filter((p) => {
    // Only active products on public site
    if (p.status !== 'active') return false;
    
    // Category check
    if (selectedCategory !== 'All' && p.category !== selectedCategory) {
      return false;
    }

    // Search query check
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchSKU = p.SKU.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      return matchName || matchSKU || matchDesc;
    }

    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 space-y-4 text-center sm:text-left relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 hidden sm:block">
          <ShoppingBag className="w-48 h-48 text-white" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 border border-white/30 text-white text-xs font-bold font-heading">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official TS Sports Digital Catalog</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white font-heading">
            TS SPORTS PERFORMANCE CATALOG
          </h1>

          <p className="text-sm text-slate-300">
            Browse our full range of performance grip socks, ankle cut sleeves, and team editions. Click any item to configure color & size, then order directly via official WhatsApp (03085410293).
          </p>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 glass-card p-4 rounded-2xl border border-slate-800">
        
        {/* Category Filter Tabs */}
        <div className="flex items-center space-x-1 overflow-x-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-white text-slate-950 shadow-md shadow-white/10 font-heading'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input Box */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products or SKU..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-white transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-slate-500 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass-panel rounded-3xl border border-slate-800 space-y-4">
          <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-slate-200 font-heading">No Products Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            We couldn't find any products matching "{searchQuery}" in category "{selectedCategory}".
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold text-white hover:bg-slate-700 font-heading"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
};
