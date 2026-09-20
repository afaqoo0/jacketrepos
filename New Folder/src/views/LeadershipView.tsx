import React from 'react';
import { useStore } from '../context/StoreContext';
import { Users, ShieldCheck, Award } from 'lucide-react';

export const LeadershipView: React.FC = () => {
  const { leadership } = useStore();
  const ceo = leadership.find((l) => l.name.toLowerCase().includes('kashif')) || leadership[0] || {
    id: 'lead-1',
    name: 'Kashif Tufail',
    designation: 'Chief Executive Officer & Founder',
    bio: 'Visionary founder and CEO of TS Sports. Kashif Tufail leads the brand in pioneering high-performance athletic apparel, precision grip gear, and global sporting goods innovation.',
    image: '/ceo.jpg',
    displayOrder: 1,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-slate-800 space-y-3 text-center sm:text-left">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 border border-white/30 text-white text-xs font-bold font-heading">
          <Users className="w-3.5 h-3.5" />
          <span>Executive Leadership</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white font-heading">
          EXECUTIVE LEADERSHIP
        </h1>
        <p className="text-sm text-slate-300 max-w-2xl">
          Introducing the executive leadership behind TS Sports' innovation, quality manufacturing, and global vision.
        </p>
      </div>

      {/* Single CEO Profile Showcase */}
      <div className="max-w-4xl mx-auto">
        <div className="glass-card rounded-3xl overflow-hidden border border-white/50 grid grid-cols-1 md:grid-cols-12 shadow-2xl">
          
          <div className="md:col-span-5 bg-slate-900 overflow-hidden relative aspect-[4/5] md:aspect-auto">
            <img
              src={(ceo.image && ceo.image.includes('unsplash.com')) ? '/ceo.jpg' : (ceo.image || '/ceo.jpg')}
              alt={ceo.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
            
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-white text-slate-950 uppercase font-heading shadow-md">
                CEO & Founder
              </span>
            </div>
          </div>

          <div className="md:col-span-7 p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-extrabold text-white uppercase tracking-widest font-heading">
                  TS Sports Pakistan Executive Leader
                </span>
                <h2 className="text-3xl font-black text-white font-heading mt-1">
                  {ceo.name}
                </h2>
                <p className="text-sm text-slate-300 font-semibold mt-0.5">
                  {ceo.designation}
                </p>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {ceo.bio}
              </p>

              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold uppercase text-white font-heading flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-white" />
                  Leadership Vision:
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  "At TS Sports, our commitment is to provide athletes and teams with high-performance gear that elevates agility, eliminates friction injuries, and delivers pro-grade quality at accessible rates."
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center space-x-1.5 text-white font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Executive Profile</span>
              </span>
              <span className="font-mono text-[11px] text-slate-500">TS SPORTS HQ</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
