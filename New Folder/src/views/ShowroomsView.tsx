import React from 'react';
import { Phone, Clock, Globe, Laptop, MessageSquare } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ShowroomsView: React.FC = () => {
  const { settings } = useStore();

  const openWhatsApp = () => {
    const cleanNum = settings.whatsappNumber.replace(/\D/g, '');
    const msg = encodeURIComponent(`Hello TS Sports, I am visiting your Digital Showroom Online and would like product assistance.`);
    window.open(`https://wa.me/${cleanNum}?text=${msg}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Page Title */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border slate-200 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full slate-950/10 border slate-900/30 slate-950 text-xs font-bold font-heading">
          <Globe className="w-3.5 h-3.5" />
          <span>Virtual Global Platform</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black slate-950 font-heading">
          TS SPORTS DIGITAL SHOWROOM ONLINE
        </h1>
        <p className="text-sm slate-700 max-w-2xl">
          Welcome to our official 24/7 Digital Showroom Online. Explore our complete range of performance grip socks, custom team kits, and athletic gear from anywhere in the world.
        </p>
      </div>

      {/* Main Digital Showroom Banner & Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <div className="lg:col-span-6 space-y-6">
          
          <div className="glass-card p-8 rounded-3xl border slate-900/50 space-y-6 shadow-2xl bg-gradient-to-br white/90 slate-50">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl slate-950/20 slate-950 border slate-900/30 flex items-center justify-center">
                <Laptop className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-extrabold slate-950 uppercase tracking-widest font-heading">
                  100% Online Experience
                </span>
                <h3 className="text-xl font-bold slate-950 font-heading">
                  TS Sports Digital Showroom
                </h3>
              </div>
            </div>

            <p className="text-xs slate-700 leading-relaxed">
              We operate a 100% virtual <strong>Digital Showroom Online</strong>. Access high-resolution product photography, detailed specification breakdowns, color customization previews, and direct WhatsApp order assistance 24 hours a day.
            </p>

            <div className="space-y-3 text-xs slate-700 pt-2 border-t slate-200">
              <p className="flex items-center space-x-2">
                <Globe className="w-4 h-4 slate-950 flex-shrink-0" />
                <span><strong>Access:</strong> Available Online 24/7 Worldwide</span>
              </p>

              <p className="flex items-center space-x-2">
                <Phone className="w-4 h-4 slate-950 flex-shrink-0" />
                <span><strong>Instant Support & Orders:</strong> <span className="font-mono slate-950 font-bold">03085410293</span></span>
              </p>

              <p className="flex items-start space-x-2 slate-600">
                <Clock className="w-4 h-4 slate-950 flex-shrink-0 mt-0.5" />
                <span><strong>Customer Assistance Hours:</strong> Monday - Sunday: 9:00 AM - 11:00 PM PKT</span>
              </p>
            </div>

            <div className="pt-3 flex flex-col sm:flex-row gap-3">
              <button
                onClick={openWhatsApp}
                className="flex-1 py-3 px-4 rounded-xl text-xs font-extrabold slate-950 bg-gradient-to-r white to-slate-700 hover:from-slate-800 hover:to-slate-600 shadow-md flex items-center justify-center space-x-2 font-heading"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Connect via WhatsApp (03085410293)</span>
              </button>
            </div>

          </div>

        </div>

        {/* Digital Showroom Visual */}
        <div className="lg:col-span-6">
          <div className="glass-panel p-4 rounded-3xl border slate-200 space-y-4">
            <div className="aspect-[16/10] rounded-2xl overflow-hidden relative border slate-200 shadow-xl">
              <img
                src="/hero-pairs.jpg"
                alt="TS Sports Digital Showroom"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t slate-50 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-4 left-4 right-4 glass-card p-4 rounded-xl border slate-300">
                <span className="text-[10px] font-bold slate-950 uppercase tracking-widest font-heading">
                  Interactive Catalog
                </span>
                <h4 className="text-sm font-bold slate-950 font-heading">
                  3D Grip Tech Preview & Direct Ordering
                </h4>
                <p className="text-[11px] slate-600 mt-1">
                  Select any product from our catalog to generate your custom WhatsApp order code.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
