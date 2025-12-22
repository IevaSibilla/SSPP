import React from 'react';
import { motion } from 'framer-motion';

export const Process: React.FC = () => {
  const steps = [
    {
      num: "01",
      title: "Strategy",
      desc: "We start with a discovery call to listen to your goals. We clarify your vision, values, and target audience to build a fundable foundation."
    },
    {
      num: "02",
      title: "Create",
      desc: "This is where we craft the pitch. We focus on the narrative, the data, and the delivery. We transform complex ideas into compelling stories."
    },
    {
      num: "03",
      title: "Implement",
      desc: "Execution time. Whether it's a keynote, an investor meeting, or a demo day. We ensure you step on stage with absolute confidence."
    }
  ];

  return (
    <section id="process" className="py-24 bg-[#1a1818] text-[#e8e6e3] relative overflow-hidden">
      {/* Texture overlay */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/noise.png')]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-5xl md:text-7xl font-light tracking-wide mb-2">THE</h2>
          <h2 className="font-serif text-5xl md:text-7xl italic tracking-wide">PROCESS</h2>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-16 relative">
            {/* Connecting Line */}
            <div className="absolute left-[19px] top-4 bottom-4 w-[1px] bg-white/20 hidden md:block"></div>

            {steps.map((step, index) => (
                <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="flex flex-col md:flex-row gap-8 relative"
                >
                    {/* Number Bullet */}
                    <div className="hidden md:flex flex-col items-center flex-shrink-0 w-10">
                        <div className="w-3 h-3 bg-[#e8e6e3] rounded-full mb-4 outline outline-4 outline-[#1a1818]"></div>
                    </div>

                    <div>
                        <span className="font-serif text-3xl md:text-4xl block mb-4 opacity-50">{step.num}</span>
                        <h3 className="text-xl uppercase tracking-widest mb-4 font-medium">{step.title}</h3>
                        <p className="text-gray-400 font-light leading-relaxed max-w-xl">
                            {step.desc}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};