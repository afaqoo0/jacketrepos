import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import type { ActiveTab } from '../types';
import { 
  ShoppingBag, 
  MapPin, 
  Info, 
  Users, 
  Truck, 
  BookOpen, 
  Mail, 
  MessageSquare, 
  Menu, 
  X, 
  ChevronRight,
  Zap
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, settings } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Zap className="w-4 h-4" /> },
    { id: 'products', label: 'Products', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'showrooms', label: 'Digital Showroom', icon: <MapPin className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <Info className="w-4 h-4" /> },
    { id: 'leadership', label: 'Leadership', icon: <Users className="w-4 h-4" /> },
    { id: 'suppliers', label: 'Suppliers', icon: <Truck className="w-4 h-4" /> },
    { id: 'blogs', label: 'Blogs', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openDirectWhatsApp = () => {
    const cleanNum = settings.whatsappNumber.replace(/\D/g, '');
    const msg = encodeURIComponent(`Hello TS Sports team, I am interested in placing an order for performance gear.`);
    window.open(`https://wa.me/${cleanNum}?text=${msg}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200 transition-all duration-300 shadow-xl">
      {/* Top Notification Strip */}
      <div className="bg-gradient-to-r from-slate-50 via-white to-slate-50 text-slate-700 text-xs py-1.5 px-4 border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-slate-950 animate-pulse"></span>
            <span className="font-semibold text-slate-800">{settings.slogan}</span>
          </div>
          <div className="hidden sm:flex items-center space-x-4">

            <span className="text-slate-600">WhatsApp Order: <strong className="text-slate-950">03085410293</strong></span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center space-x-3 group focus:outline-none"
        >
          <img src="/ts-logo.jpg" alt="TS Sports Logo" className="w-12 h-12 rounded-lg object-cover group-hover:scale-105 transition-transform shadow-lg shadow-slate-900/20" />
          <div className="flex flex-col text-left">
            <span className="text-xl font-extrabold tracking-wider text-slate-900 font-heading group-hover:text-white transition-colors flex items-center gap-1.5">
              TS SPORTS
            </span>
            <span className="text-[10px] text-slate-600 tracking-widest uppercase font-semibold">Performance & Grip Gear</span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-1.5 ${
                  isActive
                    ? 'bg-slate-900/10 text-slate-950 border border-slate-900/30 shadow-sm'
                    : 'text-slate-700 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <button
            onClick={openDirectWhatsApp}
            className="px-4 py-2 text-xs font-extrabold text-white bg-gradient-to-r from-slate-900 to-slate-700 hover:from-slate-800 hover:to-slate-600 rounded-lg shadow-md shadow-slate-900/20 flex items-center space-x-1.5 transition-all hover:scale-[1.02] active:scale-95"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>Order on WhatsApp</span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center md:hidden space-x-2">
          <button
            onClick={openDirectWhatsApp}
            className="p-2 rounded-lg bg-slate-900/10 text-slate-950 border border-slate-900/20 text-xs font-bold flex items-center gap-1"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-lg text-slate-700 hover:text-white bg-slate-100/60 border border-slate-300"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-3">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`p-3 rounded-lg text-sm font-semibold flex items-center justify-between transition-all ${
                    isActive
                      ? 'bg-slate-950 text-white font-bold'
                      : 'bg-white/80 text-slate-800 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-200 space-y-2">
            <button
              onClick={openDirectWhatsApp}
              className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-slate-900 to-slate-700 flex items-center justify-center space-x-2 shadow-lg shadow-slate-900/20"
            >
              <MessageSquare className="w-5 h-5 fill-white" />
              <span>Order via WhatsApp (03085410293)</span>
            </button>


          </div>
        </div>
      )}
    </header>
  );
};
