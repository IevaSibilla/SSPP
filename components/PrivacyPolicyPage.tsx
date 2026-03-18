import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
};

const Section: React.FC<{ pill: string; title: string; children: React.ReactNode }> = ({ pill, title, children }) => (
  <motion.section
    className="mb-12"
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
  >
    <div className="flex flex-wrap items-center gap-3 mb-4">
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-dark">{title}</h2>
      <span className="inline-block bg-brand-accent text-white text-xs font-medium px-3 py-1 rounded-full tracking-wide">
        {pill}
      </span>
    </div>
    {children}
  </motion.section>
);

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-brand-beige min-h-screen">
      <div className="container mx-auto px-6 max-w-3xl">

        {/* Hero */}
        <motion.div {...fadeUp}>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-dark leading-tight mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm text-brand-gray italic mb-8">Last updated: March 2026</p>

          <div className="bg-brand-accent/10 border-l-4 border-brand-accent rounded-sm px-6 py-5 mb-12">
            <p className="text-brand-dark font-medium">
              We respect your privacy. This Privacy Policy explains how Sibilla Strupule collects, uses, and protects your personal data when you visit our website or use our services.
            </p>
          </div>
        </motion.div>

        {/* Who We Are */}
        <Section pill="Data Controller" title="Who We Are">
          <p className="text-brand-gray mb-4">
            <strong className="text-brand-dark">Aekora SIA</strong> (represented by Ieva Sibilla Strupule, trading as Sibilla Strupule) is the data controller for your personal information.
          </p>
          <ul className="space-y-2 text-brand-gray">
            <li><strong className="text-brand-dark">Legal entity:</strong> Aekora SIA</li>
            <li><strong className="text-brand-dark">Contact:</strong>{' '}
              <a href="mailto:hola@aekora.com" className="text-brand-accent hover:underline font-medium">hola@aekora.com</a>
            </li>
            <li><strong className="text-brand-dark">Website:</strong>{' '}
              <a href="https://sibillastrupule.com" className="text-brand-accent hover:underline font-medium">sibillastrupule.com</a>
            </li>
            <li><strong className="text-brand-dark">Based in:</strong> Latvia, European Union</li>
          </ul>
        </Section>

        {/* What Data We Collect */}
        <Section pill="Collection" title="What Data We Collect">
          <p className="text-brand-gray mb-4">We collect the following types of information from you:</p>
          <h3 className="text-lg font-serif font-semibold text-brand-dark mb-2">Information You Provide</h3>
          <ul className="space-y-2 text-brand-gray mb-6 list-disc list-inside">
            <li><strong className="text-brand-dark">Name and Email:</strong> When you contact us or request services</li>
            <li><strong className="text-brand-dark">Payment Information:</strong> Processed securely through Stripe</li>
            <li><strong className="text-brand-dark">Communication Data:</strong> Messages, inquiries, and feedback</li>
          </ul>
          <h3 className="text-lg font-serif font-semibold text-brand-dark mb-2">Information Collected Automatically</h3>
          <ul className="space-y-2 text-brand-gray list-disc list-inside">
            <li><strong className="text-brand-dark">Usage Data:</strong> Pages visited, time spent, clicks, and interactions</li>
            <li><strong className="text-brand-dark">Technical Data:</strong> Browser type, IP address, device information</li>
            <li><strong className="text-brand-dark">Cookies:</strong> Functional and analytics cookies to improve your experience</li>
          </ul>
        </Section>

        {/* How We Use Data */}
        <Section pill="Purpose" title="How We Use Your Data">
          <p className="text-brand-gray mb-4">We use your personal data for:</p>
          <ul className="space-y-2 text-brand-gray list-disc list-inside">
            <li>Delivering coaching and advisory services you've requested</li>
            <li>Processing payments and managing our business relationship</li>
            <li>Sending marketing communications (with your consent)</li>
            <li>Improving our website and services</li>
            <li>Complying with legal obligations</li>
            <li>Protecting against fraud and security risks</li>
          </ul>
        </Section>

        {/* Legal Basis */}
        <Section pill="GDPR Compliance" title="Legal Basis for Processing">
          <p className="text-brand-gray mb-4">Under GDPR, we process your data based on:</p>
          <ul className="space-y-2 text-brand-gray list-disc list-inside">
            <li><strong className="text-brand-dark">Contract Performance:</strong> To deliver services you've requested</li>
            <li><strong className="text-brand-dark">Legitimate Interest:</strong> To improve our services and prevent fraud</li>
            <li><strong className="text-brand-dark">Consent:</strong> For marketing communications and non-essential cookies</li>
            <li><strong className="text-brand-dark">Legal Obligation:</strong> To comply with tax and regulatory requirements</li>
          </ul>
        </Section>

        {/* Data Sharing */}
        <Section pill="Third Parties" title="Who We Share Your Data With">
          <p className="text-brand-gray mb-4">We share your data only with trusted service providers who help us deliver our services:</p>
          <h3 className="text-lg font-serif font-semibold text-brand-dark mb-2">Stripe Payment Processing</h3>
          <p className="text-brand-gray mb-2">
            Payment information is processed by <strong className="text-brand-dark">Stripe</strong>. Your payment details are never stored on our servers.{' '}
            <a href="https://stripe.com/privacy" target="_blank" rel="noreferrer" className="text-brand-accent hover:underline font-medium">
              View Stripe's Privacy Policy
            </a>
          </p>
          <p className="text-brand-gray">We do not sell or rent your personal data to third parties.</p>
        </Section>

        {/* Retention */}
        <Section pill="Retention" title="How Long We Keep Your Data">
          <ul className="space-y-2 text-brand-gray list-disc list-inside mb-4">
            <li><strong className="text-brand-dark">Client Data:</strong> Kept for 5 years after service completion for legal and tax purposes</li>
            <li><strong className="text-brand-dark">Website Analytics:</strong> Retained for 12 months</li>
            <li><strong className="text-brand-dark">Marketing Communications:</strong> Until you unsubscribe</li>
          </ul>
          <p className="text-brand-gray">After this period, data is securely deleted unless we're required to retain it by law.</p>
        </Section>

        {/* Your Rights */}
        <Section pill="GDPR Rights" title="Your Data Rights">
          <p className="text-brand-gray mb-6">You have the following rights under GDPR:</p>
          <div className="space-y-5">
            {[
              { title: 'Right of Access', body: 'You can request a copy of the personal data we hold about you.' },
              { title: 'Right to Rectification', body: 'You can correct inaccurate or incomplete information.' },
              { title: 'Right to Erasure', body: 'You can request deletion of your data (subject to legal obligations).' },
              { title: 'Right to Data Portability', body: 'You can request your data in a structured, machine-readable format.' },
              { title: 'Right to Object', body: 'You can object to processing for marketing purposes or legitimate interest.' },
              { title: 'Right to Lodge a Complaint', body: 'You can file a complaint with the Data Protection Authority in Latvia or your country of residence.' },
            ].map(({ title, body }) => (
              <div key={title} className="pl-4 border-l-2 border-brand-accent/30">
                <h3 className="text-base font-serif font-semibold text-brand-dark mb-1">{title}</h3>
                <p className="text-brand-gray text-sm">{body}</p>
              </div>
            ))}
          </div>
          <div className="bg-brand-accent/10 border-l-4 border-brand-accent rounded-sm px-6 py-4 mt-6">
            <p className="text-brand-dark font-medium">
              To exercise any of these rights, contact us at{' '}
              <a href="mailto:hola@aekora.com" className="text-brand-accent hover:underline">hola@aekora.com</a>
            </p>
          </div>
        </Section>

        {/* Cookies */}
        <Section pill="Technology" title="Cookies">
          <p className="text-brand-gray mb-4">Our website uses cookies to enhance your experience. We only use:</p>
          <ul className="space-y-2 text-brand-gray list-disc list-inside mb-4">
            <li><strong className="text-brand-dark">Functional Cookies:</strong> Essential for website functionality</li>
            <li><strong className="text-brand-dark">Analytics Cookies:</strong> To understand how visitors use our site</li>
          </ul>
          <p className="text-brand-gray">We do not use advertising or tracking cookies. You can disable cookies in your browser settings, but this may affect website functionality.</p>
        </Section>

        {/* Security */}
        <Section pill="Protection" title="Data Security">
          <p className="text-brand-gray mb-4">We implement industry-standard security measures to protect your data, including:</p>
          <ul className="space-y-2 text-brand-gray list-disc list-inside mb-4">
            <li>Encrypted data transmission (HTTPS)</li>
            <li>Secure server infrastructure</li>
            <li>Access controls and authentication</li>
          </ul>
          <p className="text-brand-gray">While we take security seriously, no system is 100% secure. We encourage you to use strong passwords and keep your account information confidential.</p>
        </Section>

        {/* Contact */}
        <Section pill="Questions?" title="Contact Us About Your Data">
          <p className="text-brand-gray mb-4">If you have questions about this Privacy Policy or want to exercise your data rights:</p>
          <div className="bg-brand-accent/10 border-l-4 border-brand-accent rounded-sm px-6 py-4 mb-4">
            <p className="text-brand-dark font-medium">
              Email:{' '}
              <a href="mailto:hola@aekora.com" className="text-brand-accent hover:underline">hola@aekora.com</a>
            </p>
          </div>
          <p className="text-brand-gray">We'll respond to data access requests within 30 days as required by GDPR.</p>
        </Section>

        {/* Changes */}
        <Section pill="Updates" title="Changes to This Policy">
          <p className="text-brand-gray">
            We may update this Privacy Policy from time to time. The "Last Updated" date at the top reflects the most recent changes. We encourage you to review this policy periodically.
          </p>
        </Section>

      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
