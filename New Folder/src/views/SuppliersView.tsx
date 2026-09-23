import React from 'react';
import { useStore } from '../context/StoreContext';
import { Truck, MapPin, ExternalLink, Factory } from 'lucide-react';

export const SuppliersView: React.FC = () => {
  const { suppliers } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header */}
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border slate-200 space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full slate-950/10 border slate-900/30 slate-950 text-xs font-bold font-heading">
          <Truck className="w-3.5 h-3.5" />
          <span>Global Supply Chain Network</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black slate-950 font-heading">
          TRUSTED SUPPLIERS & PARTNERS
        </h1>
        <p className="text-sm slate-700 max-w-2xl">
          We partner with world-leading technical textile mills, silicone compound laboratories, and eco-conscious packaging solution providers to deliver uncompromised quality.
        </p>
      </div>

      {/* Supplier Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {suppliers.map((supplier) => (
          <div
            key={supplier.id}
            className="glass-card p-6 sm:p-8 rounded-3xl border slate-200 flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 hover:slate-950/40 transition-all"
          >
            <div className="w-20 h-20 rounded-2xl white overflow-hidden flex-shrink-0 border slate-200 flex items-center justify-center p-2">
              {supplier.logo ? (
                <img src={supplier.logo} alt={supplier.name} className="w-full h-full object-contain" />
              ) : (
                <Factory className="w-8 h-8 slate-950" />
              )}
            </div>

            <div className="space-y-3 flex-1">
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded slate-950/20 slate-950 font-heading">
                  {supplier.category}
                </span>
                <h3 className="text-xl font-bold slate-950 mt-1.5 font-heading">
                  {supplier.name}
                </h3>
              </div>

              <p className="text-xs slate-700 leading-relaxed">
                {supplier.description}
              </p>

              <div className="pt-2 flex items-center justify-between text-xs slate-600 border-t slate-200">
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 slate-950" />
                  <span>{supplier.location}</span>
                </span>

                {supplier.website && (
                  <a
                    href={supplier.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1 font-bold slate-950 hover:underline font-heading"
                  >
                    <span>Visit Website</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
