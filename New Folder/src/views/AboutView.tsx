import React from 'react';
import { ShieldCheck, Target, Eye, Award } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      
      {/* Title & Brand Story Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/30 text-white text-xs font-bold font-heading">
            <ShieldCheck className="w-4 h-4" />
            <span>The TS Sports Brand Story</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white font-heading leading-tight">
            ENGINEERED FOR <span className="text-white font-heading">UNCOMPROMISING ATHLETIC PERFORMANCE</span>.
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            TS Sports is a premier sports equipment and athletic apparel brand founded by CEO Kashif Tufail. We specialize in engineering high-traction grip socks, athletic apparel, and professional team gear that eliminate foot slippage and enhance pitch agility.
          </p>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            By combining high-density silicone pod technology, long-staple combed cotton threads, and 3D ventilation weaving, TS Sports delivers maximum traction, arch stability, and matchday comfort for athletes around the globe.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800 text-left">
            <div>
              <span className="text-3xl font-black text-white font-heading">500,000+</span>
              <p className="text-xs text-slate-400 uppercase font-semibold">Pairs Delivered Worldwide</p>
            </div>
            <div>
              <span className="text-3xl font-black text-white font-heading">120+</span>
              <p className="text-xs text-slate-400 uppercase font-semibold">Pro Club Athletes Supported</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl glass-card">
            <img src="/hero-collage.jpg" alt="TS Sports Brand Story" className="w-full h-full object-cover" />
          </div>
        </div>

      </div>

      {/* Mission, Vision & Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="glass-card p-8 rounded-3xl space-y-4 border border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/30 flex items-center justify-center text-white">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white font-heading">Our Mission</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            To empower athletes and teams with cutting-edge anti-slip grip gear and performance equipment that enhances speed, stability, and athletic confidence.
          </p>
        </div>

        <div className="glass-card p-8 rounded-3xl space-y-4 border border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white font-heading">Our Vision</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            To make TS Sports the global benchmark in performance athletic apparel, sports equipment, and digital online shopping experience.
          </p>
        </div>

        <div className="glass-card p-8 rounded-3xl space-y-4 border border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white font-heading">Core Values</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Uncompromising quality standards, athlete-focused design, accessible direct WhatsApp ordering, and dedicated customer support.
          </p>
        </div>

      </div>

    </div>
  );
};
