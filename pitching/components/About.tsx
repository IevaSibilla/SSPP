import React from 'react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-brand-cream">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="w-full lg:w-1/2"
          >
             <div className="relative">
                <div className="absolute top-4 left-4 w-full h-full border-2 border-brand-red rounded-lg z-0"></div>
                <img 
                    src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=1000&auto=format&fit=crop" 
                    alt="Ieva Speaking" 
                    className="w-full h-auto rounded-lg shadow-xl relative z-10 filter grayscale hover:grayscale-0 transition-all duration-500"
                />
             </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="w-full lg:w-1/2"
          >
            <h2 className="font-serif text-4xl mb-8 text-brand-dark">
              Authoritative but Human.
            </h2>
            <div className="space-y-6 text-brand-gray text-lg leading-relaxed">
              <p>
                <strong className="text-brand-dark">Ieva Sibilla Strupule</strong> combines deep experience with authentic results. 
                Selected from over 15,000 participants as a global pitch award winner, she knows what it takes to stand out in a crowded market.
              </p>
              <p>
                "Pitch like a founder" isn't just a slogan—it's a methodology. Whether you are seeking VC funding, 
                grants, or trying to scale your company, the ability to communicate your value with conviction is your 
                greatest asset.
              </p>
              <div className="pt-6 border-l-4 border-brand-red pl-6 italic text-brand-dark">
                "Founders fail not because of lack of funding, but lack of clarity. Courage, clarity and execution: the real founder trifecta."
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};