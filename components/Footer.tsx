import React from 'react';
import { Linkedin, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-2xl font-serif font-bold tracking-widest mb-6">IEVA SIBILLA<span className="text-brand-accent">.</span></h2>
            <p className="text-gray-400 max-w-sm mb-8 font-light">
              Helping leaders and founders communicate with clarity, confidence, and conviction. 
              Turn your idea into an investable business.
            </p>
            <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-brand-accent">Explore</h4>
            <ul className="space-y-4 text-sm text-gray-400">
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#process" className="hover:text-white transition-colors">Methodology</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
             <h4 className="text-sm font-bold uppercase tracking-widest mb-6 text-brand-accent">Resources</h4>
             <ul className="space-y-4 text-sm text-gray-400">
                <li><a href="/work" className="hover:text-white transition-colors">Work</a></li>
                <li><a href="#" className="hover:text-white transition-colors">The Founder's Advantage</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pitch Deck Template</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs text-gray-600">
            <p>&copy; {new Date().getFullYear()} Ieva Sibilla Strupule. All rights reserved.</p>
            <p>Designed with <span className="text-brand-accent">♥</span> for Founders.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;