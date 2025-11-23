import React from 'react';
import { Mic, TrendingUp, Users, Lightbulb } from 'lucide-react';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    id: '1',
    title: 'Keynote Speaking',
    description: 'Inspiring talks on "Pitch Like a Founder," Investor Psychology, and Ecosystem Leadership. Perfect for conferences and accelerators.',
    icon: <Mic size={32} />,
    cta: 'Book Keynote'
  },
  {
    id: '2',
    title: 'Founder Mentoring',
    description: '1:1 Strategy sessions to validate ideas, build investor readiness, and secure capital. From idea to investable business.',
    icon: <TrendingUp size={32} />,
    cta: 'Apply for Mentoring'
  },
  {
    id: '3',
    title: 'Corporate Workshops',
    description: 'Hands-on training for teams to communicate with clarity. Covering pitching mastery and innovation leadership.',
    icon: <Users size={32} />,
    cta: 'View Workshops'
  },
  {
    id: '4',
    title: 'Idea Validation',
    description: 'Stop polishing ideas before validating them. Learn the frameworks I used to raise 3M+ EUR in non-equity funding.',
    icon: <Lightbulb size={32} />,
    cta: 'Start Validating'
  }
];

const Services: React.FC = () => {
  return (
    <div className="py-24 bg-brand-charcoal">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">How We Can Work Together</h2>
          <div className="w-24 h-1 bg-brand-yellow mx-auto mb-6"></div>
          <p className="text-gray-400">Guiding entrepreneurs and leaders from idea validation to investment-ready execution.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="bg-brand-dark p-8 flex flex-col items-start border-t-2 border-transparent hover:border-brand-yellow transition-all duration-300 group hover:-translate-y-2"
            >
              <div className="mb-6 text-brand-yellow bg-brand-yellow/10 p-3 rounded-full">
                {service.icon}
              </div>
              <h3 className="text-xl font-serif mb-4 group-hover:text-brand-yellow transition-colors">{service.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-8 flex-grow">
                {service.description}
              </p>
              <a href="#contact" className="text-xs font-bold uppercase tracking-widest border-b border-brand-yellow/50 pb-1 hover:text-brand-yellow hover:border-brand-yellow transition-colors">
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