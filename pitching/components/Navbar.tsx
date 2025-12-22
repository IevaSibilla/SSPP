import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Expertise', href: '#expertise' },
    { label: 'The Process', href: '#process' },
    { label: 'Speaking', href: '#speaking' },
    { label: 'About', href: '#about' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-brand-cream/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className="flex flex-col leading-none z-50 relative">
            <span className="font-serif text-2xl font-bold tracking-tight text-brand-dark">
              IEVA SIBILLA
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-brand-red font-semibold">
              Pitch Authority
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-brand-dark hover:text-brand-red transition-colors uppercase tracking-wider"
              >
                {link.label}
              </a>
            ))}
            <a 
              href="#contact"
              className="px-6 py-2 bg-brand-dark text-white rounded-full text-sm font-medium hover:bg-brand-red transition-colors uppercase tracking-wide"
            >
              Book Strategy Call
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden z-50 text-brand-dark"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-40 bg-brand-cream flex flex-col justify-center items-center"
          >
            <div className="flex flex-col space-y-8 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-3xl text-brand-dark hover:text-brand-red transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a 
                 href="#contact"
                 onClick={() => setIsMobileMenuOpen(false)}
                 className="text-lg font-medium text-brand-red uppercase tracking-widest mt-8"
              >
                Book Strategy Call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};