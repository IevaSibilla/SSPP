import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white py-12 border-t border-white/10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <h4 className="font-serif text-2xl font-bold mb-2">IEVA SIBILLA STRUPULE</h4>
          <p className="text-gray-400 text-sm">Pitch Authority & Global Keynote Speaker</p>
        </div>
        
        <div className="flex space-x-8 text-sm text-gray-400">
            <a href="#" className="hover:text-brand-red transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-brand-red transition-colors">Instagram</a>
            <a href="#" className="hover:text-brand-red transition-colors">Privacy Policy</a>
        </div>
      </div>
      <div className="container mx-auto px-6 mt-8 pt-8 border-t border-white/5 text-center text-xs text-gray-600">
        &copy; {new Date().getFullYear()} Aekora. All rights reserved.
      </div>
    </footer>
  );
};