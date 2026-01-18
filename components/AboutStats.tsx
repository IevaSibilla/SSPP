import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const AboutStats: React.FC = () => {
  const stats = [
    { value: '7M€+', label: 'Raised (grants + VC)' },
    { value: '500+', label: 'Founders and Executives Trained' },
    { value: '25k+', label: 'Competitors Outpitched' },
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
                Most pitches fail in the first 30 seconds. Not because the idea is bad — but because it isn't clear enough. In high-stakes rooms — with investors, board members, or decision-makers — clarity and confidence are everything.  
              </p>
              <p>
                I've been on both sides of that table. I'm an exited entrepreneur and global pitch award winner who has raised funding and led critical conversations where outcomes mattered. I don't teach theory — I teach what actually works under pressure. I help founders and executives communicate with clarity, project real conviction, and lead conversations that move decisions forward.
              </p>
              <blockquote className="border-l-4 border-brand-accent pl-6 py-2 my-8 text-xl font-serif text-brand-dark italic bg-white p-6 rounded-r-xl shadow-sm">
                "If your message isn't sharp immediately, attention drops. Doubt creeps in. And the decision is quietly made."
              </blockquote>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="flex flex-col gap-6">
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
            
            {/* Secondary CTA */}
            <div className="flex justify-center">
              <motion.a
                href="/about"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="group inline-flex items-center justify-center gap-3 py-4 px-12 border-2 border-brand-accent text-brand-accent rounded-full hover:bg-brand-accent hover:text-white transition-all duration-300 w-[600px] max-w-full"
              >
                <span className="text-sm uppercase tracking-widest font-semibold">Read the full story</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutStats;