import React from 'react';
import type { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { MessageSquare, Eye, Sparkles, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setSelectedProduct, setWhatsAppModalProduct } = useStore();

  const handleOrderClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setWhatsAppModalProduct(product);
  };

  const handleCardClick = () => {
    setSelectedProduct(product);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group glass-card rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-300 hover:border-white/50"
    >
      {/* Product Image Section */}
      <div className="relative aspect-[4/3] bg-white overflow-hidden">
        <img
          src={product.images[0] || '/hero-pairs.jpg'}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        
        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-transparent opacity-40" />

        {/* Featured / Category Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {product.featured && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-slate-950 text-white shadow-md flex items-center gap-1 font-heading">
              <Sparkles className="w-3 h-3 fill-white" />
              Featured
            </span>
          )}
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 text-slate-900 border border-slate-300 backdrop-blur-md font-heading shadow-sm">
            {product.category}
          </span>
        </div>

        {/* Quick View Button on Image */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedProduct(product);
          }}
          className="absolute top-3 right-3 p-2 rounded-xl bg-white/80 text-slate-700 hover:text-white hover:bg-slate-900 hover:text-slate-950 transition-all opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 shadow-lg"
          title="Quick View Details"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Price Tag Overlay if published */}
        {product.price && (
          <div className="absolute bottom-3 right-3 z-10 bg-white/90 border border-slate-700/80 px-2.5 py-1 rounded-lg backdrop-blur-md">
            <div className="flex items-baseline space-x-1.5">
              <span className="text-sm font-extrabold text-slate-950 font-heading">
                Rs {product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-[11px] text-slate-600 line-through">
                  Rs {product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
            <span className="font-mono text-[11px] text-slate-600 font-semibold">{product.SKU}</span>
            <span className="text-[10px] text-slate-950 font-semibold flex items-center gap-1">
              <Check className="w-3 h-3 text-slate-950" />
              In Stock
            </span>
          </div>

          <h3 className="text-base font-bold text-slate-900 group-hover:text-slate-700 transition-colors font-heading leading-snug">
            {product.name}
          </h3>

          <p className="text-xs text-slate-600 mt-1.5 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Sizes Preview */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="flex items-center space-x-1 text-[10px] text-slate-600 pt-1">
            <span className="font-semibold text-slate-700">Sizes:</span>
            <div className="flex flex-wrap gap-1">
              {product.sizes.slice(0, 3).map((size) => (
                <span key={size} className="px-1.5 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                  {size.split(' ')[0]}
                </span>
              ))}
              {product.sizes.length > 3 && (
                <span className="px-1 py-0.5 rounded bg-white text-slate-600">+{product.sizes.length - 3}</span>
              )}
            </div>
          </div>
        )}

        {/* Actions Footer */}
        <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="flex-1 py-2 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors text-center"
          >
            Details
          </button>

          <button
            onClick={handleOrderClick}
            className="flex-1 py-2 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 shadow-md shadow-slate-900/20 flex items-center justify-center space-x-1.5 transition-all hover:scale-[1.02] active:scale-95"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-white" />
            <span>Order</span>
          </button>
        </div>
      </div>
    </div>
  );
};
