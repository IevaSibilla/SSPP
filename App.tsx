import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import AboutStats from './components/AboutStats';
import Services from './components/Services';
import Process from './components/Process';
import WorkPage from './components/WorkPage';
import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';
import AboutPage from './components/AboutPage';
import SpeakingPage from './components/SpeakingPage';
import ScorecardPage from './components/ScorecardPage';
import OrderPage from './components/OrderPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsAndConditionsPage from './components/TermsAndConditionsPage';

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setPopupVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

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

  // Order Page
  if (currentPath === '/order') {
    return (
      <div className="min-h-screen bg-brand-beige text-brand-dark font-sans overflow-x-hidden">
        <Navbar scrolled={scrolled} />
        <OrderPage />
        <Footer />
      </div>
    );
  }

  // Scorecard Page
  if (currentPath === '/scorecard') {
    return (
      <div className="min-h-screen bg-brand-beige text-brand-dark font-sans overflow-x-hidden">
        <Navbar scrolled={scrolled} />
        <ScorecardPage />
        <Footer />
      </div>
    );
  }

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

  // Work Page
  if (currentPath === '/work') {
    return (
      <div className="min-h-screen bg-brand-beige text-brand-dark font-sans overflow-x-hidden">
        <Navbar scrolled={scrolled} />
        <WorkPage />
        <Footer />
      </div>
    );
  }

  // Terms & Conditions Page
  if (currentPath === '/terms-and-conditions') {
    return (
      <div className="min-h-screen bg-brand-beige text-brand-dark font-sans overflow-x-hidden">
        <Navbar scrolled={scrolled} />
        <TermsAndConditionsPage />
        <Footer />
      </div>
    );
  }

  // Privacy Policy Page
  if (currentPath === '/privacy-policy') {
    return (
      <div className="min-h-screen bg-brand-beige text-brand-dark font-sans overflow-x-hidden">
        <Navbar scrolled={scrolled} />
        <PrivacyPolicyPage />
        <Footer />
      </div>
    );
  }

  // Speaking Page
  if (currentPath === '/speaking') {
    return (
      <div className="min-h-screen bg-brand-beige text-brand-dark font-sans overflow-x-hidden">
        <Navbar scrolled={scrolled} />
        <SpeakingPage />
        <Footer />
      </div>
    );
  }

  // Home Page
  return (
    <div className="min-h-screen bg-brand-beige text-brand-dark font-sans overflow-x-hidden">
      {popupVisible && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4" style={{ background: 'rgba(30,20,20,0.55)', backdropFilter: 'blur(4px)' }}>
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
            {/* Header */}
            <div className="bg-brand-dark px-8 pt-10 pb-8 text-center">
              <div className="inline-block bg-brand-accent/20 border border-brand-accent/30 text-brand-accent px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4">
                Free · Limited Time
              </div>
              <h2 className="font-serif text-3xl font-bold text-white leading-tight mb-3">
                Is Your Pitch<br /><span className="text-brand-accent italic">Investor Ready?</span>
              </h2>
              <p className="text-white/70 text-sm font-light leading-relaxed">
                Score your deck across 10 investor criteria in under 2 minutes. Find out exactly where you're losing them.
              </p>
            </div>
            {/* Body */}
            <div className="px-8 py-7 text-center">
              <div className="flex justify-center gap-6 mb-6 text-sm text-brand-gray font-light">
                <span>✓ Free scorecard</span>
                <span>✓ Instant results</span>
                <span>✓ No signup needed</span>
              </div>
              <a
                href="/scorecard"
                className="block w-full bg-brand-accent text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-brand-dark transition-all duration-300 shadow-lg shadow-brand-accent/30 mb-3"
              >
                Try the Free Scorecard →
              </a>
              <button
                onClick={() => setPopupVisible(false)}
                className="text-xs text-brand-gray/60 hover:text-brand-gray transition-colors font-light"
              >
                No thanks, I'll skip it
              </button>
            </div>
            {/* Close */}
            <button
              onClick={() => setPopupVisible(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors text-2xl leading-none"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
      )}
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

        <section id="contact">
          <ContactCTA />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;