import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Upload, CheckCircle, Clock, Mail, FileText, Sparkles, Shield, ChevronDown } from 'lucide-react';

const DEADLINE = new Date('2026-04-01T00:00:00');

const useCountdown = () => {
  const calc = () => {
    const diff = Math.max(0, Math.floor((DEADLINE.getTime() - Date.now()) / 1000));
    return {
      days:    Math.floor(diff / 86400),
      hours:   Math.floor((diff % 86400) / 3600),
      minutes: Math.floor((diff % 3600) / 60),
      expired: diff === 0,
    };
  };

  const [state, setState] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => setState(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  return state;
};

const UrgencyTimer: React.FC = () => {
  const { days, hours, minutes, expired } = useCountdown();

  const Unit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center gap-1">
      <span className="bg-brand-accent text-white font-mono text-xl font-bold w-12 h-12 flex items-center justify-center rounded-lg shadow-md shadow-brand-accent/30 tabular-nums leading-none">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[10px] uppercase tracking-widest font-bold text-brand-accent/80">{label}</span>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-6 bg-brand-dark rounded-2xl px-5 py-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <Clock size={14} className="text-brand-accent" />
        <span className="text-xs font-bold uppercase tracking-widest text-white/70">
          {expired ? 'This offer has ended' : 'Price rises to €299 on April 1st — no exceptions'}
        </span>
      </div>
      {!expired && (
        <div className="flex items-center justify-center gap-3">
          <Unit value={days} label="Days" />
          <span className="text-brand-accent font-bold text-xl mb-4 leading-none">:</span>
          <Unit value={hours} label="Hours" />
          <span className="text-brand-accent font-bold text-xl mb-4 leading-none">:</span>
          <Unit value={minutes} label="Min" />
        </div>
      )}
    </motion.div>
  );
};
import { supabase } from '../lib/supabase';

const WHAT_YOU_GET = [
  { icon: FileText,   title: 'Slide-by-Slide Written Feedback',   desc: 'Every slide scored and annotated with specific, actionable comments.' },
  { icon: Sparkles,   title: 'Full Pitch Deck Review', desc: 'Including a personalized strategy document with suggestions.' },
  { icon: Mail,       title: 'Delivered in 24 Hours',              desc: 'Straight to your inbox. No waiting weeks for a callback.' },
  { icon: Shield,     title: 'Confidential & Secure',              desc: 'Your deck is handled with full confidentiality. No sharing, ever.' },
];

/** Eyebrow + title for “What’s Included” (used above carousel on wide screens, above grid on ≤700px) */
const WhatsIncludedHeading: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={className}>
    <div className="flex items-center gap-4 mb-3">
      <div className="h-px w-8 bg-brand-accent" />
      <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">What's Included</span>
    </div>
    <h2 className="font-serif text-3xl md:text-4xl font-bold text-white leading-tight">
      Everything you receive<br />
      <span className="text-white/30 italic">within 24 hours.</span>
    </h2>
  </div>
);

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
  const [submitting, setSubmitting] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  /** Each slide maps to WHAT_YOU_GET[benefitIndex] for the merged text block */
  const SLIDES = [
    { src: '/Pitch_1.jpg',        label: 'Revised Pitch Deck', benefitIndex: 1 },
    { src: '/Pitch_review_1.jpg', label: 'Written Review',    benefitIndex: 0 },
    { src: '/Pitch_2.jpg',        label: 'Revised Pitch Deck', benefitIndex: 2 },
    /** Image from former 5th slide; copy still WHAT_YOU_GET[3] (Confidential) */
    { src: '/Pitch_review_3.jpg', label: 'Written Review',    benefitIndex: 3 },
  ] as const;

  const goPrev = () => setActiveIndex(i => (i === 0 ? SLIDES.length - 1 : i - 1));
  const goNext = () => setActiveIndex(i => (i === SLIDES.length - 1 ? 0 : i + 1));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const scrollToForm = () => {
    document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToWhatsIncluded = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('order-whats-included')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const inputClass =
    'w-full bg-white border border-brand-lightgray rounded-xl px-5 py-4 text-brand-dark placeholder-brand-gray/50 text-sm font-sans focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/10 transition-all duration-200';

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  };

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
    if (!file) {
      setError('Please upload your pitch deck.');
      return;
    }
    setError('');
    setSubmitting(true);

    try {
      const orderId = crypto.randomUUID();
      const filePath = `${orderId}/${file.name}`;

      const { error: uploadError } = await supabase.storage
        .from('pitch-decks')
        .upload(filePath, file);
      if (uploadError) throw new Error(`File upload failed: ${uploadError.message}`);

      const { error: insertError } = await supabase
        .from('orders')
        .insert({
          id: orderId,
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim(),
          file_path: filePath,
          file_name: file.name,
        });
      if (insertError) throw new Error(`Order creation failed: ${insertError.message}`);

      const { data, error: fnError } = await supabase.functions.invoke('create-checkout-session', {
        body: { order_id: orderId, email: email.trim() },
      });
      if (fnError) throw new Error(`Checkout creation failed: ${fnError.message}`);

      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
      setSubmitting(false);
    }
  };

  const urlParams = new URLSearchParams(window.location.search);
  const isSuccess = urlParams.get('success') === 'true';
  const returnEmail = urlParams.get('email') || '';

  if (isSuccess) return <SuccessScreen email={decodeURIComponent(returnEmail)} />;

  return (
    <div className="min-h-screen bg-brand-beige overflow-x-hidden">

      {/* ── Hero + Form ── */}
      <section id="order-form" className="pt-36 pb-16 relative overflow-hidden">
        <div className="absolute top-10 right-0 w-96 h-96 rounded-full bg-brand-accent/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-72 h-72 rounded-full bg-brand-accent/5 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
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
            <a
              href="#order-whats-included"
              onClick={scrollToWhatsIncluded}
              className="inline-flex items-center gap-1.5 text-brand-accent text-sm font-bold uppercase tracking-widest mb-6 hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40 rounded"
              aria-label="Scroll to What's included section"
            >
              What's included
              <ChevronDown size={18} className="opacity-90" aria-hidden />
            </a>
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

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="bg-white rounded-3xl shadow-2xl shadow-brand-dark/10 p-8 md:p-10 border border-brand-lightgray/60"
          >
            <UrgencyTimer />

            <div className="flex items-center justify-between mb-8 p-5 bg-brand-beige rounded-2xl border border-brand-lightgray">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-brand-accent mb-1">Pitch Deck Review</div>
                <div className="text-brand-dark text-sm font-light">Full review delivered in 24h</div>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-3 leading-none">
                  <span className="font-serif text-2xl text-brand-gray line-through opacity-60">€299</span>
                  <div className="font-serif text-6xl font-bold text-white bg-brand-accent px-4 pt-1 pb-3 rounded-2xl shadow-lg shadow-brand-accent/30 flex items-center justify-center">€79</div>
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
                    <div className="text-sm font-semibold text-brand-dark">Upload your deck and get your review by tomorrow</div>
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

              <p className="text-center text-sm font-bold text-brand-accent">You save €221 today</p>

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 w-full bg-brand-accent text-white py-4 rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-brand-dark transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-brand-accent/30 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? 'Processing…' : 'Lock in €79'}
                {!submitting && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
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
          <div className="flex items-center gap-4 mb-12">
            <div className="h-1 w-8 bg-brand-accent rounded-full" />
            <h2 className="font-serif text-2xl font-bold text-brand-dark">How It Works</h2>
          </div>
          <div className="flex flex-col gap-0">
            {[
              {
                num: '01',
                label: 'Upload Your Deck',
                desc: 'PDF or PowerPoint — any format works.',
                img: '/House award.jpeg',
                imgAlt: 'European Housing Innovation Award winner',
                badge: '🏆 European Housing Innovation Award',
                imgObjectPosition: 'object-center lg:object-[center_18%]',
              },
              {
                num: '02',
                label: 'Secure Payment',
                desc: "Fast checkout. You're covered by our 24h delivery guarantee.",
                img: '/DNBnxtPitchWinner.jpeg',
                imgAlt: 'DNB NXT Pitch Winner',
                badge: '🏆 DNB NXT Pitch Winner · NOK 200,000',
                imgObjectPosition: 'object-center lg:object-[center_20%]',
              },
              {
                num: '03',
                label: 'Get Your Review',
                desc: 'Written feedback and commentary land in your inbox within 24 hours.',
                img: '/SEB Material mapper winning.jpeg',
                imgAlt: 'SEB Material Mapper pitch winner',
                badge: '🏆 Nordic Cleantech Open · SEB Award',
                imgObjectPosition: 'object-center lg:object-[center_22%]',
              },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className={`flex flex-col md:flex-row items-stretch border-b border-brand-lightgray last:border-0 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="flex-1 flex items-center gap-6 py-10 md:px-8">
                  <div className="w-14 h-14 rounded-full bg-brand-accent/10 flex items-center justify-center flex-shrink-0">
                    <span className="font-mono text-base font-bold text-brand-accent">{step.num}</span>
                  </div>
                  <div>
                    <div className="font-serif text-2xl font-bold text-brand-dark mb-2">{step.label}</div>
                    <div className="text-brand-gray text-base font-light leading-relaxed">{step.desc}</div>
                  </div>
                </div>

                <div className="hidden md:flex flex-1 items-center justify-center py-8 px-6 min-h-0">
                  <motion.div
                    whileHover={{ y: -6, scale: 1.02 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="relative h-[260px] w-full overflow-hidden rounded-2xl shadow-xl shadow-brand-dark/20 md:h-[300px] lg:h-[340px]"
                  >
                    <img
                      src={step.img}
                      alt={step.imgAlt}
                      className={`absolute inset-0 h-full w-full object-cover ${step.imgObjectPosition}`}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-brand-dark/25 rounded-2xl" />
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                        {step.badge}
                      </span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Glassmorphic Card Carousel ── */}
      <section
        id="order-whats-included"
        className="py-24 bg-brand-dark relative overflow-hidden scroll-mt-24 md:scroll-mt-28"
      >

        {/* Background radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-brand-accent/10 rounded-full blur-3xl" />
        </div>

        {/* Wide screens: heading above carousel (hidden ≤700px — shown again above grid on mobile) */}
        <WhatsIncludedHeading className="container mx-auto px-6 mb-14 relative z-10 max-[700px]:hidden" />

        {/* Carousel + dots — hidden on small screens (≤700px); grid below replaces on mobile */}
        <div className="hidden min-[701px]:block">
        {/* Carousel */}
        <div className="relative flex items-center justify-center min-h-[420px] md:min-h-[520px]">
          {SLIDES.map((slide, i) => {
            const offset = i - activeIndex;
            const absOffset = Math.abs(offset);
            if (absOffset > 1) return null;
            const isCenter = offset === 0;
            const mergedBenefit = WHAT_YOU_GET[slide.benefitIndex];
            const MergedIcon = mergedBenefit.icon;
            return (
              <motion.div
                key={slide.src}
                className="absolute cursor-pointer select-none"
                animate={{
                  x: `${offset * 72}%`,
                  scale: isCenter ? 1 : 0.88,
                  opacity: isCenter ? 1 : 0.45,
                  zIndex: isCenter ? 10 : 5,
                }}
                transition={{ type: 'spring', stiffness: 280, damping: 28 }}
                drag={isCenter ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) goNext();
                  if (info.offset.x > 60)  goPrev();
                }}
                onClick={() => {
                  if (offset === -1) goPrev();
                  if (offset === 1)  goNext();
                }}
                style={{ width: '60vw', maxWidth: '680px' }}
              >
                {/* Glass card */}
                <div
                  className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl flex flex-col"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    boxShadow: isCenter
                      ? '0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)'
                      : '0 16px 40px rgba(0,0,0,0.4)',
                  }}
                >
                  {/* Top shimmer (text + upper rim on center card; full top on side cards) */}
                  <div
                    className={`absolute inset-x-0 top-0 pointer-events-none z-10 rounded-t-3xl ${
                      isCenter ? 'h-32' : 'h-28'
                    }`}
                    style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.07), transparent)' }}
                  />

                  <>
                    {/* Merged “What’s included” copy — image in bottom cut-out (center + peek cards) */}
                    <div
                      className={`relative z-10 flex gap-3 sm:gap-4 items-start border-b border-white/10 ${
                        isCenter ? 'px-6 pt-7 pb-5' : 'px-4 pt-5 pb-3 sm:px-5 sm:pb-4'
                      }`}
                    >
                      <div
                        className={`rounded-full flex items-center justify-center flex-shrink-0 ${
                          isCenter ? 'w-12 h-12' : 'w-10 h-10 sm:w-11 sm:h-11'
                        }`}
                        style={{ background: 'rgba(255,255,255,0.08)' }}
                      >
                        <MergedIcon size={isCenter ? 20 : 18} className="text-brand-accent" />
                      </div>
                      <div className="min-w-0">
                        <div
                          className={`font-semibold text-white mb-1 ${
                            isCenter ? 'text-sm' : 'text-xs sm:text-sm'
                          }`}
                        >
                          {mergedBenefit.title}
                        </div>
                        <div
                          className={`text-white/50 font-light leading-relaxed ${
                            isCenter ? 'text-sm' : 'text-[11px] sm:text-xs'
                          }`}
                        >
                          {mergedBenefit.desc}
                        </div>
                      </div>
                    </div>
                    <div className="relative w-full flex-shrink-0 bg-black/20">
                      <img
                        src={slide.src}
                        alt={slide.label}
                        className={`w-full object-cover object-top block ${
                          isCenter
                            ? 'h-[200px] sm:h-[220px] md:h-[240px]'
                            : 'h-[120px] sm:h-[132px] md:h-[144px]'
                        }`}
                        draggable={false}
                      />
                      <div className={`absolute left-4 z-20 ${isCenter ? 'bottom-4' : 'bottom-2 sm:bottom-3'}`}>
                        <span
                          className={`text-white font-bold uppercase tracking-widest rounded-full border border-white/20 ${
                            isCenter
                              ? 'text-[10px] px-3 py-1.5'
                              : 'text-[9px] px-2 py-1 sm:text-[10px] sm:px-2.5 sm:py-1.5'
                          }`}
                          style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)' }}
                        >
                          {slide.label}
                        </span>
                      </div>
                    </div>
                    {isCenter && (
                      <div className="absolute top-4 right-4 z-20 font-mono text-xs text-white/40 tracking-widest">
                        {String(activeIndex + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
                      </div>
                    )}
                  </>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dot strip */}
        <div className="flex items-center justify-center gap-2 mt-10 relative z-10">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? 'w-6 bg-brand-accent' : 'w-1.5 bg-white/25 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
        </div>

        {/* ≤700px only: same heading as desktop + detail cards (carousel is hidden) */}
        <div className="container mx-auto px-6 relative z-10 hidden max-[700px]:block pt-2 pb-2">
          <WhatsIncludedHeading className="mb-8" />
          <div className="grid grid-cols-1 gap-4">
            {WHAT_YOU_GET.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="flex gap-4 items-start rounded-2xl border border-white/10 p-6"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.08)' }}
                >
                  <item.icon size={20} className="text-brand-accent" />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm mb-1">{item.title}</div>
                  <div className="text-white/50 text-sm font-light leading-relaxed">{item.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA — after carousel (desktop) or after benefit grid (mobile) */}
        <div className="flex justify-center mt-10 max-[700px]:mt-8 relative z-10">
          <button
            onClick={scrollToForm}
            className="flex items-center gap-2 bg-brand-accent text-white text-xs font-bold uppercase tracking-widest px-8 py-4 rounded-full hover:bg-white hover:text-brand-dark transition-all duration-300 group shadow-lg shadow-brand-accent/30"
          >
            Get Mine — €79
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </section>

    </div>
  );
};

export default OrderPage;
