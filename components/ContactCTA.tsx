import React from 'react';
import { ArrowUpRight, Mail, Linkedin } from 'lucide-react';

const ContactCTA: React.FC = () => {
  return (
    <div className="py-24 bg-brand-beige relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-yellow-100 rounded-full blur-[80px] pointer-events-none"></div>
        
        <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                
                {/* Left: Main CTA */}
                <div>
                    <p className="text-brand-accent font-bold uppercase tracking-[0.2em] mb-4">Ready to Scale?</p>
                    <h2 className="text-5xl md:text-7xl font-serif mb-8 leading-none text-brand-dark">
                        Let's Make You <br/>
                        <span className="text-brand-gray/50 hover:text-brand-accent transition-colors cursor-default duration-500">Investable.</span>
                    </h2>
                    
                    <div className="flex flex-col gap-6 items-start mt-12">
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="group flex items-center gap-4 text-xl font-light text-brand-dark hover:text-brand-accent transition-colors">
                            <span className="w-12 h-12 rounded-full border border-brand-lightgray bg-white flex items-center justify-center group-hover:border-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all shadow-sm">
                                <Linkedin size={20} />
                            </span>
                            Connect on LinkedIn for Strategy Tips
                        </a>
                        <a href="mailto:ieva@aekora.com" className="group flex items-center gap-4 text-xl font-light text-brand-dark hover:text-brand-accent transition-colors">
                            <span className="w-12 h-12 rounded-full border border-brand-lightgray bg-white flex items-center justify-center group-hover:border-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all shadow-sm">
                                <Mail size={20} />
                            </span>
                            ieva@aekora.com
                        </a>
                    </div>
                </div>

                {/* Right: Specific Actions */}
                <div className="flex flex-col justify-center gap-6">
                    <a href="https://calendly.com/hola-aekora/expert-training-ai-powered-tools" target="_blank" rel="noopener noreferrer" className="bg-white p-8 rounded-2xl shadow-lg shadow-brand-gray/5 border border-transparent hover:border-brand-accent/30 transition-all group hover:-translate-y-1 block">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-2xl font-serif text-brand-dark group-hover:text-brand-accent transition-colors">Invite me to Speak</h3>
                            <ArrowUpRight className="text-brand-gray group-hover:text-brand-accent group-hover:rotate-45 transition-all" />
                        </div>
                        <p className="text-brand-gray mb-6 text-sm">For conferences, accelerators, and corporate events seeking high-energy expertise on pitching & innovation.</p>
                        <span className="text-xs uppercase tracking-widest font-bold text-brand-dark group-hover:text-brand-accent">Book Keynote</span>
                    </a>

                    <a href="https://calendly.com/hola-aekora/expert-training-ai-powered-tools" target="_blank" rel="noopener noreferrer" className="bg-white p-8 rounded-2xl shadow-lg shadow-brand-gray/5 border border-transparent hover:border-brand-accent/30 transition-all group hover:-translate-y-1 block">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-2xl font-serif text-brand-dark group-hover:text-brand-accent transition-colors">1:1 Founder Mentoring</h3>
                            <ArrowUpRight className="text-brand-gray group-hover:text-brand-accent group-hover:rotate-45 transition-all" />
                        </div>
                        <p className="text-brand-gray mb-6 text-sm">Intensive coaching to validate your idea and build your pitch deck. Only 3 spots available per quarter.</p>
                        <span className="text-xs uppercase tracking-widest font-bold text-brand-dark group-hover:text-brand-accent">Apply for Spot</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ContactCTA;