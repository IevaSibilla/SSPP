import React from 'react';
import { motion } from 'framer-motion';
import { Award, Mic, Users, TrendingUp, Quote, Briefcase, GraduationCap, Globe } from 'lucide-react';
import SocialProof from './SocialProof';

const AboutPage: React.FC = () => {
  const achievements = [
    { icon: <TrendingUp size={28} />, value: '€7M+', label: 'Funding Raised' },
    { icon: <Award size={28} />, value: '20+', label: 'Global Awards' },
    { icon: <Users size={28} />, value: '500+', label: 'Founders Trained' },
    { icon: <Mic size={28} />, value: '50+', label: 'Keynotes Delivered' },
  ];

  const credentials = [
    { icon: <Briefcase size={24} />, title: 'Exited Entrepreneur', description: 'Founded and successfully exited an international startup' },
    { icon: <GraduationCap size={24} />, title: 'Associate Professor', description: 'Teaching pitching and startup strategy at university level' },
    { icon: <Award size={24} />, title: 'Global Pitch Champion', description: 'Winner of multiple international pitch competitions' },
    { icon: <Globe size={24} />, title: 'Lead Jury Member', description: 'Selected as lead jury for high-stakes pitch events worldwide' },
  ];

  const speakingTopics = [
    'Pitch Like a Founder',
    'Investor Psychology 101',
    'Why 70% of Pitch Decks Fail',
    'Clarity as Competitive Advantage',
    'From Idea to Investable Business',
  ];

  return (
    <div className="min-h-screen bg-brand-beige">
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-beige/30 -skew-x-12 transform origin-top-right"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="relative">
                <div className="aspect-[4/5] bg-gradient-to-br from-brand-accent/20 to-brand-beige rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="/OIWHost.jpeg"
                    alt="Ieva Sibilla Strupule"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                {/* Decorative Elements */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-brand-accent/10 rounded-full blur-2xl"></div>
                <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-brand-accent/30 rounded-2xl"></div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <p className="text-brand-accent uppercase tracking-widest text-sm font-semibold mb-4">About Me</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-6 leading-tight text-brand-dark">
                Built. Pitched.<br />
                <span className="text-brand-accent italic">Won. Repeated.</span>
              </h1>
              <p className="text-xl text-brand-gray font-light mb-8">
                I'm not a theorist — I'm a practitioner.
              </p>
              <div className="w-16 h-1 bg-brand-accent rounded-full"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Story Section */}
      <section className="py-20 bg-brand-beige">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6 text-lg text-brand-gray font-light leading-relaxed"
            >
              <p>
                I've built and scaled international companies, exited a startup, and raised millions in both non-dilutive and venture funding. I've won global pitch competitions, been selected as lead jury for high-stakes pitch events, and taught pitching and strategy as an associate professor.
              </p>
              <p>
                I've stood in rooms where decisions are made fast — with investors, boards, and senior leaders — and I know what separates a pitch that gets dismissed from one that moves people to act.
              </p>
              <p>
                Everything I teach is grounded in real experience. No fluff. No templates for the sake of it. Just clear thinking, sharp communication, and the ability to hold the room when it matters.
              </p>
            </motion.div>

            {/* Pull Quote */}
            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="my-12 relative"
            >
              <Quote className="absolute -top-4 -left-4 w-12 h-12 text-brand-accent/20" />
              <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-brand-accent">
                <p className="text-2xl font-serif text-brand-dark italic leading-relaxed">
                  "I know what separates a pitch that gets dismissed from one that moves people to act."
                </p>
              </div>
            </motion.blockquote>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-brand-dark mb-4">Track Record</h2>
            <div className="w-24 h-1 bg-brand-accent mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {achievements.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-brand-beige p-8 rounded-2xl text-center hover:shadow-lg transition-shadow"
              >
                <div className="text-brand-accent mb-4 flex justify-center">{item.icon}</div>
                <div className="text-4xl font-serif text-brand-dark mb-2">{item.value}</div>
                <div className="text-sm text-brand-gray uppercase tracking-wider">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-20 bg-brand-beige">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-brand-dark mb-4">Credentials & Experience</h2>
            <div className="w-24 h-1 bg-brand-accent mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {credentials.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl flex items-start gap-4 hover:shadow-lg transition-shadow"
              >
                <div className="text-brand-accent bg-brand-beige p-3 rounded-full">{item.icon}</div>
                <div>
                  <h3 className="font-serif text-lg text-brand-dark mb-1">{item.title}</h3>
                  <p className="text-sm text-brand-gray">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Speaking & Media Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-video bg-gradient-to-br from-brand-dark to-brand-gray rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/DNBnxtPitchWinner.jpeg"
                  alt="Pitch event"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-brand-accent/20 rounded-full blur-xl"></div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-serif text-brand-dark mb-6">Speaking & Events</h2>
              <p className="text-brand-gray mb-8">
                I deliver keynotes and workshops at conferences, accelerators, and corporate events worldwide. Topics I speak on:
              </p>
              <ul className="space-y-3">
                {speakingTopics.map((topic, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="w-2 h-2 bg-brand-accent rounded-full"></span>
                    <span className="text-brand-dark">{topic}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="inline-block mt-8 px-8 py-3 bg-brand-accent text-white font-semibold uppercase tracking-wider rounded-full hover:bg-brand-dark transition-colors"
              >
                Invite Me to Speak
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured In / Social Proof Section */}
      <SocialProof />

      {/* CTA Section */}
      <section className="py-20 bg-brand-dark">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">Ready to Work Together?</h2>
            <p className="text-white/70 max-w-xl mx-auto mb-8">
              Whether you're preparing for a critical pitch, training your team, or looking for a keynote speaker — let's talk.
            </p>
            <a
              href="/#contact"
              className="inline-block px-10 py-4 bg-brand-accent text-white font-semibold uppercase tracking-wider rounded-full hover:bg-white hover:text-brand-dark transition-colors"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
