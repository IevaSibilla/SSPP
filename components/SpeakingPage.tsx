import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Mic, Users, Trophy, BookOpen, Quote } from 'lucide-react';

const SpeakingPage: React.FC = () => {
  return (
    <div className="pt-32 pb-20">

      {/* Hero Section */}
      <section className="container mx-auto px-6 mb-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block bg-brand-accent/10 border border-brand-accent/20 text-brand-accent px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
            >
              International Speaker
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-serif text-brand-dark mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Command the Stage.<br />
              <span className="italic text-brand-accent">Captivate the Audience.</span>
            </motion.h1>

            <motion.p
              className="text-xl text-brand-gray font-light leading-relaxed mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              From the United Nations World Urban Forum to Women in Tech Global Conferences,
              I deliver high-impact keynotes and masterclasses that inspire action and transform
              how we think about innovation, communication, and leadership.
            </motion.p>
          </div>

          <motion.div
            className="lg:w-1/2 w-full relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="absolute inset-0 bg-brand-accent rounded-[2rem] translate-x-3 translate-y-3 opacity-20 md:translate-x-5 md:translate-y-5"></div>
            <img
              src="/material-mapper-presentation.jpg"
              alt="Keynote Presentation on Material Mapper"
              className="rounded-[2rem] shadow-2xl relative z-10 w-full object-cover aspect-[4/3] border border-brand-lightgray/50"
            />
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events Highlight */}
      <section className="bg-brand-surface py-20 border-y border-brand-lightgray mb-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/3">
              <h2 className="text-3xl font-serif text-brand-dark mb-4">Upcoming<br />Appearances</h2>
              <div className="w-12 h-1 bg-brand-accent mb-6"></div>
              <p className="text-brand-gray font-light">Catch me speaking live at these upcoming European events.</p>
            </div>

            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  date: "April 11, 2026",
                  location: "Riga",
                  title: "Investment and Technology: How to Raise Funding from European Grant Systems and VCs",
                  event: "European Innovation Council (EIC) & Embassy of Estonia"
                },
                {
                  date: "April 9, 2026",
                  location: "Workshop for Government Officials",
                  title: "Pitching and Public Speaking: How to Present Yourself and Your Idea with Conviction",
                  event: "VAS DigiTilts"
                }
              ].map((event, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-brand-beige p-8 rounded-2xl border border-brand-lightgray hover:border-brand-accent/30 transition-colors"
                >
                  <div className="flex items-center gap-4 mb-4 text-sm font-bold text-brand-accent uppercase tracking-wider">
                    <span className="flex items-center gap-1"><Calendar size={16} /> {event.date}</span>
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-2 leading-snug">{event.title}</h3>
                  <div className="mb-4 text-brand-gray font-serif italic">{event.event}</div>
                  <div className="text-sm text-brand-gray flex items-center gap-1">
                    <MapPin size={14} /> {event.location}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Topics / Expertise */}
      <section className="container mx-auto px-6 mb-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-serif text-brand-dark mb-6">Core Speaking Topics</h2>
          <p className="text-brand-gray font-light text-lg">
            I speak on topics intersecting at the bleeding edge of communication, sustainability, AI, and startup scaling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Mic className="w-8 h-8 text-brand-accent" />,
              title: "Pitching & Communication",
              desc: "Mastering the art of public speaking, storytelling, and pitching to investors effectively to raise millions."
            },
            {
              icon: <Users className="w-8 h-8 text-brand-accent" />,
              title: "PropTech & Climate Tech",
              desc: "Insights from leading startups navigating the complex landscape of green transition, net-zero goals, and disruption."
            },
            {
              icon: <Trophy className="w-8 h-8 text-brand-accent" />,
              title: "Women in Tech & Leadership",
              desc: "Empowering female founders, reshaping the VC landscape, and building confidence in technical leadership roles."
            }
          ].map((topic, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-8 border border-brand-lightgray rounded-2xl bg-white hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-6 bg-brand-beige w-16 h-16 rounded-full flex items-center justify-center">
                {topic.icon}
              </div>
              <h3 className="text-2xl font-bold text-brand-dark mb-4">{topic.title}</h3>
              <p className="text-brand-gray leading-relaxed">{topic.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Track Record List */}
      <section className="bg-brand-dark text-white py-24">
        <div className="container mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl font-serif mb-6 inline-block relative">
              Past Engagements
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-brand-accent"></span>
            </h2>
            <p className="text-gray-400 max-w-2xl text-lg font-light">
              A selected history of keynotes, masterclasses, and panels across Europe and globally.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Column 1 */}
            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-bold text-brand-accent mb-6 flex items-center gap-3">
                  <BookOpen size={24} /> United Nations & Global Forums
                </h3>
                <ul className="space-y-4 text-gray-300 font-light text-sm">
                  <li className="border-b border-white/10 pb-4">United Nations World Urban Forum - Opening Keynote (Katowice, Jun 2022)</li>
                  <li className="border-b border-white/10 pb-4">UN Habitat for Humanity - ShelterTech Award Winners (Warsaw, Nov 2021)</li>
                  <li className="border-b border-white/10 pb-4">United Nations & World Bank - Sustainability through Open Innovation Keynote (Nov 2022)</li>
                  <li className="border-b border-white/10 pb-4">World Humanitarian Forum - Speaker (London, May 2021)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-brand-accent mb-6 flex items-center gap-3">
                  Innovation & Tech Events
                </h3>
                <ul className="space-y-4 text-gray-300 font-light text-sm">
                  <li className="border-b border-white/10 pb-4">Oslo Innovation Week - Nordic Climate Tech Demo Day Keynote (Sep 2021)</li>
                  <li className="border-b border-white/10 pb-4">TechChill - "Born in Crisis" Opening Keynote (Riga, May 2021 & Apr 2024)</li>
                  <li className="border-b border-white/10 pb-4">Women in Tech Global Conference - Keynote (Jun 2022, May 2023, Apr 2024)</li>
                  <li className="border-b border-white/10 pb-4">RigaCOMM 2025 - Event Moderator, E-Mobility Stage (Oct 2025)</li>
                </ul>
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-bold text-brand-accent mb-6 flex items-center gap-3">
                  Workshops & Masterclasses
                </h3>
                <ul className="space-y-4 text-gray-300 font-light text-sm">
                  <li className="border-b border-white/10 pb-4">The Corporate Wake-Up Call: Automate Yourself with AI - Webinar (Sep 2025)</li>
                  <li className="border-b border-white/10 pb-4">Live Training: Strategies to Raise $500k-$3M+ in 2025 (Feb 2025)</li>
                  <li className="border-b border-white/10 pb-4">Unlock Your Storytelling Super Power - Online Workshop (Sep 2024)</li>
                  <li className="border-b border-white/10 pb-4">NTNU IDEA Day - Pitch Workshop (Nov 2024)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-brand-accent mb-6 flex items-center gap-3">
                  Mentorship & Competitions
                </h3>
                <ul className="space-y-4 text-gray-300 font-light text-sm">
                  <li className="border-b border-white/10 pb-4">Stockholm School of Economics in Riga - Lead Jury Pitch Finals (Nov 2025)</li>
                  <li className="border-b border-white/10 pb-4">EIT HealthTech Hackathon - Mentor (Nov 2025)</li>
                  <li className="border-b border-white/10 pb-4">Cleantech Capital Day Open Finals - Pitch Competition (Nov 2021)</li>
                  <li className="border-b border-white/10 pb-4">Startup Network UnicornBattle - Judge (San Francisco, Feb 2020)</li>
                </ul>
              </div>
            </div>

          </div>


        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-beige">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <Quote className="w-16 h-16 text-brand-accent/20 mx-auto mb-8" />
          <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-8">Book Me for Your Event</h2>
          <p className="text-xl text-brand-gray font-light mb-10 leading-relaxed">
            Looking for a dynamic speaker who brings authentic stories, actionable insights, and an energetic stage presence? Let's make your next event unforgettable.
          </p>
          <a
            href="https://calendly.com/hola-aekora/expert-investor-pitch-coaching"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-brand-accent text-white px-10 py-5 rounded-full text-lg tracking-wider uppercase font-bold hover:bg-brand-dark transition-all duration-300 hover:scale-105"
          >
            Check Availability
          </a>
        </div>
      </section>

    </div>
  );
};

export default SpeakingPage;
