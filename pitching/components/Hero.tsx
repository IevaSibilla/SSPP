import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from './ui/Button';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  const rotate = useTransform(scrollY, [0, 500], [0, 5]);

  return (
    <section className="relative min-h-screen pt-24 pb-12 overflow-visible flex flex-col justify-center">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <div className="flex items-center space-x-2 mb-6">
               <span className="h-[1px] w-12 bg-brand-red inline-block"></span>
               <span className="text-brand-red font-semibold tracking-widest text-sm uppercase">Pitch Authority</span>
            </div>
            
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-8 text-brand-dark">
              Pitch Like a <br/>
              <span className="italic text-brand-red relative inline-block">
                Founder
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-brand-red opacity-30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-brand-gray mb-8 max-w-lg leading-relaxed">
              Learn from an exited international entrepreneur and global pitch award winner featured in Forbes. Communicate with clarity, confidence, and conviction.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button onClick={() => document.getElementById('contact')?.scrollIntoView()}>
                Book a Keynote
              </Button>
              <Button variant="outline" onClick={() => document.getElementById('expertise')?.scrollIntoView()}>
                Explore Expertise
              </Button>
            </div>

            <div className="mt-12 flex items-center space-x-6">
              {['Forbes', 'CNN', 'FOX', 'United Nations'].map((brand, i) => (
                <span key={i} className="text-brand-gray/40 font-serif font-bold text-xl uppercase tracking-wider">
                  {brand}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Image Content */}
          <motion.div 
            style={{ y: y1, rotate }}
            className="order-1 lg:order-2 relative perspective-1000"
          >
            <div className="relative w-full max-w-md mx-auto lg:mr-0">
              
              {/* Organic Blob Shape Container - Animated */}
              {/* Using backgroundImage provides better clipping for complex border-radius animations than an img tag */}
              <motion.div 
                className="relative w-full aspect-[3/4] md:aspect-[4/5] shadow-2xl transition-all duration-500 hover:shadow-brand-red/20 z-10"
                style={{ 
                  backgroundImage: "url('/ievaJumpSuit.png')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center top',
                  backgroundColor: '#f3f4f6', // Fallback color while loading
                  transform: 'translateZ(0)', // Hardware acceleration
                }} 
                animate={{
                  borderRadius: [
                    '30% 70% 70% 30% / 30% 30% 70% 70%',
                    '50% 50% 20% 80% / 25% 80% 20% 75%',
                    '67% 33% 47% 53% / 37% 20% 80% 63%',
                    '39% 61% 47% 53% / 37% 40% 60% 63%',
                    '30% 70% 70% 30% / 30% 30% 70% 70%'
                  ]
                }}
                transition={{
                  duration: 8,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "mirror"
                }}
              >
                {/* Visually hidden text for accessibility */}
                <span className="sr-only">Ieva Sibilla Strupule</span>
              </motion.div>

              {/* Quote Card - Floating outside the blob */}
              <motion.div 
                className="absolute -bottom-8 -left-4 md:-left-12 z-20 w-3/4 md:w-2/3 min-w-[200px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: [0, -10, 0] }}
                transition={{ 
                  opacity: { delay: 0.5, duration: 0.5 },
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" } 
                }}
              >
                <div className="bg-white/95 backdrop-blur-md p-6 rounded-tl-[2rem] rounded-br-[2rem] rounded-tr-lg rounded-bl-lg shadow-xl border border-white/50 border-l-4 border-l-brand-red">
                   <p className="font-serif text-xl italic text-brand-dark leading-snug">"I build pitches that win money."</p>
                </div>
              </motion.div>
            </div>
            
            {/* Decorative element behind */}
            <motion.div 
               style={{ y: y2 }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-red rounded-full opacity-10 blur-3xl -z-10"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};