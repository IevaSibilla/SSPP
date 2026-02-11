import React from 'react';
import { Mic, TrendingUp, Users } from 'lucide-react';

interface ServiceItemExtended {
  id: string;
  title: string;
  description?: string;
  bullets?: string[];
  subtitle?: string;
  bestFor?: string;
  icon: React.ReactNode;
  cta: string;
}

const services: ServiceItemExtended[] = [
  {
    id: '1',
    title: 'Keynote Speaking',
    subtitle: 'Topics I speak on',
    bullets: [
      'Pitch Like a Founder',
      'What Makes an Idea Investable',
      'Why 70% of Pitch Decks Fail in 2 Minutes',
      'Investor Psychology 101',
      'Founder Clarity as a Competitive Advantage'
    ],
    icon: <Mic size={32} />,
    cta: 'Invite Me to Speak'
  },
  {
    id: '2',
    title: 'Pitch Like a Founder',
    subtitle: '1:1 & Team Training',
    bullets: [
      'Pitch structure investors expect',
      'Founder psychology & confidence',
      'Q&A domination & objection handling',
      'Live pitch feedback & iteration'
    ],
    bestFor: 'Founders, startup teams, executives',
    icon: <TrendingUp size={32} />,
    cta: 'Work With Me'
  },
  {
    id: '3',
    title: 'Executive Presence',
    subtitle: '4-Module Corporate Program',
    bullets: [
      'Strategic Narratives — align teams around vision',
      'Boardroom Delivery — command attention instantly',
      'Stakeholder Influence — move decisions forward',
      'Execution Presence — voice, stance & delivery'
    ],
    bestFor: 'C-suite · Senior leaders · Corporate teams',
    icon: <Users size={32} />,
    cta: 'Book Corporate Training'
  },
];

const Services: React.FC = () => {
  return (
    <div className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif mb-4 text-brand-dark">How We Can Work Together</h2>
          <div className="w-24 h-1 bg-brand-accent mx-auto mb-6 rounded-full"></div>
          <p className="text-brand-gray">Lead high-stakes conversations with clarity and authority. Designed for leaders who present to boards, investors, and key stakeholders.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="bg-brand-beige p-6 flex flex-col items-start rounded-2xl hover:shadow-xl hover:shadow-brand-accent/10 transition-all duration-300 group hover:-translate-y-2 border border-transparent hover:border-brand-accent/20"
            >
              <div className="mb-4 text-brand-accent bg-white p-3 rounded-full shadow-sm group-hover:bg-brand-accent group-hover:text-white transition-colors">
                {service.icon}
              </div>
              <h3 className="text-lg font-serif mb-1 text-brand-dark">{service.title}</h3>
              {service.subtitle && (
                <p className="text-xs uppercase tracking-wider text-brand-accent mb-3 font-semibold">{service.subtitle}</p>
              )}
              <div className="text-sm text-brand-gray leading-relaxed mb-4 flex-grow">
                {service.description && <p className={service.bullets ? 'mb-2' : ''}>{service.description}</p>}
                {service.bullets && (
                  <ul className="space-y-1.5">
                    {service.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-brand-accent mt-0.5">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {service.bestFor && (
                <p className="text-xs text-brand-gray/70 mb-4 italic">Best for: {service.bestFor}</p>
              )}
              <a href="https://calendly.com/hola-aekora/expert-investor-pitch-coaching" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest border-b-2 border-brand-accent/20 pb-1 text-brand-dark group-hover:border-brand-accent transition-colors mt-auto">
                {service.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;