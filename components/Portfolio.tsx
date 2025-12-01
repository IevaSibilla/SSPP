import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PortfolioItem } from '../types';

const portfolioItems: PortfolioItem[] = [
  {
    id: '1',
    title: 'Global Keynote Stages',
    category: 'Speaking',
    description: 'Delivering the "Pitch Like a Founder" methodology to audiences of 1,000+ at TechChill, Latitude59, and United Nations events.',
    image: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Grantmapper Ecosystem',
    category: 'Venture Building',
    description: 'Founded and scaled a funding platform. Personally raised over 3M EUR in non-equity funding and secured 4M EUR from VCs.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'The Founder\'s Advantage',
    category: 'Training',
    description: 'Exclusive workshops for executive teams on storytelling, investor psychology, and strategic communication.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'ProductTank Riga',
    category: 'Leadership',
    description: 'Co-running ProductTank Riga and lecturing at SSE Riga to foster the next generation of Nordic innovation.',
    image: 'https://images.unsplash.com/photo-1515168816992-d223057bd149?q=80&w=2070&auto=format&fit=crop',
  }
];

const Portfolio: React.FC = () => {
  return (
    <div className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <p className="text-brand-accent text-xs font-bold uppercase tracking-[0.2em] mb-4">
              Selected Work
            </p>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight text-brand-dark">
              Impact & <span className="italic text-brand-gray">Execution</span>
            </h2>
          </div>
          <div className="md:text-right">
             <p className="text-brand-gray max-w-xs text-sm leading-relaxed md:ml-auto">
               From building companies to commanding stages, my work is defined by clarity, speed, and results.
             </p>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioItems.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative overflow-hidden cursor-pointer rounded-2xl shadow-lg ${
                index === 0 || index === 3 ? 'md:col-span-2 md:aspect-[21/9]' : 'md:aspect-[4/3]'
              } aspect-[4/3]`}
            >
              {/* Background Image with Zoom Effect */}
              <div className="absolute inset-0 bg-brand-charcoal">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-transparent to-transparent opacity-80"></div>
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                <div className="transform transition-transform duration-500 translate-y-4 group-hover:translate-y-0">
                  <div className="flex justify-between items-end border-b border-white/20 pb-6 mb-6 group-hover:border-brand-accent transition-colors">
                    <div>
                      <span className="text-brand-accent text-xs font-bold uppercase tracking-widest mb-2 block bg-white/10 w-fit px-2 py-1 rounded backdrop-blur-sm">
                        {item.category}
                      </span>
                      <h3 className="text-3xl md:text-4xl font-serif text-white">
                        {item.title}
                      </h3>
                    </div>
                    <div className="hidden md:block">
                      <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-brand-accent group-hover:border-transparent transition-all">
                         <ArrowUpRight size={20} />
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-200 text-lg font-light max-w-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More CTA */}
        <div className="mt-16 text-center">
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-brand-dark hover:text-brand-accent transition-colors border-b border-brand-lightgray hover:border-brand-accent pb-1"
          >
            See More on Instagram <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;