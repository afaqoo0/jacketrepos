import React from 'react';
import { useStore } from '../context/StoreContext';
import type { ActiveTab } from '../types';
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  MapPin, 
  Lock,
  ArrowUpRight
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, setActiveTab, isAdminAuthenticated } = useStore();

  const navigateTo = (tab: ActiveTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    const cleanNum = settings.whatsappNumber.replace(/\D/g, '');
    const msg = encodeURIComponent(`Hello TS Sports, I am reaching out from your website footer.`);
    window.open(`https://wa.me/${cleanNum}?text=${msg}`, '_blank');
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <img src="/ts-logo.jpg" alt="TS Sports Logo" className="w-10 h-10 rounded-lg object-cover" />
              <span className="text-xl font-extrabold tracking-wider text-slate-50 font-heading">
                TS SPORTS
              </span>
            </div>
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              TS Sports is a premier sports performance brand dedicated to manufacturing cutting-edge anti-slip grip socks, athletic apparel, and professional team equipment. Built for athletes and sports clubs worldwide.
            </p>

            {/* WhatsApp Quick CTA */}
            <button
              onClick={openWhatsApp}
              className="mt-4 px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-white/20 text-white hover:bg-white/10 transition-all text-xs font-bold flex items-center space-x-2"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Official WhatsApp: 03085410293</span>
            </button>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-slate-100 font-bold text-sm uppercase tracking-wider mb-4 font-heading">
              Explore Pages
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-white transition-colors">
                  Home Showcase
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('products')} className="hover:text-white transition-colors">
                  Products Catalog
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('showrooms')} className="hover:text-white transition-colors">
                  Digital Showroom Online
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">
                  Our Story & Technology
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('blogs')} className="hover:text-white transition-colors">
                  Sports Performance Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-slate-100 font-bold text-sm uppercase tracking-wider mb-4 font-heading">
              Corporate & Leadership
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => navigateTo('leadership')} className="hover:text-white transition-colors">
                  CEO Leadership
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('suppliers')} className="hover:text-white transition-colors">
                  Trusted Global Suppliers
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-white transition-colors">
                  Contact & Bulk Orders
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo(isAdminAuthenticated ? 'admin-dashboard' : 'admin-login')} 
                  className="hover:text-white transition-colors flex items-center space-x-1 text-slate-400"
                >
                  <Lock className="w-3.5 h-3.5 text-white" />
                  <span>Admin Management</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-slate-100 font-bold text-sm uppercase tracking-wider mb-4 font-heading">
              Contact HQ
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-white flex-shrink-0" />
                <a href={`mailto:${settings.contactEmail}`} className="hover:underline text-white font-semibold">{settings.contactEmail}</a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-white flex-shrink-0" />
                <span className="font-bold text-white font-mono">03085410293</span>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="mt-6 flex items-center space-x-3">
              <a 
                href={settings.instagramUrl} 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-white/50 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a 
                href={settings.youtubeUrl} 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-white/50 transition-colors"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a 
                href={settings.facebookUrl} 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:border-white/50 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} TS Sports. All rights reserved. Registered Trademark.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms & Conditions</span>
            <button 
              onClick={() => navigateTo(isAdminAuthenticated ? 'admin-dashboard' : 'admin-login')}
              className="text-slate-500 hover:text-white flex items-center gap-1"
            >
              <span>Admin Portal</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
