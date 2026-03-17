import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Upload, CheckCircle, Clock, Mail, FileText, Sparkles, Shield } from 'lucide-react';

const WHAT_YOU_GET = [
  { icon: FileText,   title: 'Slide-by-Slide Written Feedback',   desc: 'Every slide scored and annotated with specific, actionable comments.' },
  { icon: Sparkles,   title: 'Improved Pitch Deck Delivered',       desc: 'A revised version of your deck with tracked changes — ready to present.' },
  { icon: Mail,       title: 'Delivered in 24 Hours',              desc: 'Straight to your inbox. No waiting weeks for a callback.' },
  { icon: Shield,     title: 'Confidential & Secure',              desc: 'Your deck is handled with full confidentiality. No sharing, ever.' },
];

const STEPS = [
  { num: '01', label: 'Upload Your Deck',      desc: 'PDF or PowerPoint — any format works.' },
  { num: '02', label: 'Secure Payment',         desc: 'Fast checkout. You\'re covered by our 24h delivery guarantee.' },
  { num: '03', label: 'Get Your Review',        desc: 'Improved deck + written feedback land in your inbox within 24 hours.' },
];

/* ── Success Screen ─────────────────────────────────────────────── */
const SuccessScreen: React.FC<{ email: string }> = ({ email }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.97 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="min-h-screen bg-brand-beige flex items-center justify-center px-6 py-24"
  >
    <div className="max-w-lg w-full text-center">
      <div className="w-20 h-20 rounded-full bg-brand-accent/10 flex items-center justify-center mx-auto mb-8">
        <CheckCircle size={40} className="text-brand-accent" />
      </div>
      <div className="flex items-center justify-center gap-3 mb-5">
        <div className="h-1 w-10 bg-brand-accent rounded-full" />
        <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">Order Confirmed</span>
        <div className="h-1 w-10 bg-brand-accent rounded-full" />
      </div>
      <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-dark mb-4 leading-tight">
        You're all set!
      </h2>
      <p className="text-brand-gray text-base font-light leading-relaxed mb-5">
        Your pitch deck has been submitted successfully. Expect your reviewed deck and written feedback at:
      </p>
      <div className="bg-white border border-brand-lightgray rounded-2xl px-6 py-4 inline-block mb-8 shadow-sm">
        <span className="font-mono text-brand-accent font-bold text-sm">{email}</span>
      </div>
      <div className="flex items-center justify-center gap-2 text-brand-gray text-sm mb-10">
        <Clock size={15} className="text-brand-accent" />
        <span>Within <strong className="text-brand-dark font-semibold">24 hours</strong> — guaranteed.</span>
      </div>
      <a
        href="/"
        className="inline-flex items-center gap-2 px-8 py-3 border-2 border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white transition-all duration-300 text-sm uppercase tracking-wider font-bold rounded-full"
      >
        ← Back to Home
      </a>
    </div>
  </motion.div>
);

/* ── Main Order Page ─────────────────────────────────────────────── */
const OrderPage: React.FC = () => {
  const [firstName, setFirstName]   = useState('');
  const [lastName,  setLastName]    = useState('');
  const [email,     setEmail]       = useState('');
  const [file,      setFile]        = useState<File | null>(null);
  const [dragOver,  setDragOver]    = useState(false);
  const [error,     setError]       = useState('');
  const [submitted, setSubmitted]   = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const inputClass =
    'w-full bg-white border border-brand-lightgray rounded-xl px-5 py-4 text-brand-dark placeholder-brand-gray/50 text-sm font-sans focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/10 transition-all duration-200';

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!file) {
      setError('Please upload your pitch deck.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  if (submitted) return <SuccessScreen email={email} />;

  return (
    <div className="min-h-screen bg-brand-beige overflow-x-hidden">

      {/* ── Hero + Form ── */}
      <section className="pt-36 pb-16 relative overflow-hidden">
        <div className="absolute top-10 right-0 w-96 h-96 rounded-full bg-brand-accent/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-72 h-72 rounded-full bg-brand-accent/5 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
          {/* Left: title + description */}
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
              Professional Pitch Review
            </motion.div>
            <h1 className="font-serif text-5xl md:text-6xl font-bold text-brand-dark leading-tight mb-6">
              Fix What Investors Reject<br />
              <span className="text-brand-accent italic">in Your Pitch Deck in 24h</span>
            </h1>
            <p className="text-brand-gray text-lg font-light leading-relaxed mb-10">
              Receive a full pitch deck review and strategy document revised personally by Sibilla — curated to specifically point out exactly what needs to be fixed in your current pitch deck to get the attention and investment of real investors.
            </p>
            <div className="flex flex-wrap gap-8 pt-6 border-t border-brand-lightgray">
              {[['70M€+', 'Raised by clients'], ['500+', 'Founders trained'], ['24h', 'Turnaround time']].map(([num, label]) => (
                <div key={label}>
                  <div className="font-serif text-3xl font-bold text-brand-dark">{num}</div>
                  <div className="text-xs uppercase tracking-wider text-brand-gray font-semibold mt-1">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: form card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="bg-white rounded-3xl shadow-2xl shadow-brand-dark/10 p-8 md:p-10 border border-brand-lightgray/60"
          >
            {/* Pricing badge */}
            <div className="flex items-center justify-between mb-8 p-5 bg-brand-beige rounded-2xl border border-brand-lightgray">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-brand-accent mb-1">Pitch Deck Review</div>
                <div className="text-brand-dark text-sm font-light">Full review + revised deck delivered in 24h</div>
              </div>
              <div className="text-right">

                <div className="flex items-center justify-end gap-3 leading-none">
                  <span className="font-serif text-2xl text-brand-gray line-through opacity-60">€299</span>
                  <div className="font-serif text-6xl font-bold text-white bg-brand-accent px-4 pt-1 pb-3 rounded-2xl shadow-lg shadow-brand-accent/30 flex items-center justify-center">€79</div>
                </div>
                <div className="flex items-center justify-end gap-1.5 mt-1">
                  <div className="text-xs text-brand-gray font-light">one-time</div>
                  <span className="text-xs font-bold text-brand-accent">· Save €221</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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

              {/* File upload zone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`relative cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200 ${
                  dragOver
                    ? 'border-brand-accent bg-brand-accent/5'
                    : file
                    ? 'border-brand-accent bg-brand-accent/5'
                    : 'border-brand-lightgray bg-brand-beige hover:border-brand-accent hover:bg-brand-accent/5'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.ppt,.pptx,.key"
                  className="hidden"
                  onChange={e => setFile(e.target.files?.[0] ?? null)}
                />
                {file ? (
                  <div className="flex flex-col items-center gap-2">
                    <CheckCircle size={28} className="text-brand-accent" />
                    <div className="text-sm font-semibold text-brand-dark">{file.name}</div>
                    <div className="text-xs text-brand-gray">{(file.size / 1024 / 1024).toFixed(1)} MB · Click to change</div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <Upload size={28} className="text-brand-accent" />
                    <div className="text-sm font-semibold text-brand-dark">Drop your pitch deck here</div>
                    <div className="text-xs text-brand-gray">or click to browse — PDF, PPT, PPTX, Keynote accepted</div>
                  </div>
                )}
              </div>

              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-brand-accent text-xs font-medium"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              <button
                type="submit"
                className="mt-2 w-full bg-brand-accent text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-brand-dark transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-brand-accent/30"
              >
                Pay & Submit My Deck
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-5 pt-1">
                <div className="flex items-center gap-1.5 text-xs text-brand-gray">
                  <Shield size={12} className="text-brand-accent" />
                  Secure payment
                </div>
                <div className="flex items-center gap-1.5 text-xs text-brand-gray">
                  <Clock size={12} className="text-brand-accent" />
                  24h delivery guaranteed
                </div>
                <div className="flex items-center gap-1.5 text-xs text-brand-gray">
                  <Shield size={12} className="text-brand-accent" />
                  100% confidential
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-1 w-8 bg-brand-accent rounded-full" />
            <h2 className="font-serif text-2xl font-bold text-brand-dark">How It Works</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="flex gap-5 items-start"
              >
                <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center flex-shrink-0">
                  <span className="font-mono text-sm font-bold text-brand-accent">{step.num}</span>
                </div>
                <div>
                  <div className="font-semibold text-brand-dark text-base mb-1">{step.label}</div>
                  <div className="text-brand-gray text-sm font-light leading-relaxed">{step.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What You Get ── */}
      <section className="py-16 bg-brand-beige">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-1 w-8 bg-brand-accent rounded-full" />
            <h2 className="font-serif text-2xl font-bold text-brand-dark">What's Included</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {WHAT_YOU_GET.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="bg-white rounded-2xl border border-brand-lightgray p-6 flex gap-4 items-start"
              >
                <div className="w-12 h-12 rounded-full bg-brand-beige flex items-center justify-center flex-shrink-0">
                  <item.icon size={20} className="text-brand-accent" />
                </div>
                <div>
                  <div className="font-semibold text-brand-dark text-sm mb-1">{item.title}</div>
                  <div className="text-brand-gray text-sm font-light leading-relaxed">{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-brand-dark">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block bg-brand-accent/20 border border-brand-accent/30 text-brand-accent px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
              Limited Launch Pricing
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to get your pitch<br />
              <span className="text-brand-accent italic">investor-ready?</span>
            </h2>
            <p className="text-white/70 text-lg font-light leading-relaxed mb-10 max-w-2xl mx-auto">
              Submit your deck today and receive a fully reviewed, revised version with a personal strategy document from Sibilla — within 24 hours.
            </p>
            <a
              href="https://calendly.com/hola-aekora/expert-investor-pitch-coaching"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-brand-accent text-white px-10 py-5 rounded-full text-sm tracking-wider uppercase font-bold hover:bg-white hover:text-brand-dark transition-all duration-300 hover:scale-105"
            >
              Order for €79
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default OrderPage;
