import React from 'react';

const SocialProof: React.FC = () => {
  const logos = [
    { name: 'Forbes', url: '#' },
    { name: 'United Nations', url: '#' },
    { name: 'ProductTank', url: '#' },
    { name: 'SSE Riga', url: '#' },
  ];

  return (
    <div className="bg-white py-12 border-b border-brand-lightgray">
      <div className="container mx-auto px-6">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-brand-gray mb-8">
          Featured In & Trusted By
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 hover:opacity-100 transition-opacity duration-500">
          {logos.map((logo, index) => (
            <div key={index} className="h-8 md:h-12 flex items-center justify-center">
               <span className="font-serif text-2xl md:text-3xl font-bold text-brand-charcoal">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialProof;