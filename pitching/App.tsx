import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Expertise } from './components/Expertise';
import { Process } from './components/Process';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FloatingElements } from './components/FloatingElements';

function App() {
  return (
    <div className="min-h-screen bg-brand-cream text-brand-dark selection:bg-brand-red selection:text-white font-sans">
      <FloatingElements />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Expertise />
        <About />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;