import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ShieldCheck,
  Briefcase,
  Rocket,
  FileSearch,
  Target,
  Handshake,
  BadgeCheck,
  Plus,
  Minus,
} from 'lucide-react';

/* ─── Investor benefits ───────────────────────────────────────── */
const INVESTOR_POINTS = [
  {
    icon: <FileSearch size={26} />,
    title: 'Curated Deal Flow',
    body: 'Skip the inbox noise. Every startup you see has already passed a rigorous, founder-led vetting on pitch, business, and idea.',
  },
  {
    icon: <Handshake size={26} />,
    title: 'Co-Investment Access',
    body: 'Join funding rounds alongside Sibilla. Get a seat at the table for opportunities reserved for her vetted network.',
  },
  {
    icon: <Target size={26} />,
    title: 'Investor-Grade Context',
    body: 'Each deal arrives with context on why it cleared vetting — so your due diligence starts a step ahead.',
  },
];

/* ─── What's included in vetting ──────────────────────────────── */
const VETTING_INCLUDES = [
  'A full pitch deck review — structure, narrative, and investor readiness',
  'Vetting of the business — model, traction, and market credibility',
  'Vetting of the business plan — financials, use of funds, and roadmap',
  'Vetting of the idea — clarity, defensibility, and investability',
];

/* ─── FAQ ─────────────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'What does it mean to be a "vetted startup"?',
    a: 'It means Ieva — an exited entrepreneur and global pitch award winner — has personally reviewed your pitch, business, plan, and idea, and decided your startup is ready to stand in front of investors. Vetted startups join a curated list shared with her investor network.',
  },
  {
    q: 'Is vetting a guarantee of investment?',
    a: 'No. Vetting is an independent assessment of investability and a credibility stamp — not a promise of funding. It puts your startup in front of the right investors, but funding decisions always rest with them.',
  },
  {
    q: 'What happens if my startup is not approved?',
    a: 'You still receive the full review and vetting feedback — a clear, honest breakdown of what is working and what needs to improve before you raise. Many founders use it as a roadmap and re-apply once they have closed the gaps.',
  },
  {
    q: 'I am an investor — do I pay anything?',
    a: 'No. Investors and VCs simply book a 30-minute call. There is no fee and no account to create — just a conversation about the kind of deal flow and co-investment you are looking for.',
  },
  {
    q: 'How much does vetting cost for startups?',
    a: 'The startup vetting service is €1,500. It covers the complete pitch deck review and the vetting of your business, business plan, and idea — plus a decision on joining the vetted startup list.',
  },
];

const CALENDLY = 'https://calendly.com/hola-aekora/expert-investor-pitch-coaching';

/* ─── FAQ Item ────────────────────────────────────────────────── */
const FaqItem: React.FC<{ faq: typeof FAQS[0]; index: number }> = ({ faq, index }) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="border border-brand-lightgray rounded-2xl bg-white overflow-hidden"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-serif text-lg text-brand-dark">{faq.q}</span>
        <span className="flex-shrink-0 text-brand-accent">
          {open ? <Minus size={18} /> : <Plus size={18} />}
        </span>
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.25 }}
          className="px-6 pb-5 text-brand-gray font-light leading-relaxed"
        >
          {faq.a}
        </motion.div>
      )}
    </motion.div>
  );
};

/* ─── Page ────────────────────────────────────────────────────── */
const VettedStartupsPage: React.FC = () => {
  return (
    <div className="bg-brand-beige overflow-x-hidden">
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-24 overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-[-8%] right-[-6%] w-[480px] h-[480px] bg-brand-accent/5 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute bottom-[-12%] left-[-10%] w-[420px] h-[420px] bg-yellow-200/20 rounded-full blur-[110px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-brand-accent/10 border border-brand-accent/20 text-brand-accent px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase mb-8"
          >
            <ShieldCheck size={14} />
            Vetted Startups
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-serif text-5xl md:text-7xl font-medium text-brand-dark leading-[1.1] mb-6"
          >
            Where vetted startups{' '}
            <span className="relative inline-block">
              <span className="text-brand-accent italic">meet investors.</span>
              <svg
                className="absolute w-full h-4 -bottom-2 left-0 text-brand-accent opacity-60"
                viewBox="0 0 200 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 7C2 7 34 3 66.5 2.5C99 2 128 5 156.5 5C185 5 197.5 2 197.5 2"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-lg md:text-xl text-brand-gray font-light leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            Sibilla personally vets startups — their pitch, business, and idea — so
            investors get curated deal flow they can trust, and startups earn a
            credibility stamp that opens the right doors.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#investors"
              className="px-8 py-4 bg-brand-accent text-white font-bold uppercase tracking-widest hover:bg-brand-charcoal transition-all duration-300 text-center rounded-full shadow-lg shadow-brand-accent/30 hover:-translate-y-1"
            >
              For Investors &amp; VCs
            </a>
            <a
              href="#startups"
              className="px-8 py-4 bg-transparent text-brand-dark font-bold uppercase tracking-widest border-2 border-brand-dark hover:border-brand-accent hover:text-brand-accent transition-all duration-300 text-center rounded-full hover:-translate-y-1"
            >
              For Startups
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── How it works strip ─────────────────────────────────── */}
      <section className="py-16 bg-white border-y border-brand-lightgray">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Startups apply for vetting',
                body: 'A founder submits their pitch deck and business for a full, honest review.',
              },
              {
                step: '02',
                title: 'Sibilla vets the opportunity',
                body: 'Pitch, business, plan, and idea are assessed against what investors expect.',
              },
              {
                step: '03',
                title: 'Approved startups meet investors',
                body: 'Vetted startups join the list shared with Sibilla’s investor network.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-4"
              >
                <span className="font-serif text-3xl font-bold text-brand-accent/30 leading-none">
                  {item.step}
                </span>
                <div>
                  <h3 className="font-serif text-lg text-brand-dark mb-1">{item.title}</h3>
                  <p className="text-sm text-brand-gray font-light leading-relaxed">{item.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── For Investors & VCs ────────────────────────────────── */}
      <section id="investors" className="py-24 bg-brand-dark relative overflow-hidden scroll-mt-24">
        <div className="absolute top-10 right-0 w-80 h-80 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl mb-14">
            <div className="inline-flex items-center gap-2 mb-5">
              <div className="h-px w-8 bg-brand-accent" />
              <span className="text-brand-accent text-xs font-bold tracking-[0.2em] uppercase">
                For Investors &amp; VCs
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-white leading-tight mb-5">
              Exclusive access to{' '}
              <span className="text-brand-accent italic">deals worth your time.</span>
            </h2>
            <p className="text-white/60 text-lg font-light leading-relaxed">
              Stop sifting through cold decks. Tap into a curated pipeline of startups already vetted
              for pitch quality, business strength, and idea investability — plus
              co-investment opportunities for funding rounds.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
            {INVESTOR_POINTS.map((point, i) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-brand-accent/40 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="mb-4 text-brand-accent bg-brand-accent/10 w-14 h-14 rounded-full flex items-center justify-center">
                  {point.icon}
                </div>
                <h3 className="font-serif text-xl text-white mb-2">{point.title}</h3>
                <p className="text-sm text-white/60 font-light leading-relaxed">{point.body}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-6">
            <a
              href={CALENDLY}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-brand-accent text-white px-10 py-4 rounded-full text-sm tracking-widest uppercase font-bold hover:bg-white hover:text-brand-dark transition-all duration-300 hover:scale-105 shadow-lg shadow-brand-accent/30"
            >
              Book a 30-min call
              <ArrowRight size={16} />
            </a>
            <p className="text-white/40 text-sm font-light">
              No fee. No account. Just a conversation about the deal flow you want.
            </p>
          </div>
        </div>
      </section>

      {/* ── For Startups ───────────────────────────────────────── */}
      <section id="startups" className="py-24 bg-brand-beige relative overflow-hidden scroll-mt-24">
        <div className="absolute top-24 left-0 w-72 h-72 bg-brand-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: copy */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 mb-5">
                <div className="h-px w-8 bg-brand-accent" />
                <span className="text-brand-accent text-xs font-bold tracking-[0.2em] uppercase">
                  For Startups
                </span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-medium text-brand-dark leading-tight mb-6">
                Get vetted. Earn the{' '}
                <span className="text-brand-accent italic">credibility stamp.</span>
              </h2>
              <p className="text-brand-gray text-lg font-light leading-relaxed mb-6">
                The startup vetting service is a deep, honest assessment of whether your
                company is ready to raise. Sibilla reviews your pitch deck and vets your
                business, business plan, and idea — the same lens an investor will use.
              </p>
              <p className="text-brand-gray text-lg font-light leading-relaxed mb-8">
                If she approves, your startup joins her{' '}
                <strong className="text-brand-dark font-semibold">vetted startup list</strong>{' '}
                — a curated roster shared directly with her investor network.
              </p>

              <blockquote className="border-l-4 border-brand-accent pl-6 py-2 text-xl font-serif text-brand-dark italic bg-white p-6 rounded-r-xl shadow-sm">
                "A vetted startup walks into the room already trusted. That is the
                difference between a cold pitch and a warm introduction."
              </blockquote>
            </motion.div>

            {/* Right: pricing card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-white rounded-3xl shadow-2xl shadow-brand-dark/10 border border-brand-lightgray/60 p-8 md:p-10 lg:sticky lg:top-28"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="text-brand-accent bg-brand-accent/10 w-12 h-12 rounded-full flex items-center justify-center">
                  <Rocket size={22} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-brand-accent font-bold">
                    Startup Vetting
                  </div>
                  <div className="font-serif text-lg text-brand-dark">One-time service</div>
                </div>
              </div>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-serif text-6xl font-bold text-brand-dark">€1,500</span>
              </div>
              <p className="text-sm text-brand-gray font-light mb-8">
                Complete pitch, business, plan &amp; idea vetting — plus a decision on the
                vetted startup list.
              </p>

              <div className="text-xs uppercase tracking-widest text-brand-accent font-bold mb-4">
                What&apos;s included
              </div>
              <ul className="space-y-3 mb-8">
                {VETTING_INCLUDES.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <BadgeCheck size={18} className="text-brand-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-brand-gray leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-brand-beige border border-brand-lightgray rounded-2xl p-5 mb-8 flex gap-3">
                <Briefcase size={20} className="text-brand-accent flex-shrink-0 mt-0.5" />
                <p className="text-sm text-brand-gray font-light leading-relaxed">
                  <strong className="text-brand-dark font-semibold">The outcome:</strong> if
                  Sibilla approves your startup, you join her vetted startup list. If not, you
                  still get the full vetting feedback as your roadmap to raise.
                </p>
              </div>

              <a
                href="/vetted-startups/apply"
                className="w-full inline-flex items-center justify-center gap-3 bg-brand-accent text-white py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-brand-dark transition-all duration-300 shadow-lg shadow-brand-accent/30 group"
              >
                Apply for vetting
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Social proof ───────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-brand-dark mb-4">
              Vetted by someone investors trust
            </h2>
            <div className="w-24 h-1 bg-brand-accent mx-auto mb-6 rounded-full" />
            <p className="text-brand-gray font-light">
              Sibilla Strupule is an exited entrepreneur and global pitch award winner
              who has been on both sides of the investor table.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { value: '70M€+', label: 'Raised (grants + VC)' },
              { value: '500+', label: 'Founders & Executives Trained' },
              { value: '25k+', label: 'Competitors Outpitched' },
              { value: '20+', label: 'Global Awards' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-brand-beige p-8 rounded-2xl text-center border border-transparent hover:border-brand-accent/30 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="font-serif text-4xl md:text-5xl text-brand-dark mb-2">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-widest text-brand-gray font-semibold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────── */}
      <section className="py-24 bg-brand-beige">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-12">
            <div className="inline-block bg-brand-accent/10 border border-brand-accent/20 text-brand-accent px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-5">
              Questions
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-brand-dark">
              Frequently asked
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {FAQS.map((faq, i) => (
              <FaqItem key={faq.q} faq={faq} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing CTA ────────────────────────────────────────── */}
      <section className="py-24 bg-brand-dark relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-white leading-tight mb-6">
              Two sides of the table.{' '}
              <span className="text-brand-accent italic">One trusted vetting.</span>
            </h2>
            <p className="text-white/60 text-lg font-light leading-relaxed mb-10">
              Whether you are deploying capital or raising it — start where credibility is
              already established.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-brand-accent text-white px-10 py-4 rounded-full text-sm tracking-widest uppercase font-bold hover:bg-white hover:text-brand-dark transition-all duration-300 hover:scale-105 shadow-lg shadow-brand-accent/30"
              >
                Book a 30-min call
                <ArrowRight size={16} />
              </a>
              <a
                href="/vetted-startups/apply"
                className="inline-flex items-center justify-center gap-3 bg-transparent text-white px-10 py-4 rounded-full text-sm tracking-widest uppercase font-bold border-2 border-white/30 hover:border-brand-accent hover:text-brand-accent transition-all duration-300"
              >
                Apply for vetting
                <ArrowRight size={16} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default VettedStartupsPage;
