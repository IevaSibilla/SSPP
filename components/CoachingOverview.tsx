import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Target, Zap, TrendingUp, Users } from 'lucide-react';

const CoachingOverview: React.FC = () => {
  const benefits = [
    {
      icon: <Target size={24} />,
      text: 'Gain clarity on your business vision and goals'
    },
    {
      icon: <TrendingUp size={24} />,
      text: 'Develop a clear plan to achieve your objectives'
    },
    {
      icon: <Zap size={24} />,
      text: 'Overcome obstacles and challenges'
    },
    {
      icon: <Users size={24} />,
      text: 'Improve your leadership and management skills'
    }
  ];

  return (
    <div className="py-24 bg-brand-beige relative overflow-hidden">
      {/* Abstract shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow-200/20 rounded-full blur-[80px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="h-px w-8 bg-brand-accent"></div>
              <span className="text-brand-accent text-xs font-bold tracking-[0.2em] uppercase">
                Personalized Coaching
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 leading-tight text-brand-dark">
              Transform Your Vision Into Action
            </h2>
            
            <p className="text-lg text-brand-gray mb-8 leading-relaxed">
              With years of experience and a proven track record of success, I can help you overcome any obstacle and achieve your business aspirations. My personalized approach ensures we work closely together to understand your unique needs and goals.
            </p>
            
            <div className="space-y-4 mb-10">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="text-brand-accent mt-1 flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <p className="text-brand-dark font-medium">{benefit.text}</p>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex gap-8 mb-10">
              <div>
                <div className="text-3xl font-serif font-bold text-brand-dark">145+</div>
                <div className="text-sm text-brand-gray uppercase tracking-wider">Clients</div>
              </div>
              <div>
                <div className="text-3xl font-serif font-bold text-brand-dark">28+</div>
                <div className="text-sm text-brand-gray uppercase tracking-wider">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-serif font-bold text-brand-dark">100%</div>
                <div className="text-sm text-brand-gray uppercase tracking-wider">Satisfaction</div>
              </div>
            </div>

            {/* CTA Button */}
            <motion.a
              href="/Sscoach/index.html"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-brand-accent text-white font-bold uppercase tracking-widest text-sm rounded-full hover:bg-brand-accent/90 transition-all duration-300 shadow-lg shadow-brand-accent/20 hover:shadow-xl hover:shadow-brand-accent/30 hover:-translate-y-1"
            >
              <span>Unlock Your Potential</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>

          {/* Right: Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white p-10 rounded-3xl shadow-2xl shadow-brand-gray/10 border border-brand-lightgray/50">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-brand-accent/10 rounded-full flex items-center justify-center">
                    <Users className="text-brand-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-brand-dark">1-on-1 Coaching</h3>
                    <p className="text-sm text-brand-gray">Personalized sessions tailored to you</p>
                  </div>
                </div>
                
                <div className="h-px bg-brand-lightgray"></div>
                
                <div>
                  <p className="text-brand-gray text-sm leading-relaxed mb-4">
                    As a business coach, I believe in taking a personalized approach to coaching, working closely with each client to understand their unique needs and goals. I am committed to providing a supportive and non-judgmental environment where my clients feel comfortable sharing their concerns and aspirations.
                  </p>
                  <p className="text-brand-dark font-medium text-sm">
                    My goal is to help you gain clarity on your vision, develop a clear plan to achieve your objectives, and overcome any obstacles that may stand in your way.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-brand-accent/10 rounded-full blur-xl"></div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CoachingOverview;

