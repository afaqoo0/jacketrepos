import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import type { Product } from '../types';
import { X, MessageSquare, ExternalLink, CheckCircle2, ShieldAlert } from 'lucide-react';

interface WhatsAppOrderModalProps {
  product: Product;
  onClose: () => void;
}

export const WhatsAppOrderModal: React.FC<WhatsAppOrderModalProps> = ({ product, onClose }) => {
  const { settings } = useStore();
  
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0] || 'Default Color');
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Standard');
  const [quantity, setQuantity] = useState<number>(1);
  const [customerNotes, setCustomerNotes] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Prefilled WhatsApp message generator with TS Sports branding
  const constructMessage = () => {
    let msg = `Hello TS Sports, I am interested in ordering the following product:\n`;
    msg += `Product: ${product.name}\n`;
    msg += `Color: ${selectedColor}\n`;
    msg += `Size: ${selectedSize}\n`;
    msg += `Product Reference: ${product.SKU}\n`;
    if (quantity > 1) {
      msg += `Quantity: ${quantity} pair(s)\n`;
    }
    if (customerNotes.trim()) {
      msg += `Notes: ${customerNotes.trim()}\n`;
    }
    msg += `\nPlease provide availability and further ordering details.`;
    return msg;
  };

  const generatedMessage = constructMessage();

  const handleSendToWhatsApp = () => {
    const cleanNum = settings.whatsappNumber.replace(/\D/g, '');
    const encodedText = encodeURIComponent(generatedMessage);
    const whatsappUrl = `https://wa.me/${cleanNum}?text=${encodedText}`;
    
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(generatedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl glass-panel rounded-2xl border border-slate-700/80 shadow-2xl overflow-hidden text-slate-900 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-950/80 via-white to-white border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900/10 border border-slate-900/20 flex items-center justify-center text-slate-950">
              <MessageSquare className="w-5 h-5 fill-white" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold font-heading text-slate-950 flex items-center gap-2">
                Order via TS Sports WhatsApp
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900/10 text-slate-800 font-sans border border-slate-900/20">
                  Direct Order
                </span>
              </h3>
              <p className="text-xs text-slate-600">Instant product order inquiry to 03085410293</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-600 hover:text-white hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          
          {/* Selected Product Summary */}
          <div className="flex items-center space-x-4 p-3 rounded-xl bg-white/80 border border-slate-200">
            <img
              src={product.images[0] || '/hero-pairs.jpg'}
              alt={product.name}
              className="w-16 h-16 object-cover rounded-lg border border-slate-300"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-slate-950 truncate font-heading">{product.name}</h4>
              <p className="text-xs text-slate-950 font-semibold mt-0.5">SKU: {product.SKU}</p>
              {product.price && (
                <p className="text-xs text-slate-700 font-bold mt-1">Rs {product.price.toFixed(2)} per pair</p>
              )}
            </div>
          </div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 font-heading">
                Select Color Option:
              </label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      selectedColor === color
                        ? 'bg-slate-950 text-white border-slate-950 shadow-md shadow-slate-900/20 font-bold'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-700'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 font-heading">
                Select Size:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold border text-center transition-all ${
                      selectedSize === size
                        ? 'bg-slate-950 text-white border-slate-950 shadow-md shadow-slate-900/20 font-bold'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-heading">
                Quantity (Pairs):
              </label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-300 text-slate-800 hover:bg-slate-200 font-bold"
                >
                  -
                </button>
                <span className="w-10 text-center text-sm font-bold text-slate-950">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-300 text-slate-800 hover:bg-slate-200 font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-heading">
                Custom Notes / City (Optional):
              </label>
              <input
                type="text"
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                placeholder="e.g. Delivery city or club logo printing..."
                className="w-full px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-950 placeholder-slate-500 focus:outline-none focus:border-white"
              />
            </div>
          </div>

          {/* Message Preview Box */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-wider font-heading">
                Prefilled WhatsApp Message Preview:
              </span>
              <button
                onClick={handleCopyMessage}
                className="text-[11px] text-slate-950 hover:underline flex items-center gap-1 font-semibold"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-3 h-3 text-slate-950" />
                    <span className="text-slate-950">Copied!</span>
                  </>
                ) : (
                  <span>Copy Text</span>
                )}
              </button>
            </div>
            <pre className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-mono whitespace-pre-wrap leading-relaxed shadow-inner">
              {generatedMessage}
            </pre>
          </div>

          {/* Business Info Note */}
          <div className="flex items-start space-x-2 text-[11px] text-slate-600 bg-slate-900/60 p-3 rounded-lg border border-slate-200">
            <ShieldAlert className="w-4 h-4 text-slate-950 flex-shrink-0 mt-0.5" />
            <span>
              Clicking "Send to WhatsApp" opens WhatsApp with your prefilled details to connect directly with TS Sports official representative at <strong>03085410293</strong>.
            </span>
          </div>

        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
          >
            Cancel
          </button>
          
          <button
            onClick={handleSendToWhatsApp}
            className="flex-1 py-3 px-5 rounded-xl text-xs font-extrabold text-white bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 shadow-lg shadow-slate-900/20 flex items-center justify-center space-x-2 transition-all hover:scale-[1.01] active:scale-95"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>Send Order via WhatsApp</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>

      </div>
    </div>
  );
};
