import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import AboutStats from './components/AboutStats';
import Services from './components/Services';
import Process from './components/Process';
import Portfolio from './components/Portfolio';
import PitchDemo from './components/PitchDemo';
import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';
import AboutPage from './components/AboutPage';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // About Page
  if (currentPath === '/about') {
    return (
      <div className="min-h-screen bg-brand-beige text-brand-dark font-sans overflow-x-hidden">
        <Navbar scrolled={scrolled} />
        <AboutPage />
        <Footer />
      </div>
    );
  }

  // Home Page
  return (
    <div className="min-h-screen bg-brand-beige text-brand-dark font-sans overflow-x-hidden">
      <Navbar scrolled={scrolled} />
      
      <main>
        <section id="home">
          <Hero />
        </section>

        <SocialProof />

        <section id="about">
          <AboutStats />
        </section>

        <section id="services">
          <Services />
        </section>

        <section id="process">
          <Process />
        </section>

        <section id="portfolio">
          <Portfolio />
        </section>

        {/* Interactive Element showing "Innovation" expertise */}
        <section id="ai-demo">
          <PitchDemo />
        </section>

        <section id="contact">
          <ContactCTA />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;