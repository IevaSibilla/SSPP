import React, { useState } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  scrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ scrolled }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Expertise', href: '#services' },
    { name: 'Methodology', href: '#process' },
    { name: 'About', href: '#about' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled || isOpen ? 'bg-white/90 backdrop-blur-md py-4 border-b border-brand-lightgray shadow-sm' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="text-2xl font-serif font-bold tracking-widest text-brand-dark flex items-center gap-1">
          IEVA SIBILLA<span className="text-brand-accent text-3xl leading-none">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm uppercase tracking-widest text-brand-gray hover:text-brand-accent transition-colors font-medium"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            className="px-6 py-2 border-2 border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white transition-all duration-300 text-sm uppercase tracking-wider font-bold flex items-center gap-2 rounded-full"
          >
            Contact Me<ArrowRight size={16} />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-brand-dark hover:text-brand-accent transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-brand-lightgray p-6 flex flex-col space-y-6 animate-fade-in-down shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-lg font-serif text-brand-dark hover:text-brand-accent font-semibold"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="block text-center w-full bg-brand-accent text-white py-3 font-semibold uppercase tracking-wider rounded-full"
          >
            Contact Me
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;