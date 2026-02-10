import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Process: React.FC = () => {
  const steps = [
    {
      id: '01',
      title: 'Identify',
      description: 'We start with a discovery deep-dive to find where your message breaks down and why attention drops in the first 30 seconds. Is it a real problem? Is the market big enough? We strip away noise and get to the core of what actually matters.'
    },
    {
      id: '02',
      title: 'Structure',
      description: 'This is where the magic happens. We build a clear pitch architecture — message, narrative, and flow — aligned with investor psychology. Investors don\'t buy facts; they buy the future. We create a hook that grabs attention and holds the room.'
    },
    {
      id: '03',
      title: 'Deliver',
      description: 'Strengthen voice, presence, and confidence so you sound credible under pressure, not rehearsed. We work on your delivery and Q&A defense mechanisms until you can handle any question with conviction.'
    },
    {
      id: '04',
      title: 'Refine',
      description: 'Live feedback, repetition, and stress-testing until the pitch is sharp, reliable, and ready for high-stakes moments. You leave with an investment-ready pitch and the founder mindset needed to close the deal.'
    }
  ];

  return (
    <div className="py-24 bg-brand-beige relative overflow-hidden">
      {/* Decorative large text background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.05] select-none flex items-center justify-center">
        <span className="text-[20vw] font-serif font-bold text-brand-dark">PROCESS</span>
      </div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="text-center mb-20">
          <p className="text-brand-accent text-xs font-bold uppercase tracking-[0.2em] mb-4">Pitch like a Founder Methodology</p>
          <h2 className="text-5xl md:text-6xl font-serif font-thin text-brand-dark">The Process</h2>
          <p className="text-lg text-brand-gray mt-4 font-light">Simple. Focused. Results-Driven.</p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px bg-brand-charcoal/10 transform md:-translate-x-1/2"></div>

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
                  <span className="font-serif text-5xl md:text-6xl text-brand-gray/20 block mb-4">{step.id}</span>
                  <h3 className="text-2xl font-serif mb-4 text-brand-accent">{step.title}</h3>
                  <p className="text-brand-gray leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>

                {/* Center Dot */}
                <div className="absolute left-[11px] md:left-1/2 top-10 md:top-12 w-2 h-2 rounded-full bg-brand-accent transform md:-translate-x-1/2 ring-4 ring-brand-beige z-10"></div>
                
                {/* Empty Side for balance */}
                <div className="md:w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-20"
        >
          <p className="text-brand-gray text-lg mb-6 font-light">Ready to transform how you pitch?</p>
          <a
            href="https://calendly.com/hola-aekora/expert-training-ai-powered-tools"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-brand-accent text-white text-lg font-semibold uppercase tracking-wider rounded-full hover:bg-brand-dark transition-all duration-300 group shadow-xl shadow-brand-accent/30 hover:shadow-brand-dark/30"
          >
            Start Your Transformation
            <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Process;