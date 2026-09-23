import React, { useState } from 'react';
import type { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { X, MessageSquare, Check, ShieldCheck, Zap } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { setWhatsAppModalProduct } = useStore();
  const [selectedImg, setSelectedImg] = useState<string>(product.images[0] || '/hero-pairs.jpg');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0] || '');
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || '');

  const handleOrderClick = () => {
    setWhatsAppModalProduct(product);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 slate-50/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl glass-panel rounded-3xl border slate-300/80 shadow-2xl overflow-hidden slate-900 max-h-[92vh] flex flex-col">
        
        {/* Modal Header Bar */}
        <div className="px-6 py-4 white border-b slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold slate-950/20 slate-950 border slate-900/30">
              {product.category}
            </span>
            <span className="text-xs font-mono slate-600">SKU: {product.SKU}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl slate-600 hover:slate-950 hover:slate-100 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
          
          {/* Left Column: Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/3] rounded-2xl white overflow-hidden border slate-200 relative group">
              <img
                src={selectedImg}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t slate-50/60 via-transparent to-transparent opacity-60" />
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImg(img)}
                    className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      selectedImg === img ? 'slate-950 shadow-md shadow-slate-900/20 scale-105' : 'slate-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Feature highlights callout */}
            <div className="p-4 rounded-2xl white/60 border slate-200/80 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider slate-950 font-heading flex items-center gap-1.5">
                <Zap className="w-4 h-4 fill-white" />
                Performance Specs:
              </h4>
              <div className="text-xs slate-700 space-y-1">
                <p>• <strong>Grip Pattern:</strong> {product.gripPattern}</p>
                <p>• <strong>Ankle Lock:</strong> Ergonomic compression band</p>
                <p>• <strong>In-Boot Friction:</strong> Reduced by up to 98%</p>
              </div>
            </div>
          </div>

          {/* Right Column: Information & WhatsApp Order CTA */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold slate-950 font-heading leading-tight">
                  {product.name}
                </h2>
                
                {product.price && (
                  <div className="mt-3 flex items-baseline space-x-3">
                    <span className="text-3xl font-extrabold slate-950 font-heading">
                      Rs {product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-base text-slate-500 line-through">
                        Rs {product.originalPrice.toFixed(2)}
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold slate-950/10 slate-950 border slate-900/20">
                      Direct WhatsApp Rate
                    </span>
                  </div>
                )}
              </div>

              <p className="text-sm slate-700 leading-relaxed">
                {product.description}
              </p>

              {/* Material Specs Checklist */}
              {product.materialSpecs && product.materialSpecs.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider slate-700 font-heading">
                    Materials & Technology:
                  </h4>
                  <ul className="grid grid-cols-1 gap-1.5 text-xs slate-700">
                    {product.materialSpecs.map((spec, i) => (
                      <li key={i} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 slate-950 flex-shrink-0" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Color options preview */}
              {product.colors && product.colors.length > 0 && (
                <div className="space-y-1.5 pt-2">
                  <label className="text-xs font-bold uppercase tracking-wider slate-700 font-heading">
                    Colorways Available:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedColor(c)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                          selectedColor === c 
                            ? 'slate-950 white font-bold slate-950' 
                            : 'white slate-700 slate-200'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size options preview */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider slate-700 font-heading">
                    Select Foot Size:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          selectedSize === s 
                            ? 'slate-950 white font-bold slate-950' 
                            : 'white slate-700 slate-200'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Direct Order Button */}
            <div className="pt-4 border-t slate-200 space-y-3">
              <button
                onClick={handleOrderClick}
                className="w-full py-4 px-6 rounded-2xl text-sm font-extrabold slate-950 bg-gradient-to-r white to-slate-700 hover:from-slate-800 hover:to-slate-600 shadow-xl shadow-slate-900/20 flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.01] active:scale-95"
              >
                <MessageSquare className="w-5 h-5 fill-white" />
                <span>Order Now via WhatsApp (03085410293)</span>
              </button>

              <p className="text-[11px] text-center slate-600 flex items-center justify-center gap-1">
                <ShieldCheck className="w-4 h-4 slate-950 inline" />
                Direct WhatsApp link generates a prefilled order message. No credit card required.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
