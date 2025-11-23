import React from 'react';
import { motion } from 'framer-motion';

const AboutStats: React.FC = () => {
  const stats = [
    { value: '3M€+', label: 'Non-Equity Funding Raised' },
    { value: '4M€+', label: 'VC Funding Secured' },
    { value: '15k', label: 'Competitors Outpitched' },
    { value: '20+', label: 'Global Awards' },
  ];

  return (
    <div className="py-24 bg-brand-dark relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-serif mb-8 leading-snug">
              I build pitches that <br />
              <span className="text-brand-yellow italic">win money.</span>
            </h2>
            <div className="space-y-6 text-gray-300 font-light text-lg">
              <p>
                Founders often fail not because of a lack of funding, but a lack of clarity. 
                They polish an idea before validating it. They fear the pitch because they don't 
                understand the problem deep enough.
              </p>
              <p>
                I am an exited entrepreneur and global pitch award winner. I don't just teach theory; 
                I teach from the trenches. I help founders and executives communicate with conviction, 
                validate fast, and scale with a clear mindset.
              </p>
              <blockquote className="border-l-2 border-brand-yellow pl-6 py-2 my-8 text-xl font-serif text-white italic">
                "Your first idea isn't the business — it's the test."
              </blockquote>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-brand-charcoal p-8 border border-white/5 hover:border-brand-yellow/30 transition-colors group"
              >
                <div className="text-4xl md:text-5xl font-serif text-white mb-2 group-hover:text-brand-yellow transition-colors">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-widest text-gray-500">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutStats;