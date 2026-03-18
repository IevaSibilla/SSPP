import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: 'easeOut' },
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <motion.section
    className="mb-12"
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
  >
    <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-dark mb-5">{title}</h2>
    {children}
  </motion.section>
);

const Pill: React.FC<{ label: string }> = ({ label }) => (
  <span className="inline-block bg-brand-accent/10 text-brand-accent text-xs font-semibold px-3 py-1 rounded-full tracking-wide mr-2">
    {label}
  </span>
);

const TermsAndConditionsPage: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-brand-beige min-h-screen">
      <div className="container mx-auto px-6 max-w-3xl">

        {/* Hero */}
        <motion.div {...fadeUp}>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-dark leading-tight mb-3">
            Terms and Conditions
          </h1>
          <p className="text-sm text-brand-gray italic mb-8">Last updated: March 2026</p>

          <div className="bg-brand-accent/10 border-l-4 border-brand-accent rounded-sm px-6 py-5 mb-10">
            <p className="text-brand-dark font-semibold mb-1">Legal Entity: Aekora SIA</p>
            <p className="text-brand-gray text-sm"><strong className="text-brand-dark">Representative:</strong> Ieva Sibilla Strupule, trading as Sibilla Strupule</p>
            <p className="text-brand-gray text-sm"><strong className="text-brand-dark">Website:</strong> sibillastrupule.com</p>
            <p className="text-brand-gray text-sm"><strong className="text-brand-dark">Contact:</strong>{' '}
              <a href="mailto:hola@aekora.com" className="text-brand-accent hover:underline font-medium">hola@aekora.com</a>
            </p>
          </div>
        </motion.div>

        {/* Welcome */}
        <Section title="Welcome">
          <p className="text-brand-gray">
            These Terms and Conditions govern your use of Sibilla Strupule's services. By engaging with us, you agree to these terms. Please read them carefully before purchasing any services.
          </p>
        </Section>

        {/* Services */}
        <Section title="Services Offered">
          <p className="text-brand-gray mb-4">Sibilla Strupule provides:</p>
          <ul className="space-y-3 text-brand-gray">
            <li className="flex items-start gap-3"><Pill label="1:1 COACHING" /><span>Pitch coaching advisory retainers</span></li>
            <li className="flex items-start gap-3"><Pill label="AUDIT" /><span>Single strategy/pitch audit sessions</span></li>
            <li className="flex items-start gap-3"><Pill label="WORKSHOPS" /><span>Workshops and speaking engagements</span></li>
            <li className="flex items-start gap-3"><Pill label="DIGITAL" /><span>Digital products and resources</span></li>
          </ul>
        </Section>

        {/* Payment Terms */}
        <Section title="Payment Terms">
          <h3 className="text-lg font-serif font-semibold text-brand-dark mb-3">General Payment</h3>
          <ul className="space-y-2 text-brand-gray list-disc list-inside mb-8">
            <li>Payments are accepted via <strong className="text-brand-dark">Stripe</strong> (card) or <strong className="text-brand-dark">bank invoice</strong> — the applicable method will be confirmed at the time of booking</li>
            <li>Prices are quoted and charged in EUR (Euros)</li>
            <li>Payment must be made in full upfront before services begin</li>
            <li>For invoice payments, a VAT invoice will be issued by Aekora SIA and is due within 7 days of issue unless otherwise agreed in writing</li>
          </ul>
          <h3 className="text-lg font-serif font-semibold text-brand-dark mb-3">Retainer Billing</h3>
          <ul className="space-y-2 text-brand-gray list-disc list-inside">
            <li>Monthly retainers are billed in advance at the start of each billing period</li>
            <li>You may cancel future months with 14 days written notice via email</li>
            <li>Cancellation does not entitle you to a refund for the current billing period already paid</li>
            <li>No partial or prorated refunds are issued for unused days within a billing period</li>
          </ul>
        </Section>

        {/* No Refund Policy - prominent callout */}
        <motion.div
          className="bg-brand-accent/10 border-2 border-brand-accent rounded-2xl px-8 py-8 mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <h2 className="text-2xl font-serif font-bold text-brand-accent mb-4">No Refund Policy</h2>
          <p className="text-brand-dark font-semibold mb-4">
            All sales are final. We offer a zero refund policy — once payment is made, it cannot be refunded under any circumstances.
          </p>
          <ul className="space-y-2 text-brand-gray list-disc list-inside mb-5">
            <li><strong className="text-brand-dark">Single sessions & audits:</strong> No refunds once paid</li>
            <li><strong className="text-brand-dark">Digital products:</strong> No refunds once purchased and access is granted</li>
            <li><strong className="text-brand-dark">Workshops & speaking fees:</strong> Non-refundable</li>
            <li><strong className="text-brand-dark">Retainers:</strong> Cancellation stops future billing, but does not include a refund for the current period already paid</li>
          </ul>
          <p className="text-brand-gray text-sm">
            <strong className="text-brand-dark">We encourage you to ask questions before purchasing</strong> if you're unsure whether a service is right for you. Contact{' '}
            <a href="mailto:hola@aekora.com" className="text-brand-accent hover:underline font-medium">hola@aekora.com</a>.
          </p>
        </motion.div>

        {/* Intellectual Property */}
        <Section title="Intellectual Property">
          <p className="text-brand-gray mb-4">
            All materials, frameworks, methodologies, content, and resources provided by Sibilla Strupule remain the sole property of Sibilla Strupule. This includes:
          </p>
          <ul className="space-y-2 text-brand-gray list-disc list-inside mb-4">
            <li>Coaching frameworks and strategies</li>
            <li>Templates, worksheets, and digital products</li>
            <li>Recordings, documents, and proprietary methods</li>
            <li>Any content created or shared during our engagement</li>
          </ul>
          <p className="text-brand-gray">
            <strong className="text-brand-dark">Your rights:</strong> You may use materials provided solely for your own personal or business purposes. You may not resell, redistribute, republish, or share the materials with others without explicit written permission.
          </p>
        </Section>

        {/* Confidentiality */}
        <Section title="Confidentiality">
          <p className="text-brand-gray mb-4">
            Both parties agree to keep the content of coaching sessions, consultations, and any information shared during the engagement confidential. This includes:
          </p>
          <ul className="space-y-2 text-brand-gray list-disc list-inside mb-4">
            <li>Details discussed during 1:1 sessions</li>
            <li>Feedback provided by Sibilla Strupule</li>
            <li>Any personal or business information disclosed</li>
          </ul>
          <p className="text-brand-gray">
            Sibilla Strupule may use anonymized case studies or general learnings to improve services or for marketing purposes, without disclosing client identity or sensitive details.
          </p>
        </Section>

        {/* Disclaimer */}
        <Section title="Disclaimer & Limitation of Liability">
          <div className="space-y-4 text-brand-gray">
            <p>
              <strong className="text-brand-dark">No Guarantees:</strong> Coaching outcomes depend on your effort, execution, and implementation of guidance provided. Sibilla Strupule does not guarantee specific results, business success, funding, partnerships, or any particular outcome.
            </p>
            <p>
              <strong className="text-brand-dark">Your Responsibility:</strong> You are responsible for your business decisions and any outcomes resulting from them. Sibilla Strupule provides advisory and coaching — the execution is up to you.
            </p>
            <p>
              <strong className="text-brand-dark">Liability Cap:</strong> In no event shall Sibilla Strupule's total liability exceed the fees you paid in the last 30 days of engagement. We are not liable for indirect, incidental, or consequential damages.
            </p>
          </div>
        </Section>

        {/* Termination */}
        <Section title="Termination of Engagement">
          <p className="text-brand-gray mb-4">
            Sibilla Strupule reserves the right to terminate an engagement or coaching relationship if:
          </p>
          <ul className="space-y-2 text-brand-gray list-disc list-inside mb-4">
            <li>The client is abusive, disrespectful, or harassing toward Sibilla Strupule</li>
            <li>The client is consistently non-responsive or fails to engage meaningfully</li>
            <li>There is a breach of these Terms and Conditions</li>
            <li>The engagement is no longer a good fit for either party</li>
          </ul>
          <p className="text-brand-gray">In such cases, remaining retainer fees will not be refunded, though notice will be provided.</p>
        </Section>

        {/* Governing Law */}
        <Section title="Governing Law & Jurisdiction">
          <p className="text-brand-gray">
            These Terms and Conditions are governed by the laws of the Republic of Latvia, European Union. Any disputes arising from this agreement shall be resolved under Latvian law. Both parties agree to resolve disputes in a manner consistent with Latvian jurisdiction.
          </p>
        </Section>

        {/* Changes */}
        <Section title="Changes to These Terms">
          <p className="text-brand-gray">
            Sibilla Strupule reserves the right to modify these Terms and Conditions at any time. Changes will be posted on the website, and continued use of services constitutes acceptance of updated terms. For ongoing retainer clients, material changes will be communicated via email with a 14-day notice period.
          </p>
        </Section>

        {/* Contact */}
        <Section title="Questions?">
          <p className="text-brand-gray mb-4">If you have questions about these Terms and Conditions or our services, please reach out:</p>
          <div className="bg-brand-accent/10 border-l-4 border-brand-accent rounded-sm px-6 py-4">
            <p className="text-brand-dark font-medium">
              Email:{' '}
              <a href="mailto:hola@aekora.com" className="text-brand-accent hover:underline">hola@aekora.com</a>
            </p>
          </div>
        </Section>

      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
