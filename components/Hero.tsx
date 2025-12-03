import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-brand-beige">
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[100px] animate-blob mix-blend-multiply"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-yellow-200/20 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-multiply"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl order-2 lg:order-1"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="h-px w-8 bg-brand-accent"></div>
            <span className="text-brand-accent text-xs font-bold tracking-[0.2em] uppercase">
              Global Pitch Authority
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-serif font-medium leading-[1.1] mb-6 text-brand-dark">
            Unlock Your <br />
            Potential with <br />
            <span className="relative inline-block">
              Proven Strategies
              {/* Scribble SVG Underline */}
              <svg className="absolute w-full h-4 -bottom-2 left-0 text-brand-accent" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.00025 6.99997C2.00025 6.99997 34.0002 2.99998 66.5002 2.49998C99.0002 1.99998 128 4.99999 156.5 4.99999C185 4.99999 197.501 1.99998 197.501 1.99998" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="text-lg md:text-xl text-brand-gray mb-10 font-light leading-relaxed max-w-lg">
            Secure funding and turn ideas into investable ventures. Learn directly from an exited international entrepreneur.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#contact"
              className="px-8 py-4 bg-brand-accent text-white font-bold uppercase tracking-widest hover:bg-brand-charcoal transition-all duration-300 text-center rounded-full shadow-lg shadow-brand-accent/30 hover:shadow-xl hover:-translate-y-1"
            >
              Invite to Speak
            </a>
            <a
              href="#process"
              className="px-8 py-4 bg-white text-brand-dark font-semibold uppercase tracking-widest border border-brand-lightgray hover:border-brand-accent hover:text-brand-accent transition-all duration-300 text-center flex items-center justify-center gap-2 group rounded-full"
            >
              <Play size={18} className="fill-current group-hover:scale-110 transition-transform" />
              Watch Reel
            </a>
          </div>
        </motion.div>

        {/* Right: Floating Organic Blob Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="order-1 lg:order-2 flex justify-center lg:justify-end relative"
        >
          {/* Doodle Arrow */}
          <motion.svg
            initial={{ opacity: 0, pathLength: 0 }}
            animate={{ opacity: 1, pathLength: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute top-0 left-0 md:-left-12 w-24 h-24 text-brand-dark z-20 hidden md:block"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M10,90 Q50,10 90,50" />
            <path d="M80,45 L90,50 L85,60" />
          </motion.svg>

          <motion.div
            animate={{
              y: [0, -20, 0],
              borderRadius: ["60% 40% 30% 70% / 60% 30% 70% 40%", "30% 60% 70% 40% / 50% 60% 30% 60%", "60% 40% 30% 70% / 60% 30% 70% 40%"]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative w-[400px] h-[400px] md:w-[600px] md:h-[600px] overflow-hidden shadow-2xl shadow-brand-accent/20 border-4 border-white bg-white"
            style={{
              borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
              willChange: "border-radius, transform"
            }}
          >
            <img
              src="/ievaJumpSuit.png"
              alt="Ieva Sibilla Strupule"
              className="w-full h-full object-cover"
              style={{ 
                willChange: "transform",
                objectPosition: "center 28%"
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gray">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-brand-accent to-transparent"></div>
      </motion.div>
    </div>
  );
};

export default Hero;