import React from 'react';
import { Button } from './ui/Button';
import { Mail, Calendar, Linkedin, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
        {/* Large red circle bg */}
        <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto bg-brand-cream rounded-[3rem] p-12 md:p-20 shadow-2xl text-center">
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl md:text-5xl text-brand-dark mb-6"
          >
            Turn your idea into an <br/>
            <span className="text-brand-red">investable business.</span>
          </motion.h2>

          <p className="text-xl text-brand-gray mb-12 max-w-2xl mx-auto">
            Ready to secure funding and communicate with clarity? <br/>
            Choose how you want to work with me.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
             <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-serif text-2xl mb-2">Keynotes & Speaking</h3>
                <p className="text-sm text-gray-500 mb-6">For conferences, accelerators & universities.</p>
                <a href="mailto:ieva@aekora.com?subject=Speaking Inquiry" className="inline-block">
                    <Button variant="outline" className="w-full">Invite me to Speak</Button>
                </a>
             </div>
             <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <h3 className="font-serif text-2xl mb-2">Founder Mentoring</h3>
                <p className="text-sm text-gray-500 mb-6">1:1 Strategy & Investor Readiness.</p>
                <a href="#" className="inline-block">
                    <Button className="w-full">Book Strategy Call</Button>
                </a>
             </div>
          </div>

          <div className="flex flex-col items-center space-y-4">
            <span className="text-sm uppercase tracking-widest text-brand-gray">Connect on Socials</span>
            <div className="flex space-x-6">
                <a href="#" className="p-3 bg-white rounded-full shadow-sm hover:text-brand-red hover:scale-110 transition-all">
                    <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="p-3 bg-white rounded-full shadow-sm hover:text-brand-red hover:scale-110 transition-all">
                    <Instagram className="w-6 h-6" />
                </a>
                <a href="mailto:ieva@aekora.com" className="p-3 bg-white rounded-full shadow-sm hover:text-brand-red hover:scale-110 transition-all">
                    <Mail className="w-6 h-6" />
                </a>
            </div>
            <p className="mt-8 text-brand-gray/60 text-sm">ieva@aekora.com</p>
          </div>

        </div>
      </div>
    </section>
  );
};