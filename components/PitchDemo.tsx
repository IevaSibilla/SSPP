import React, { useState, useEffect, useMemo } from 'react';
import { Sparkles, ArrowRight, Loader, AlertCircle, Maximize2, X } from 'lucide-react';
import { refinePitch } from '../utils/pitchRefinerApi';
import { loadSystemPrompt } from '../utils/loadSystemPrompt';

// Simple markdown renderer component
const MarkdownContent: React.FC<{ content: string }> = ({ content }) => {
  const renderMarkdown = (text: string) => {
    // Split into lines and process
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let listItems: string[] = [];
    let inList = false;

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="list-disc list-inside space-y-1 my-3 text-brand-dark">
            {listItems.map((item, i) => (
              <li key={i} className="leading-relaxed">{formatInline(item)}</li>
            ))}
          </ul>
        );
        listItems = [];
        inList = false;
      }
    };

    const formatInline = (text: string): React.ReactNode => {
      // Bold text **text**
      const parts = text.split(/(\*\*[^*]+\*\*)/g);
      return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-bold text-brand-dark">{part.slice(2, -2)}</strong>;
        }
        return part;
      });
    };

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      // Headers
      if (trimmedLine.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={index} className="text-lg font-bold text-brand-dark mt-6 mb-3">
            {formatInline(trimmedLine.slice(4))}
          </h3>
        );
      } else if (trimmedLine.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={index} className="text-xl font-bold text-brand-dark mt-6 mb-3">
            {formatInline(trimmedLine.slice(3))}
          </h2>
        );
      } else if (trimmedLine.startsWith('# ')) {
        flushList();
        elements.push(
          <h1 key={index} className="text-2xl font-bold text-brand-dark mt-6 mb-3">
            {formatInline(trimmedLine.slice(2))}
          </h1>
        );
      }
      // Numbered headers like "1. **Title**"
      else if (/^\d+\.\s+\*\*/.test(trimmedLine)) {
        flushList();
        elements.push(
          <h4 key={index} className="text-base font-bold text-brand-accent mt-5 mb-2">
            {formatInline(trimmedLine)}
          </h4>
        );
      }
      // List items
      else if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
        inList = true;
        listItems.push(trimmedLine.slice(2));
      }
      // Empty line
      else if (trimmedLine === '') {
        flushList();
      }
      // Regular paragraph
      else if (trimmedLine) {
        flushList();
        elements.push(
          <p key={index} className="text-brand-dark leading-relaxed my-3">
            {formatInline(trimmedLine)}
          </p>
        );
      }
    });

    flushList();
    return elements;
  };

  return <div className="markdown-content">{renderMarkdown(content)}</div>;
};

// Truncate text to specified word count
const truncateWords = (text: string, wordLimit: number): { truncated: string; isTruncated: boolean } => {
  const words = text.split(/\s+/);
  if (words.length <= wordLimit) {
    return { truncated: text, isTruncated: false };
  }
  return { truncated: words.slice(0, wordLimit).join(' '), isTruncated: true };
};

const PitchDemo: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [systemPrompt, setSystemPrompt] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Memoize truncated result
  const { truncatedResult, isTruncated } = useMemo(() => {
    if (!result) return { truncatedResult: '', isTruncated: false };
    const { truncated, isTruncated } = truncateWords(result, 80);
    return { truncatedResult: truncated, isTruncated };
  }, [result]);

  // Load system prompt on component mount
  useEffect(() => {
    loadSystemPrompt()
      .then((prompt) => setSystemPrompt(prompt))
      .catch((err) => {
        console.error('Failed to load system prompt:', err);
        setSystemPrompt('');
      });
  }, []);

  const handleRefine = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const prompt = systemPrompt || await loadSystemPrompt();
      const refinedPitch = await refinePitch(input.trim(), prompt);
      setResult(refinedPitch);
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Failed to refine pitch. Please try again.';
      setError(errorMessage);
      console.error('Error refining pitch:', err);
    } finally {
      setLoading(false);
    }
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

            {error && (
              <div className="mt-8 p-6 bg-red-50 border-l-4 border-red-500 rounded-r-lg animate-fade-in">
                <div className="flex items-start gap-3">
                  <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="text-red-700 text-sm font-bold uppercase tracking-wider mb-2">Error</h4>
                    <p className="text-red-600 text-sm leading-relaxed">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {result && (
              <div className="mt-8 p-6 bg-brand-accent/5 border-l-4 border-brand-accent rounded-r-lg animate-fade-in">
                <div className="flex items-start justify-between gap-4">
                  <h4 className="text-brand-accent text-sm font-bold uppercase tracking-wider mb-2">Refined Suggestion:</h4>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex-shrink-0 p-2 text-brand-accent hover:bg-brand-accent/10 rounded-lg transition-colors"
                    title="Expand to full view"
                  >
                    <Maximize2 size={18} />
                  </button>
                </div>
                <p className="text-base text-brand-dark leading-relaxed">
                  {truncatedResult}
                  {isTruncated && (
                    <span className="text-brand-gray">...</span>
                  )}
                </p>
                {isTruncated && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="mt-3 text-sm text-brand-accent hover:text-brand-dark font-medium flex items-center gap-1 transition-colors"
                  >
                    View full analysis <Maximize2 size={14} />
                  </button>
                )}
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

      {/* Modal for full content view */}
      {isModalOpen && result && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-3xl max-h-[85vh] bg-white rounded-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-brand-lightgray p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-brand-accent/10 p-2 rounded-lg">
                  <Sparkles className="text-brand-accent" size={20} />
                </div>
                <h3 className="text-xl font-serif text-brand-dark">Refined Pitch Suggestion</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-brand-gray hover:text-brand-dark hover:bg-brand-beige rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(85vh-140px)]">
              <div className="prose prose-lg max-w-none">
                <MarkdownContent content={result} />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t border-brand-lightgray p-6">
              <div className="flex items-center justify-between">
                <a 
                  href="#contact" 
                  onClick={() => setIsModalOpen(false)}
                  className="text-sm text-brand-gray hover:text-brand-accent flex items-center gap-1 group font-medium"
                >
                  Want to refine your full deck? Book a session <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                </a>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 bg-brand-dark text-white font-bold hover:bg-brand-accent transition-colors rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PitchDemo;