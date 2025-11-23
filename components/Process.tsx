import React from 'react';
import { motion } from 'framer-motion';

const Process: React.FC = () => {
  const steps = [
    {
      id: '01',
      title: 'Validation Strategy',
      description: 'We start with a discovery deep-dive. We don\'t just look at the pitch; we stress-test the business model. Is it a real problem? Is the market big enough? We strip the idea down to its core value.'
    },
    {
      id: '02',
      title: 'Craft The Narrative',
      description: 'This is where the magic happens. We build the story arc. Investors don\'t buy facts; they buy the future. We align your communication with investor psychology, creating a hook that grabs attention in the first 2 minutes.'
    },
    {
      id: '03',
      title: 'Execution & Pitch',
      description: 'Transformation. We work on your delivery, confidence, and Q&A defense mechanisms. You leave with an investment-ready pitch deck and the founder mindset needed to close the deal.'
    }
  ];

  return (
    <div className="py-24 bg-brand-dark text-brand-offwhite relative overflow-hidden">
      {/* Decorative large text background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] select-none flex items-center justify-center">
        <span className="text-[20vw] font-serif font-bold text-white">PROCESS</span>
      </div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="text-center mb-20">
          <p className="text-brand-yellow text-xs font-bold uppercase tracking-[0.2em] mb-4">Methodology</p>
          <h2 className="text-5xl md:text-6xl font-serif font-thin">The Process</h2>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px bg-white/20 transform md:-translate-x-1/2"></div>

          <div className="space-y-16 md:space-y-0">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className={`flex flex-col md:flex-row items-start ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                } relative`}
              >
                {/* Content Side */}
                <div className={`pl-12 md:pl-0 md:w-1/2 ${index % 2 === 0 ? 'md:pl-16' : 'md:pr-16 md:text-right'}`}>
                  <span className="font-serif text-5xl md:text-6xl text-white/10 block mb-4">{step.id}</span>
                  <h3 className="text-2xl font-serif mb-4 text-brand-yellow">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>

                {/* Center Dot */}
                <div className="absolute left-[11px] md:left-1/2 top-10 md:top-12 w-2 h-2 rounded-full bg-brand-yellow transform md:-translate-x-1/2 shadow-[0_0_10px_rgba(244,224,77,0.5)] z-10"></div>
                
                {/* Empty Side for balance */}
                <div className="md:w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;