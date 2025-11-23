import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background with Gradient Overlay - Simulating the dark luxury vibe */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/95 to-brand-dark/40 z-10"></div>
        {/* Placeholder for the Image provided in PDF (Yellow suit woman) */}
        <img
          src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2069&auto=format&fit=crop" 
          alt="Ieva Sibilla Strupule Speaker"
          className="w-full h-full object-cover object-right opacity-60 grayscale-[20%]"
        />
      </div>

      <div className="container mx-auto px-6 relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="inline-block mb-4 px-3 py-1 border border-brand-yellow/30 rounded-full bg-brand-yellow/10">
            <span className="text-brand-yellow text-xs font-bold tracking-[0.2em] uppercase">
              Global Pitch Authority
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif font-medium leading-tight mb-6 text-white">
            Pitch Like <br />
            <span className="italic text-brand-yellow">A Founder.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 font-light leading-relaxed">
            Secure funding and turn ideas into investable ventures. Learn directly from an exited international entrepreneur, UN award winner, and Forbes-featured expert.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="px-8 py-4 bg-brand-yellow text-brand-dark font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 text-center"
            >
              Invite to Speak
            </a>
            <a
              href="#process"
              className="px-8 py-4 border border-white/30 text-white font-semibold uppercase tracking-widest hover:border-brand-yellow hover:text-brand-yellow transition-all duration-300 text-center flex items-center justify-center gap-2 group"
            >
              <Play size={18} className="fill-current group-hover:scale-110 transition-transform" />
              Watch Reel
            </a>
          </div>
        </motion.div>

        {/* Right side spacer on large screens to reveal the background image more */}
        <div className="hidden lg:block"></div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-brand-yellow to-transparent"></div>
      </motion.div>
    </div>
  );
};

export default Hero;