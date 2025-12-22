import React from 'react';
import { motion } from 'framer-motion';
import { Mic, TrendingUp, Lightbulb, Users } from 'lucide-react';
import { ServiceItem } from '../types';

const expertise: ServiceItem[] = [
  {
    id: 1,
    title: "Pitching Mastery",
    description: "Teaching how to speak, persuade, and win like a founder. Focus on clarity and conviction.",
    icon: Mic
  },
  {
    id: 2,
    title: "Idea Validation",
    description: "Helping teams build fundable ideas. I've raised over 3M EUR in zero-equity funding.",
    icon: Lightbulb
  },
  {
    id: 3,
    title: "Founder Mindset",
    description: "Coaching founders and executives to lead with clarity, courage, and impact.",
    icon: TrendingUp
  },
  {
    id: 4,
    title: "Ecosystem Leadership",
    description: "Consulting companies, co-running ProductTank Riga, mentoring at SSE Riga.",
    icon: Users
  }
];

export const Expertise: React.FC = () => {
  return (
    <section id="expertise" className="py-24 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl text-brand-dark mb-4"
          >
            Core Expertise
          </motion.h2>
          <p className="text-brand-gray max-w-2xl mx-auto">
            Guiding entrepreneurs from idea validation to investment-ready execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {expertise.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 border border-brand-cream bg-brand-cream/30 hover:bg-white hover:shadow-xl transition-all duration-300 rounded-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <item.icon className="w-24 h-24 text-brand-red" />
              </div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-brand-red/10 rounded-full flex items-center justify-center mb-6 text-brand-red group-hover:bg-brand-red group-hover:text-white transition-colors">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl mb-4 text-brand-dark">{item.title}</h3>
                <p className="text-brand-gray leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};