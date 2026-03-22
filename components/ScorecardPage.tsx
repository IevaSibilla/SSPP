import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Download, CheckCircle } from 'lucide-react';

const WEB3FORMS_KEY = '6be1c8ee-033a-478a-a3cd-58985d9dfd90';

const CRITERIA = [
  { num: '01', title: 'Problem Clarity',         question: 'Does your pitch open with a problem that feels urgent and real — not a feature list?',        redflag: 'If you start with your solution, you\'ve already lost them.' },
  { num: '02', title: 'Solution Fit',             question: 'Is it immediately obvious how your product solves exactly that problem?',                      redflag: 'Investors should not have to connect the dots themselves.' },
  { num: '03', title: 'Market Size',              question: 'Do you show a credible, sizeable market with a source — not a top-down guess?',                redflag: '\'$500B market\' with no methodology destroys credibility instantly.' },
  { num: '04', title: 'Traction',                 question: 'Do you have numbers, pilots, or proof points that show real-world validation?',                redflag: 'Idea-stage with no traction needs an even stronger narrative.' },
  { num: '05', title: 'Business Model',           question: 'Is it clear how you make money — and why this model is the right one?',                       redflag: 'Vague monetisation is a top reason investors pass.' },
  { num: '06', title: 'Competitive Positioning',  question: 'Do you show why you win — not just that competitors exist?',                                   redflag: '\'No real competition\' is a red flag, not a strength.' },
  { num: '07', title: 'Team Credibility',         question: 'Does your team slide show why YOU are the right people to build this?',                       redflag: 'Logos without context don\'t tell the story investors need.' },
  { num: '08', title: 'The Ask',                  question: 'Is your funding ask specific, with a clear use of funds and timeline?',                       redflag: 'A vague ask signals you haven\'t thought through the plan.' },
  { num: '09', title: 'Narrative Flow',           question: 'Does each slide build on the last — or does the deck feel like a set of disconnected slides?', redflag: 'Investors decide in minutes. Structure determines whether they stay.' },
  { num: '10', title: 'Delivery & Confidence',    question: 'Can you deliver this pitch from memory, handling questions without panic?',                   redflag: 'Reading from slides signals you don\'t own your own story.' },
];

const STATS = [
  { number: '70M€+', label: 'Raised (Grants + VC)' },
  { number: '500+', label: 'Founders Trained' },
  { number: '25k+', label: 'Competitors Outpitched' },
  { number: '20+',  label: 'Global Awards' },
];

const BRACKETS = [
  { range: '10–24', color: '#D93B3B', headline: 'Not ready.',              body: 'Your pitch has fundamental gaps. Investors will sense uncertainty before you finish slide 3. The good news: these are fixable with the right guidance.' },
  { range: '25–34', color: '#D97B0A', headline: 'Promising, but incomplete.', body: 'You have the right instincts, but key areas are underdeveloped. One weak slide can sink an otherwise strong pitch.' },
  { range: '35–44', color: '#2A7A2A', headline: 'Getting close.',          body: 'You\'re in the right territory. A few targeted improvements could take you from "interesting" to "let\'s talk terms."' },
  { range: '45–50', color: '#FF385C', headline: 'Strong pitch.',           body: 'You\'re presenting with clarity and conviction. Now focus on delivery — the story is only as strong as the person telling it.' },
];

/* ─── Gate Form ────────────────────────────────────────────────── */
interface GateProps {
  onSubmit: (data: { firstName: string; lastName: string; email: string }) => void;
}

const GateForm: React.FC<GateProps> = ({ onSubmit }) => {
  const [firstName,   setFirstName]   = useState('');
  const [lastName,    setLastName]    = useState('');
  const [email,       setEmail]       = useState('');
  const [error,       setError]       = useState('');
  const [submitting,  setSubmitting]  = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: 'New Pitch Scorecard Lead',
          name: `${firstName.trim()} ${lastName.trim()}`,
          email: email.trim(),
        }),
      });
      if (!res.ok) throw new Error('Submission failed');
      onSubmit({ firstName: firstName.trim(), lastName: lastName.trim(), email: email.trim() });
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    'w-full bg-white border border-brand-lightgray rounded-xl px-5 py-4 text-brand-dark placeholder-brand-gray/50 text-sm font-sans focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/10 transition-all duration-200';

  return (
    <div className="min-h-screen bg-brand-beige overflow-x-hidden">
      {/* Hero */}
      <section className="pt-36 pb-0 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-20 right-0 w-96 h-96 rounded-full bg-brand-accent/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-72 h-72 rounded-full bg-yellow-200/20 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block bg-brand-accent/10 border border-brand-accent/20 text-brand-accent px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6"
            >
              Free Resource
            </motion.div>

            <h1 className="font-serif text-5xl md:text-6xl font-bold text-brand-dark leading-tight mb-6">
              Is Your Pitch<br />
              <span className="text-brand-accent italic">Investor Ready?</span>
            </h1>

            <p className="text-brand-gray text-lg font-light leading-relaxed mb-8 max-w-md">
              Score your pitch across 10 critical criteria. Find out exactly where investors lose interest — and what to fix before your next meeting.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-brand-lightgray">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="font-serif text-3xl font-bold text-brand-dark">{s.number}</div>
                  <div className="text-xs uppercase tracking-wider text-brand-gray font-semibold mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: photo + form card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col items-center"
          >
            {/* Profile photo */}
            <div className="relative mb-8">
              <div className="w-36 h-36 rounded-full border-4 border-brand-accent p-1 bg-white shadow-xl shadow-brand-accent/20">
                <img
                  src="/ievaJumpSuit.png"
                  alt="Sibilla Strupule"
                  className="w-full h-full rounded-full object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-brand-accent text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                Free
              </div>
            </div>

            {/* Form card */}
            <div className="w-full bg-white rounded-3xl shadow-2xl shadow-brand-dark/10 p-8 border border-brand-lightgray/60">
              <h2 className="font-serif text-2xl font-bold text-brand-dark mb-1">Get Instant Access</h2>
              <p className="text-brand-gray text-sm font-light mb-6">Enter your details to unlock the scorecard.</p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    className={inputClass}
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    className={inputClass}
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className={inputClass}
                />

                {error && (
                  <p className="text-brand-accent text-xs font-medium">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="mt-2 w-full bg-brand-accent text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-brand-dark transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-brand-accent/30 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Sending…' : 'Unlock My Scorecard'}
                  {!submitting && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                </button>

                <p className="text-center text-xs text-brand-gray/60 font-light">
                  No spam. Unsubscribe any time.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tagline strip */}
      <section className="py-10 bg-brand-dark mt-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-white/70 font-light text-base uppercase tracking-widest">
            Want expert eyes on your deck? <span className="text-brand-accent font-bold">Get a professional review below.</span>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-dark overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-0 items-stretch">

            {/* Left: image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative min-h-[340px] md:min-h-0"
            >
              <img
                src="/DNBnxtPitchWinner.jpeg"
                alt="Ieva Sibilla winning DNB NXT pitch competition"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-brand-dark/60" />
              <div className="absolute bottom-6 left-6">
                <span className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                  🏆 DNB NXT Pitch Winner · NOK 200,000
                </span>
              </div>
            </motion.div>

            {/* Right: copy */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex flex-col justify-center py-16 px-8 md:px-12"
            >
              <div className="inline-block bg-brand-accent/20 border border-brand-accent/30 text-brand-accent px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 self-start">
                Limited Launch Pricing
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
                Ready to get your pitch<br />
                <span className="text-brand-accent italic">investor-ready?</span>
              </h2>
              <p className="text-white/60 text-base font-light leading-relaxed mb-4">
                Sibilla has coached founders who went on to raise millions — from VCs, grants, and global competitions.
              </p>
              <p className="text-white/80 text-base font-light leading-relaxed mb-8">
                Submit your deck and receive a fully reviewed, revised version with a personal strategy document — within 24 hours.
              </p>
              <div className="flex flex-wrap gap-4 mb-8 text-sm text-white/60 font-light">
                <span>✓ 70M€+ raised by clients</span>
                <span>✓ 500+ founders trained</span>
                <span>✓ Delivered in 24h</span>
              </div>
              <a
                href="/order"
                className="self-start inline-flex items-center gap-3 bg-brand-accent text-white px-10 py-4 rounded-full text-sm tracking-wider uppercase font-bold hover:bg-white hover:text-brand-dark transition-all duration-300 hover:scale-105 shadow-lg shadow-brand-accent/30"
              >
                Order for €79
                <ArrowRight size={16} />
              </a>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
};

/* ─── Criterion Row ────────────────────────────────────────────── */
interface CriterionRowProps {
  criterion: typeof CRITERIA[0];
  globalIdx: number;
  score: number;
  onScore: (idx: number, val: number) => void;
}

const CriterionRow: React.FC<CriterionRowProps> = ({ criterion, globalIdx, score, onScore }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: globalIdx * 0.05 }}
    className={`flex gap-3 items-center p-2.5 rounded-lg border transition-all duration-200 ${
      globalIdx % 2 === 0 ? 'bg-white border-brand-lightgray' : 'bg-brand-beige border-transparent'
    }`}
  >
    {/* Number badge */}
    <div className="w-8 h-8 rounded-full bg-brand-accent/10 flex items-center justify-center flex-shrink-0">
      <span className="text-brand-accent text-xs font-bold font-mono">{criterion.num}</span>
    </div>

    {/* Content + Score grouped together */}
    <div className="flex-1 flex items-center gap-6 min-w-0">
      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-bold text-brand-dark leading-tight">{criterion.title} <span className="font-light text-brand-dark/60">— {criterion.question}</span></div>
        <div className="text-xs text-brand-gray italic mt-0.5">
          <span className="not-italic font-bold text-brand-accent">⚠ </span>
          {criterion.redflag}
        </div>
      </div>

      {/* Score boxes */}
      <div className="flex flex-col items-center gap-1 flex-shrink-0">
        <div className="flex gap-1.5">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => onScore(globalIdx, n)}
              className={`w-8 h-8 rounded-full border-2 text-xs font-bold font-mono transition-all duration-150 ${
                score >= n && score > 0
                  ? 'bg-brand-accent border-brand-accent text-white shadow-sm shadow-brand-accent/40'
                  : 'bg-white border-brand-lightgray text-brand-gray hover:border-brand-accent hover:text-brand-accent hover:bg-brand-accent/5'
              }`}
            >
              {n}
            </button>
          ))}
        </div>
        <span className="text-xs text-brand-gray font-mono">/ 5</span>
      </div>
    </div>
  </motion.div>
);

/* ─── Full Scorecard ───────────────────────────────────────────── */
interface ScorecardProps {
  firstName: string;
  scores: number[];
  onScore: (idx: number, val: number) => void;
}

const Scorecard: React.FC<ScorecardProps> = ({ firstName, scores, onScore }) => {
  const total = scores.reduce((a, b) => a + b, 0);
  const scored = scores.filter(s => s > 0).length;

  const getBracket = () => {
    if (total === 0) return null;
    if (total <= 24) return BRACKETS[0];
    if (total <= 34) return BRACKETS[1];
    if (total <= 44) return BRACKETS[2];
    return BRACKETS[3];
  };
  const bracket = getBracket();

  return (
    <div className="min-h-screen bg-brand-beige">

      {/* ── Cover ── */}
      <section className="pt-28 pb-6 bg-brand-beige relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-brand-accent/5 blur-3xl pointer-events-none" />
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          >
            <div>
              <div className="inline-block bg-brand-accent/10 border border-brand-accent/20 text-brand-accent px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-3">
                Investor Pitch Scorecard
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-dark leading-tight mb-3">
                {firstName ? `Let's see how you score,` : 'Score Your Pitch,'}<br />
                <span className="text-brand-accent italic">{firstName ? `${firstName}.` : 'Honestly.'}</span>
              </h1>
              <p className="text-brand-gray text-base font-light leading-relaxed max-w-lg">
                Score each criterion from <strong className="text-brand-dark font-semibold">1</strong> (weak) to <strong className="text-brand-dark font-semibold">5</strong> (investor-grade). Be brutally honest — investors will be.
              </p>
              {/* Legend */}
              <div className="flex flex-wrap gap-4 mt-3">
                {[['1–2', 'Not addressed'], ['3', 'Partially there'], ['4', 'Solid'], ['5', 'Investor-grade']].map(([score, label]) => (
                  <div key={score} className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold text-brand-accent">{score}</span>
                    <span className="text-xs text-brand-gray">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress + photo */}
            <div className="flex flex-col items-center gap-3">
              <div className="w-28 h-28 rounded-full border-4 border-brand-accent p-1 bg-white shadow-xl shadow-brand-accent/20">
                <img
                  src="/ievaJumpSuit.png"
                  alt="Sibilla Strupule"
                  className="w-full h-full rounded-full object-cover object-top"
                />
              </div>
              <div className="text-center">
                <div className="font-serif text-4xl font-bold text-brand-dark">{scored}/10</div>
                <div className="text-xs uppercase tracking-wider text-brand-gray font-semibold mt-1">Criteria scored</div>
              </div>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider bg-brand-accent text-white px-6 py-3 rounded-full transition-all duration-300 hover:bg-brand-dark shadow-lg shadow-brand-accent/30"
              >
                <Download size={15} />
                Save as PDF
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Criteria 01–05 ── */}
      <section className="pt-8 pb-6 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-1 w-8 bg-brand-accent rounded-full" />
            <h2 className="font-serif text-2xl font-bold text-brand-dark">Criteria 01–05</h2>
          </div>
          <div className="flex flex-col gap-3">
            {CRITERIA.slice(0, 5).map((c, i) => (
              <CriterionRow key={c.num} criterion={c} globalIdx={i} score={scores[i]} onScore={onScore} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Criteria 06–10 ── */}
      <section className="pt-8 pb-6 bg-brand-beige">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-1 w-8 bg-brand-accent rounded-full" />
            <h2 className="font-serif text-2xl font-bold text-brand-dark">Criteria 06–10</h2>
          </div>
          <div className="flex flex-col gap-3">
            {CRITERIA.slice(5, 10).map((c, i) => (
              <CriterionRow key={c.num} criterion={c} globalIdx={i + 5} score={scores[i + 5]} onScore={onScore} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Results ── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-1 w-8 bg-brand-accent rounded-full" />
            <h2 className="font-serif text-2xl font-bold text-brand-dark">What Your Score Means</h2>
          </div>

          {/* Total score display */}
          <div className="bg-brand-beige border border-brand-lightgray rounded-3xl p-8 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-brand-accent mb-1">Your Total Score</div>
              <div className="text-sm text-brand-gray font-light">Add up all 10 criteria — or score them above to auto-calculate.</div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-7xl font-bold text-brand-accent leading-none">
                {total > 0 ? total : '–'}
              </span>
              <span className="font-serif text-3xl text-brand-lightgray">/ 50</span>
            </div>
          </div>

          {/* Brackets */}
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {BRACKETS.map((b) => {
              const isActive = bracket?.range === b.range;
              return (
                <motion.div
                  key={b.range}
                  animate={isActive ? { scale: 1.02 } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`rounded-2xl border p-6 flex gap-4 transition-all duration-300 ${
                    isActive
                      ? 'border-2 shadow-xl'
                      : 'border-brand-lightgray opacity-60'
                  }`}
                  style={isActive ? { borderColor: b.color, boxShadow: `0 8px 32px ${b.color}25` } : {}}
                >
                  <div className="w-1 rounded-full flex-shrink-0 self-stretch" style={{ background: b.color }} />
                  <div>
                    <span className="font-mono text-sm font-bold" style={{ color: b.color }}>{b.range}</span>
                    <div className="font-semibold text-brand-dark text-sm mt-0.5 mb-2">{b.headline}</div>
                    <div className="text-brand-gray text-sm font-light leading-relaxed">{b.body}</div>
                    {isActive && (
                      <div className="mt-3 flex items-center gap-1.5 text-xs font-bold" style={{ color: b.color }}>
                        <CheckCircle size={13} />
                        Your score
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-brand-beige border-t border-brand-lightgray">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block bg-brand-accent/10 border border-brand-accent/30 text-brand-accent px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
              Work with Sibilla
            </div>
            <h3 className="font-serif text-4xl md:text-5xl font-bold text-brand-dark mb-6 leading-tight">
              Not sure if you're judging<br />
              yourself <span className="text-brand-accent italic">correctly?</span>
            </h3>
            <p className="text-brand-gray text-lg font-light leading-relaxed mb-10 max-w-2xl mx-auto">
              Self-assessment has limits. Book a professional pitch review and get specific, actionable feedback on every slide — from someone who has coached founders at the UN, World Bank, EIC, and in front of 100+ investors.
            </p>
            <a
              href="/order"
              className="inline-flex items-center gap-3 bg-brand-accent text-white px-10 py-5 rounded-full text-sm tracking-wider uppercase font-bold hover:bg-brand-dark transition-all duration-300 hover:scale-105 shadow-lg shadow-brand-accent/30"
            >
              Order Pitch Review
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Print styles */}
      <style>{`
        @media print {
          nav, footer { display: none !important; }
          .no-print { display: none !important; }
          body { background: white; }
        }
      `}</style>
    </div>
  );
};

/* ─── Main Page ────────────────────────────────────────────────── */
const ScorecardPage: React.FC = () => {
  const [user, setUser] = useState<{ firstName: string; lastName: string; email: string } | null>(null);
  const [scores, setScores] = useState<number[]>(new Array(10).fill(0));

  const handleScore = (idx: number, val: number) => {
    setScores(prev => {
      const next = [...prev];
      next[idx] = next[idx] === val ? 0 : val;
      return next;
    });
  };

  return (
    <AnimatePresence mode="wait">
      {!user ? (
        <motion.div key="gate" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <GateForm onSubmit={setUser} />
        </motion.div>
      ) : (
        <motion.div key="scorecard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          <Scorecard firstName={user.firstName} scores={scores} onScore={handleScore} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScorecardPage;
