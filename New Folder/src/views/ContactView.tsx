import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, Phone, MessageSquare, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const ContactView: React.FC = () => {
  const { settings, submitInquiry } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }

    submitInquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
    });

    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'General Inquiry',
      message: '',
    });
  };

  const openWhatsApp = () => {
    const cleanNum = settings.whatsappNumber.replace(/\D/g, '');
    const msg = encodeURIComponent(`Hello TS Sports team, I would like to contact your customer service.`);
    window.open(`https://wa.me/${cleanNum}?text=${msg}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Title */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 border border-white/30 text-white text-xs font-bold font-heading">
          <Mail className="w-3.5 h-3.5" />
          <span>Customer & Business Support</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-heading">
          CONTACT TS SPORTS
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl">
          Have a question about product sizing, bulk team orders, or custom sports apparel? Connect directly via WhatsApp or send us an email.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Direct Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* WhatsApp Direct Card */}
          <div className="glass-card p-6 rounded-3xl border border-white/20 bg-slate-900/40 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center">
                <MessageSquare className="w-6 h-6 fill-white" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white font-heading">Official WhatsApp Ordering</h3>
                <p className="text-xs text-white font-semibold">Instant Response Line</p>
              </div>
            </div>

            <p className="text-xs text-slate-300">
              For instant product inquiries, custom team quotes, or order status updates, message us directly at <strong className="text-white font-mono">03085410293</strong>.
            </p>

            <button
              onClick={openWhatsApp}
              className="w-full py-3 rounded-xl text-xs font-extrabold text-slate-950 bg-gradient-to-r from-white to-slate-300 hover:from-slate-200 hover:to-slate-400 shadow-md flex items-center justify-center space-x-2"
            >
              <MessageSquare className="w-4 h-4 fill-slate-950" />
              <span>Open WhatsApp Conversation (03085410293)</span>
            </button>
          </div>

          {/* Contact Details List */}
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 font-heading">
              Headquarters Information
            </h3>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">HQ Address:</strong>
                  <p className="text-slate-400 mt-0.5">{settings.address}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Official Email:</strong>
                  <p className="text-white font-semibold mt-0.5">{settings.contactEmail}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">Phone Support:</strong>
                  <p className="text-slate-200 font-mono font-bold mt-0.5">03085410293</p>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-4 border-t border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-heading">
                Follow TS Sports:
              </span>
              <div className="flex items-center space-x-3">
                <a href={settings.instagramUrl} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href={settings.youtubeUrl} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <a href={settings.facebookUrl} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column: Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6">
            
            <div>
              <h3 className="text-xl font-extrabold text-white font-heading">
                Send an Online Inquiry
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Fill out the form below to contact TS Sports. Inquiries are delivered directly to CEO & management team.
              </p>
            </div>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/20 text-center space-y-3 animate-in fade-in">
                <CheckCircle2 className="w-12 h-12 text-white mx-auto" />
                <h4 className="text-lg font-bold text-white font-heading">Inquiry Submitted Successfully!</h4>
                <p className="text-xs text-slate-300">
                  Thank you for contacting TS Sports. Our team has received your message and will reach out to your email ({formData.email}) or phone shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-bold text-white hover:bg-slate-800 font-heading"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-300 mb-1 font-heading">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your Name"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-300 mb-1 font-heading">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="sportspakistan10@gmail.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-300 mb-1 font-heading">
                      Phone Number / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="03085410293"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-300 mb-1 font-heading">
                      Inquiry Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-white"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Bulk Team Order">Bulk Team / Academy Order</option>
                      <option value="Digital Showroom Inquiry">Digital Showroom Inquiry</option>
                      <option value="Distribution Partnership">Distribution Partnership</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-300 mb-1 font-heading">
                    Message Details *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about your order or inquiry..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl text-xs font-extrabold text-slate-950 bg-gradient-to-r from-white to-slate-300 hover:from-slate-200 hover:to-slate-400 shadow-lg shadow-white/10 flex items-center justify-center space-x-2 transition-all font-heading"
                >
                  <Send className="w-4 h-4 fill-slate-950" />
                  <span>Submit Inquiry</span>
                </button>

              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
