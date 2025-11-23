import React from 'react';

const SocialProof: React.FC = () => {
  const logos = [
    { name: 'Forbes', url: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Forbes_logo.svg' },
    { name: 'United Nations', url: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Flag_of_the_United_Nations.svg' },
    { name: 'ProductTank', url: 'https://images.opencollective.com/producttank/7377508/logo/256.png' },
    { name: 'SSE Riga', url: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/50/SSERiga_Logo.png/220px-SSERiga_Logo.png' },
  ];

  return (
    <div className="bg-brand-charcoal py-12 border-y border-white/5">
      <div className="container mx-auto px-6">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-gray-500 mb-8">
          Featured In & Trusted By
        </p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 grayscale opacity-50 hover:opacity-80 transition-opacity duration-500">
          {logos.map((logo, index) => (
            <div key={index} className="h-8 md:h-12 flex items-center justify-center">
               {/* Note: Using text fallback if images break, but styled to look like logos */}
               <span className="font-serif text-2xl md:text-3xl font-bold text-white/40">{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialProof;