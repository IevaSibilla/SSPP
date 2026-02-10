import React from 'react';

const SocialProof: React.FC = () => {
  const logos = [
    { name: 'Forbes', image: '/logo/Forbes_logo_black 1.png' },
    { name: 'United Nations', image: '/logo/UN-logo.png' },
    { name: 'ProductTank', image: '/logo/Product-Tank-logo.png' },
    { name: 'SSE Riga', image: '/logo/SSE-logo.png' },
    { name: 'TechCrunch', image: '/logo/TechCrunch-logo.png' },
    { name: 'Sifted', image: '/logo/Sifted-logo.png' },
    { name: 'Visa', image: '/logo/visa-logo.png' },
    { name: 'Shifter', image: '/logo/Shifter-logo.png' },
    { name: 'Shift School', image: '/logo/Shift-school-logo.png' },
    { name: 'Labs of Latvia', image: '/logo/Labs-of-Latvia-logo.png' },
    { name: 'Crucible', image: '/logo/Crucible-logo.png' },
    { name: 'TRG', image: '/logo/TRG-logo.png' },
  ];

  // Duplicate logos twice for true seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <div className="bg-white py-12 border-b border-brand-lightgray">
      <div className="container mx-auto px-6">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-brand-gray mb-8">
          Featured In & Trusted By
        </p>
      </div>

      {/* Full-width Marquee - breaks out of container */}
      <div className="relative w-full overflow-hidden">
        <div className="animate-scroll">
          {duplicatedLogos.map((logo, index) => (
            <div
              key={index}
              className="logo-item"
            >
              <img
                src={logo.image}
                alt={logo.name}
                style={{ height: '40px', width: 'auto' }}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }

        .animate-scroll {
          display: flex;
          align-items: center;
          animation: scroll 30s linear infinite;
          will-change: transform;
          width: max-content;
        }

        .logo-item {
          flex: 0 0 auto;
          padding: 0 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 60px;
          filter: grayscale(100%);
          opacity: 0.6;
          transition: filter 0.3s ease, opacity 0.3s ease;
        }

        .logo-item img {
          max-height: 40px;
          width: auto;
          object-fit: contain;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }

        .animate-scroll:hover .logo-item {
          filter: grayscale(0%);
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default SocialProof;