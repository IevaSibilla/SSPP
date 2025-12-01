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
    <div className="py-24 bg-brand-beige relative overflow-hidden">
        {/* Decor */}
        <div className="absolute top-20 left-0 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-snug text-brand-dark">
              I build pitches that <br />
              <span className="text-brand-accent italic relative">
                win money.
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-brand-accent opacity-50" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </span>
            </h2>
            <div className="space-y-6 text-brand-gray font-light text-lg">
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
              <blockquote className="border-l-4 border-brand-accent pl-6 py-2 my-8 text-xl font-serif text-brand-dark italic bg-white p-6 rounded-r-xl shadow-sm">
                "Your first idea isn't the business — it's the test."
              </blockquote>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg shadow-gray-200/50 hover:-translate-y-1 transition-transform duration-300 border border-transparent hover:border-brand-accent/30"
              >
                <div className="text-4xl md:text-5xl font-serif text-brand-dark mb-2">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-widest text-brand-gray font-semibold">
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