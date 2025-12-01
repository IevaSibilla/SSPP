import React, { useState } from 'react';
import { Sparkles, ArrowRight, Loader } from 'lucide-react';

const PitchDemo: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleRefine = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input) return;
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResult("🚀 Stronger Hook: 'We help 70% of early-stage founders avoid bankruptcy by automating market validation, saving them 6 months of wasted development time.' (Focus on the pain + specific outcome)");
    }, 2000);
  };

  return (
    <div className="py-24 bg-brand-accent/5">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl shadow-brand-accent/10">
          {/* Accent glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-accent/10 blur-[80px] rounded-full pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-brand-accent/10 p-2 rounded-lg">
                 <Sparkles className="text-brand-accent" size={24} />
              </div>
              <h2 className="text-2xl font-serif text-brand-dark">AI Pitch Refiner <span className="text-xs font-sans uppercase bg-brand-charcoal text-white px-2 py-1 rounded ml-2">Beta Demo</span></h2>
            </div>
            
            <p className="text-brand-gray mb-8 leading-relaxed">
              Experience a snippet of my "Founder's Advantage" toolkit. Enter your current one-liner below, and let our model suggest a high-impact hook instantly.
            </p>

            <form onSubmit={handleRefine} className="space-y-4">
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g., We make software for accountants to do taxes faster."
                className="w-full bg-brand-beige border border-brand-lightgray rounded-xl p-4 text-brand-dark placeholder-gray-400 focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all h-32 resize-none"
              />
              
              <div className="flex justify-end">
                <button 
                  type="submit" 
                  disabled={loading || !input}
                  className="px-6 py-3 bg-brand-dark text-white font-bold hover:bg-brand-accent transition-colors disabled:opacity-50 flex items-center gap-2 rounded-lg shadow-md"
                >
                  {loading ? <Loader className="animate-spin" size={18} /> : <Sparkles size={18} />}
                  Refine My Pitch
                </button>
              </div>
            </form>

            {result && (
              <div className="mt-8 p-6 bg-brand-accent/5 border-l-4 border-brand-accent rounded-r-lg animate-fade-in">
                <h4 className="text-brand-accent text-sm font-bold uppercase tracking-wider mb-2">Refined Suggestion:</h4>
                <p className="text-lg font-serif italic text-brand-dark leading-relaxed">"{result}"</p>
                <div className="mt-4 pt-4 border-t border-brand-accent/10">
                  <a href="#contact" className="text-sm text-brand-gray hover:text-brand-accent flex items-center gap-1 group font-medium">
                    Want to refine your full deck? Book a session <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PitchDemo;