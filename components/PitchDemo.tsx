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
    // Simulate AI processing
    setTimeout(() => {
      setLoading(false);
      setResult("🚀 Stronger Hook: 'We help 70% of early-stage founders avoid bankruptcy by automating market validation, saving them 6 months of wasted development time.' (Focus on the pain + specific outcome)");
    }, 2000);
  };

  return (
    <div className="py-24 bg-gradient-to-b from-brand-charcoal to-brand-dark border-t border-white/5">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-12 relative overflow-hidden">
          {/* Accent glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-yellow/10 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="text-brand-yellow" size={24} />
              <h2 className="text-2xl font-serif">AI Pitch Refiner <span className="text-xs font-sans uppercase bg-white/10 px-2 py-1 rounded text-gray-400 ml-2">Beta Demo</span></h2>
            </div>
            
            <p className="text-gray-400 mb-8">
              Experience a snippet of my "Founder's Advantage" toolkit. Enter your current one-liner below, and let our model suggest a high-impact hook instantly.
            </p>

            <form onSubmit={handleRefine} className="space-y-4">
              <textarea 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g., We make software for accountants to do taxes faster."
                className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-white placeholder-gray-600 focus:outline-none focus:border-brand-yellow transition-colors h-32 resize-none"
              />
              
              <div className="flex justify-end">
                <button 
                  type="submit" 
                  disabled={loading || !input}
                  className="px-6 py-3 bg-white text-brand-dark font-bold hover:bg-brand-yellow transition-colors disabled:opacity-50 flex items-center gap-2 rounded"
                >
                  {loading ? <Loader className="animate-spin" size={18} /> : <Sparkles size={18} />}
                  Refine My Pitch
                </button>
              </div>
            </form>

            {result && (
              <div className="mt-8 p-6 bg-brand-yellow/5 border-l-2 border-brand-yellow rounded-r-lg animate-fade-in">
                <h4 className="text-brand-yellow text-sm font-bold uppercase tracking-wider mb-2">Refined Suggestion:</h4>
                <p className="text-lg font-serif italic text-white leading-relaxed">"{result}"</p>
                <div className="mt-4 pt-4 border-t border-white/5">
                  <a href="#contact" className="text-sm text-gray-400 hover:text-white flex items-center gap-1 group">
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