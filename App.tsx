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
import VettedStartupsPage from './components/VettedStartupsPage';
import VettedStartupsApplyPage from './components/VettedStartupsApplyPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsAndConditionsPage from './components/TermsAndConditionsPage';

const SITE_URL = 'https://sibillastrupule.com';

interface RouteMeta {
  title: string;
  description: string;
  path: string;
  siteName?: string;
}

const ROUTE_META: Record<string, RouteMeta> = {
  '/': {
    title: 'Ieva Sibilla Strupule | Pitch Coach & Leadership Trainer',
    description:
      'Pitch coach and leadership trainer Ieva Sibilla Strupule helps founders and executives secure funding, sharpen their story, and win the room in high-stakes pitches.',
    path: '/',
  },
  '/about': {
    title: 'About Ieva Sibilla Strupule | Pitch Coach & Speaker',
    description:
      'Exited founder, global pitch champion, and associate professor — Ieva Sibilla Strupule has raised millions and trained 500+ founders to pitch and win.',
    path: '/about',
  },
  '/work': {
    title: 'Pitch Coaching Work & Case Studies | Ieva Sibilla Strupule',
    description:
      'See pitch coaching work and founder case studies from Ieva Sibilla Strupule — real decks, real funding rounds, and the results behind €70M+ raised by clients.',
    path: '/work',
  },
  '/speaking': {
    title: 'Keynote Speaker on Pitching & Investor Communication',
    description:
      'Book Ieva Sibilla Strupule as a keynote speaker — from the UN World Urban Forum to Women in Tech, she delivers high-impact talks on pitching and fundraising.',
    path: '/speaking',
  },
  '/scorecard': {
    title: 'Free Investor Pitch Scorecard — Score Your Deck in 2 Minutes',
    description:
      'Score your pitch deck across 10 investor criteria in under 2 minutes. Find exactly where investors lose interest and what to fix before your next meeting.',
    path: '/scorecard',
  },
  '/order': {
    title: 'Professional Pitch Deck Review — 24-Hour Turnaround',
    description:
      'Get a professional pitch deck review from Ieva Sibilla Strupule — slide-by-slide written feedback and a revised deck delivered to your inbox within 24 hours.',
    path: '/order',
  },
  '/vetted-startups': {
    title: 'Sibilla Strupule | Pitch Authority',
    description:
      'Sibilla Strupule — curated deal flow for investors and a premium vetting service for startups. VCs get qualified opportunities, founders get a warm introduction.',
    path: '/vetted-startups',
    siteName: 'Sibilla Strupule',
  },
  '/vetted-startups/apply': {
    title: 'Apply for Startup Vetting — €1,500 | Ieva Sibilla Strupule',
    description:
      'Apply for Ieva Sibilla Strupule’s €1,500 startup vetting — pitch deck, business plan, and idea review. Approved startups join her vetted startup list.',
    path: '/vetted-startups/apply',
  },
  '/privacy-policy': {
    title: 'Privacy Policy | Ieva Sibilla Strupule',
    description:
      'Read the privacy policy for sibillastrupule.com — how Aekora SIA collects, uses, and protects your personal data under GDPR when you use our services.',
    path: '/privacy-policy',
  },
  '/terms-and-conditions': {
    title: 'Terms & Conditions | Ieva Sibilla Strupule',
    description:
      'Review the terms and conditions for Sibilla Strupule services — payment terms, the no-refund policy, intellectual property, and governing law under Aekora SIA.',
    path: '/terms-and-conditions',
  },
};

const setMetaTag = (selector: string, attr: 'name' | 'property', key: string, content: string) => {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

const applyRouteMeta = (path: string) => {
  const meta = ROUTE_META[path] ?? ROUTE_META['/'];
  const url = SITE_URL + meta.path;

  document.title = meta.title;
  setMetaTag('meta[name="description"]', 'name', 'description', meta.description);

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', url);

  setMetaTag('meta[property="og:title"]', 'property', 'og:title', meta.title);
  setMetaTag('meta[property="og:description"]', 'property', 'og:description', meta.description);
  setMetaTag('meta[property="og:url"]', 'property', 'og:url', url);
  setMetaTag(
    'meta[property="og:site_name"]',
    'property',
    'og:site_name',
    meta.siteName ?? 'Ieva Sibilla Strupule'
  );
  setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', meta.title);
  setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', meta.description);
};

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

  useEffect(() => {
    applyRouteMeta(currentPath);
  }, [currentPath]);

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

  // Vetted Startups Landing Page
  if (currentPath === '/vetted-startups') {
    return (
      <div className="min-h-screen bg-brand-beige text-brand-dark font-sans overflow-x-hidden">
        <Navbar scrolled={scrolled} />
        <VettedStartupsPage />
        <Footer />
      </div>
    );
  }

  // Vetted Startups Apply Page
  if (currentPath === '/vetted-startups/apply') {
    return (
      <div className="min-h-screen bg-brand-beige text-brand-dark font-sans overflow-x-hidden">
        <Navbar scrolled={scrolled} />
        <VettedStartupsApplyPage />
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