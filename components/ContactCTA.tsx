import React from 'react';
import { ArrowUpRight, Mail, Linkedin, Instagram } from 'lucide-react';

const ContactCTA: React.FC = () => {
  return (
    <div className="py-24 bg-brand-dark relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
        
        <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                
                {/* Left: Main CTA */}
                <div>
                    <p className="text-brand-yellow font-bold uppercase tracking-[0.2em] mb-4">Ready to Scale?</p>
                    <h2 className="text-5xl md:text-7xl font-serif mb-8 leading-none">
                        Let's Make You <br/>
                        <span className="text-gray-500 hover:text-white transition-colors cursor-default">Investable.</span>
                    </h2>
                    
                    <div className="flex flex-col gap-6 items-start mt-12">
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="group flex items-center gap-4 text-xl font-light hover:text-brand-yellow transition-colors">
                            <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-brand-yellow group-hover:bg-brand-yellow group-hover:text-brand-dark transition-all">
                                <Linkedin size={20} />
                            </span>
                            Connect on LinkedIn for Strategy Tips
                        </a>
                        <a href="mailto:ieva@aekora.com" className="group flex items-center gap-4 text-xl font-light hover:text-brand-yellow transition-colors">
                            <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-brand-yellow group-hover:bg-brand-yellow group-hover:text-brand-dark transition-all">
                                <Mail size={20} />
                            </span>
                            ieva@aekora.com
                        </a>
                    </div>
                </div>

                {/* Right: Specific Actions */}
                <div className="flex flex-col justify-center gap-6">
                    <div className="bg-brand-charcoal p-8 border border-white/5 hover:border-brand-yellow/50 transition-all group cursor-pointer">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-2xl font-serif">Invite me to Speak</h3>
                            <ArrowUpRight className="text-gray-600 group-hover:text-brand-yellow group-hover:rotate-45 transition-all" />
                        </div>
                        <p className="text-gray-400 mb-6 text-sm">For conferences, accelerators, and corporate events seeking high-energy expertise on pitching & innovation.</p>
                        <span className="text-xs uppercase tracking-widest font-bold text-white group-hover:text-brand-yellow">Book Keynote</span>
                    </div>

                    <div className="bg-brand-charcoal p-8 border border-white/5 hover:border-brand-yellow/50 transition-all group cursor-pointer">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-2xl font-serif">1:1 Founder Mentoring</h3>
                            <ArrowUpRight className="text-gray-600 group-hover:text-brand-yellow group-hover:rotate-45 transition-all" />
                        </div>
                        <p className="text-gray-400 mb-6 text-sm">Intensive coaching to validate your idea and build your pitch deck. Only 3 spots available per quarter.</p>
                        <span className="text-xs uppercase tracking-widest font-bold text-white group-hover:text-brand-yellow">Apply for Spot</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ContactCTA;