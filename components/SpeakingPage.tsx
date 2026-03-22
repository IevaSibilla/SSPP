import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Mic, Users, Trophy, BookOpen, Quote, ChevronDown } from 'lucide-react';

const ENGAGEMENTS = [
  {
    category: 'United Nations & Global Forums',
    items: [
      'United Nations World Urban Forum - Opening Keynote (Katowice, June 2022)',
      'United Nations Habitat for Humanity - European Housing Forum - ShelterTech Award Winners (Warsaw, November 2021)',
      'United Nations/World Bank Webinar - "Drive your Sustainability Agenda through Open Innovation" Keynote (November 2022)',
      'United Nations - The United Future Lab - Online Keynote (March 2022)',
      'World Humanitarian Forum - Speaker (London, May 2021)',
    ],
  },
  {
    category: 'Climate Tech & Sustainability',
    items: [
      'ClimateTech Founders Summit - Keynote (November 2023)',
      'Cleantech Capital Day - Panel Discussion (Oslo, October 2022)',
      'Cleantech Capital Day - Keynote (Copenhagen, October 2023)',
      'Cleantech Capital Day - Open Finals - Pitch Competition (November 2021)',
      'The Path to Net Zero: Can Clean Energy Power the World? - Keynote (Malmö, September 2022)',
      'Curate Tomorrow Summit - Keynote (September 2023)',
      'Climate Meetup 2025 - Seminar (Oslo, March 2025)',
      'Greentech Alliance & SYSTEMIQ - Workshop (February 2021)',
    ],
  },
  {
    category: 'PropTech & Construction Innovation',
    items: [
      'Proptech VC Podcast - Interview on Material Mapper (September 2020)',
      'Proptech Summit - Panel Discussion (September 2022)',
      'PropTech Espresso Podcast - with Mark Hurst (December 2024)',
      'Future of AI/PropTech - Keynote (October 2025)',
      'Cambridge University - Interview: "The Role of Startups in Disrupting the Construction Industry" (October 2021)',
    ],
  },
  {
    category: 'Women in Tech & Leadership',
    items: [
      'Women in AI Global Summit - Pitch for Material Mapper (September 2020)',
      'Women in Tech Global Conference - Keynote (June 2022)',
      'Women in Tech Global Conference - Online Keynote (May 2023)',
      'Women in Tech Global Conference - Speaker (April 2024)',
    ],
  },
  {
    category: 'Innovation Weeks & Tech Events',
    items: [
      'Oslo Innovation Week - Pitch Competition Winners (September 2020)',
      'Oslo Innovation Week - Keynote at Nordic Climate Tech Demo Day (September 2021)',
      'Oslo Innovation Week - Jury Lead of 100 Pitches Competition (September 2022)',
      'TechChill - "Born in Crisis" Opening Keynote (Riga, May 2021)',
      'TechChill - Speaker (April 2024)',
      'Latitude 59 - Online Event (May 2021)',
      'Startup Extreme - Award Winners (Norway, April 2022)',
      'Startup Extreme - Panel Discussion (April 2023)',
      'RigaCOMM 2025 - Event Moderator, E-Mobility Stage (October 2025)',
    ],
  },
  {
    category: 'Pitch Competitions & Awards',
    items: [
      'SIFTED - Top 100 Global Sustainability Companies to Watch (2023)',
      'SIFTED - Top 20 European Sustainability Companies to Watch (2022)',
      'DNB Nxt - Award Winners (September 2021)',
      'The Global Hack - Pitch Winner (April 2020)',
      'Startup Network UnicornBattle - Judge (San Francisco, February 2020)',
      'The Royal Summit - Pitching Material Mapper (Dubai, October 2020)',
      'Cleantech Capital Day - Open Finals - Pitch Competition (November 2021)',
      'Startup Extreme - Award Winners (Norway, April 2022)',
      'European Housing Forum by UN Habitat For Humanity - ShelterTech Award Winners (Warsaw, November 2021)',
      'Sifted Summit - Event Pitch (December 2021)',
      'SSE Riga Mini MBA Final Pitch - Pitch Competition Judge (November 2025)',
    ],
  },
  {
    category: 'Workshops & Masterclasses — AI & Automation',
    items: [
      'The Corporate Wake-Up Call: How to Automate Yourself with AI - Webinar Host (September 2025)',
      'Building SaaS Prototypes with AI - Event Moderator/Speaker (July 2025)',
      'Scale without sacrifice: How AI Agents can help you grow faster - Event Moderator (April 2025)',
    ],
  },
  {
    category: 'Workshops & Masterclasses — Fundraising & Startups',
    items: [
      'Live Training: 3 Strategies to Raise $500k-$3M+ in 2025 - For Founders (February 2025)',
      'How to not mess up your cap table - Workshop Online (July 2024)',
      'IntelligentVC - How To Pitch your Idea - Seminar/Workshop (November 2024)',
      'NTNU (Norwegian University of Technology) IDEA Day - Pitch Workshop (November 2024)',
    ],
  },
  {
    category: 'Workshops & Masterclasses — Product & Strategy',
    items: [
      'Product Strategy in B2B Context - Workshop Online (February 2025)',
      'Building SaaS Prototypes with AI - Speaker (July 2025)',
      'ProductTank Riga - Multiple events as Host/Moderator (2025-2026)',
    ],
  },
  {
    category: 'Workshops & Masterclasses — Leadership & Performance',
    items: [
      'Unlock Your Storytelling Super Power - Workshop Online (September 2024)',
      'Shiftschool TRAILBLAZER - How to Make Decisions without Overhinking - Executive Workshop (October 2024)',
      'VAS Viedo Risinājumu Kalve - Presentation Skills and Stage Presence Workshop (February 2026)',
      'Seminar for Mentors (ESI.LV) - Workshop (October 2024)',
      'ESI.LV - Mentoring for Mentors - Workshop (May 2024)',
    ],
  },
  {
    category: 'Mentorship & Hackathons',
    items: [
      'European Institute of Innovation & Technology (EIT) HealthTech Hackathon - Mentor (Riga Stradins University, November 2025)',
      'Stockholm School of Economics in Riga - Mini MBA Program - Lead Jury for Pitch Finals (November 2025)',
      'University of Latvia Technology Hackathon - Lead Jury (October 2022)',
      'SSE Riga Pitch Competition - Mentor/Judge (May 2020)',
    ],
  },
  {
    category: 'ProductTank Riga — Event Host & Moderator',
    items: [
      'From a Simple Student\'s Idea to Filling Up Global Arenas - Host (January 2026)',
      'Leading in the Age of CyberAttacks - Host/Moderator (November 2025)',
      'Building SaaS Prototypes with AI - Host (May 2025)',
      'How AI is changing Product Management - Host (April 2025)',
      'Building Globally Successful Products from the Ground Up - Host (February 2025)',
      'Building from the Ground Up - Host (February 2025)',
    ],
  },
  {
    category: 'University Guest Lectures',
    items: [
      'SSE Riga - Organizational Structure Guest Lecture (October 2025)',
      'SSE Riga - Pitch Competition Mentorship - Mentor/Judge (May 2020)',
      'University College London (UCL) - "Science and Innovation for Sustainability: A Focus on Latvia" - Keynote and Panel (London, April 2023)',
      'Cambridge University - Interview on Startup Innovation (October 2021)',
      'NTNU (Norwegian University of Technology) - IDEA Day Pitch Workshop (November 2024)',
    ],
  },
  {
    category: 'Business & Entrepreneurship',
    items: [
      'Latvian Chamber of Commerce and Industry (LCCI) - Keynote (May 2021)',
      'Latvian Chamber of Commerce and Industry (LCCI) - "Rebuilding Cities - Ukraine" Keynote (February 2024)',
      'Building Social Entrepreneurship in Latvia - Keynote (Riga, June 2022)',
      'CEOs in Green Transition: How to navigate the new geopolitical context - Keynote (February 2023)',
      'Embassy of Latvia in London - Keynote Presentation (October 2022)',
      'Latvian Business Angels Network - Grantmapper Pitch (September 2025)',
    ],
  },
  {
    category: 'International Venture & Investment Forums',
    items: [
      'Paris Venture Capital World Summit - Keynote (May 2022)',
      'Davos Reception - Online Panel Discussion (January 2023)',
      'Special Edition Davos Wake-up Call - Online Conference (January 2022)',
      'Future Forum: Sustainability & Innovation Conference - Speaker (December 2021)',
      'Crucible Bold Horizons - Event Host and Moderator (April 2025)',
    ],
  },
  {
    category: 'Podcast Appearances & Interviews',
    items: [
      'PropTech Espresso - with Mark Hurst (December 2024)',
      'Futur/IO - "Future of Tech" Episode (September 2021)',
      'You\'ve Got Mel - Interview (February 2021)',
      'Proptech VC Podcast - Material Mapper Interview (September 2020)',
      'Wake-Up Call for Sustainable Innovators - Podcast (September 2021)',
      'SIFTED - Interview and Publication on Sifted.com (April 2021)',
      'SIFTED Panel Discussion Podcast - Panelist (October 2021)',
      'FORBES Global - Interview (April 2021)',
      'FORBES Latvia - Interview (July 2021)',
      'Labs of Latvia - Interview (May 2021)',
      'LabsOfLatvia and Grantmapper.com - Interview (August 2025)',
      'LA.LV and Grantmapper.com - Interview (September 2025)',
    ],
  },
  {
    category: 'Un-Conferences & Community Events',
    items: [
      'KinnerNord - Un-conference (Estonia, March 2021)',
      'KinnerNord - Un-conference In-Person Keynote (Estonia, 2022)',
      'KinnerNet Online - Online Event (June 2021)',
      'KinnerNet Portugal - Panel Discussion/Event Host (October 2023)',
      "Startup Norway's Extreme Summer Fest - Speaker (June 2022)",
    ],
  },
  {
    category: 'Virtual Expos & Online Events',
    items: [
      'IFEX Virtual Expo - Pitching Material Mapper (January 2021)',
      'IFX Virtual Expo - Online Pitch Event (February 2021)',
      'MATTER Conference - Online Speaker (April 2021)',
      'How To Create A Mindset For Success & Start An Online Business in 2025 - Keynote (July 2025)',
      '#TechTalk2030 #14: AI / Future Climate - Online Keynote (July 2023)',
      'SmartWins with Digital Twins - Online Keynote (May 2023)',
    ],
  },
  {
    category: 'Material Mapper Speaking Tour (2020–2022)',
    items: [
      'Antler Norway - "My Takeaways from Winning the Global Hack" (September 2020)',
      'Ålesund Future Lab - Pitching Material Mapper (November 2020)',
      'United Future Lab - Pitching Material Mapper (December 2020)',
      'Wake-Up-Call for Sustainable Futures - Online Event (July 2021)',
      'ShelterTech Masterclass: The Future of Affordable Housing - Online Keynote (April 2022)',
    ],
  },
  {
    category: 'Media Features',
    items: [
      'SIFTED - Interview and Publication on Sifted.com (April 2021)',
      'SIFTED Panel Discussion Podcast (October 2021)',
      'Labs of Latvia - Interview Feature (May 2021)',
      'LabsOfLatvia - Grantmapper Interview (August 2025)',
      'LA.LV - Grantmapper Interview (September 2025)',
    ],
  },
];

const AccordionItem: React.FC<{ category: string; items: string[]; isOpen: boolean; onToggle: () => void }> = ({ category, items, isOpen, onToggle }) => (
  <div className="border-b border-white/10">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between py-4 text-left group"
    >
      <span className="text-sm font-semibold text-white/80 group-hover:text-brand-accent transition-colors pr-4">{category}</span>
      <ChevronDown
        size={16}
        className={`flex-shrink-0 text-brand-accent transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
      />
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.ul
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="overflow-hidden"
        >
          <div className="pb-4 space-y-2">
            {items.map((item, i) => (
              <li key={i} className="text-xs text-gray-400 font-light pl-3 border-l border-brand-accent/30 leading-relaxed">
                {item}
              </li>
            ))}
          </div>
        </motion.ul>
      )}
    </AnimatePresence>
  </div>
);

const EngagementsAccordion: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="mt-16 border-t border-white/10 pt-10">
      <button
        onClick={() => setExpanded(e => !e)}
        className="flex items-center gap-3 mb-6 group"
      >
        <span className="text-lg font-serif text-white group-hover:text-brand-accent transition-colors">View Full Engagement History</span>
        <ChevronDown
          size={18}
          className={`text-brand-accent transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16">
              {ENGAGEMENTS.map((group, i) => (
                <AccordionItem
                  key={i}
                  category={group.category}
                  items={group.items}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

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
                  date: "April 13, 2026",
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
            I speak at the intersection of pitching, fundraising, and AI helping founders and executives communicate, raise, and scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Mic className="w-8 h-8 text-brand-accent" />,
              title: "Pitching & Communication",
              desc: "Mastering the art of storytelling, public speaking and investor pitching to raise capital and command any room."
            },
            {
              icon: <Users className="w-8 h-8 text-brand-accent" />,
              title: "Startup Scaling & Fundraising",
              desc: "How to raise from private investors, VCs, institutional partners and EU grant systems including EIC Accelerator."
            },
            {
              icon: <Trophy className="w-8 h-8 text-brand-accent" />,
              title: "AI & Workflow Automation",
              desc: "Practical AI adoption for SMEs and scale ups cutting operational costs and building competitive advantage through automation."
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

          {/* Full Engagements Accordion */}
          <EngagementsAccordion />

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
