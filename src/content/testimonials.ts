/**
 * Real candidate feedback, supplied by the business.
 *
 * Attributed by domain rather than by name: publishing a candidate's name
 * requires their written consent, and anonymised feedback is both safer and
 * common practice for career services. If a candidate later consents to being
 * named, add the name to `context` (e.g. "Priya R. — candidate feedback").
 *
 * House rules: no employer names, no salary figures, no guaranteed outcomes.
 * The quotes describe the support received, not results promised.
 *
 * Set `isPlaceholder: true` on any entry that is illustrative rather than real
 * — it renders a visible "Example placeholder" badge on the card.
 */

export type Testimonial = {
  quote: string;
  /** Primary attribution line. The candidate's technology domain. */
  domain: string;
  /** Secondary line beneath the attribution. */
  context: string;
  initials: string;
  isPlaceholder?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "I had been applying for a while but wasn't getting much beyond the initial screening. The biggest help was getting feedback on how I was explaining my projects. I realized I knew the work, but wasn't communicating it clearly in interviews.",
    domain: "Software Engineering",
    context: "Candidate feedback",
    initials: "SE",
  },
  {
    quote:
      "Coming from a testing background, I wasn't sure how to present my experience for automation roles. The preparation helped me understand what interviewers were actually looking for and gave me a much clearer way to talk through my projects.",
    domain: "QA & Automation",
    context: "Candidate feedback",
    initials: "QA",
  },
  {
    quote:
      "I was comfortable with SQL and Excel but struggled when interviewers asked me to explain my approach. Practicing those questions helped me become much more structured in the way I answered.",
    domain: "Data Analytics",
    context: "Candidate feedback",
    initials: "DA",
  },
  {
    quote:
      "The technical questions weren't necessarily the hardest part. It was explaining why I made certain decisions. The mock discussions helped me slow down, explain my thinking, and stop rushing through answers.",
    domain: "Cloud & DevOps",
    context: "Candidate feedback",
    initials: "CD",
  },
  {
    quote:
      "Before this, my preparation was basically solving questions randomly and hoping I was covering the right things. Having specific areas to work on made the process feel much more manageable.",
    domain: "Cybersecurity",
    context: "Candidate feedback",
    initials: "CS",
  },
  {
    quote:
      "The biggest difference for me was learning how to talk about my projects properly. Instead of just listing the technologies I used, I started explaining what problem I solved and why I made certain technical decisions.",
    domain: "Full Stack Development",
    context: "Candidate feedback",
    initials: "FS",
  },
];
