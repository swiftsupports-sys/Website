export type FaqItem = {
  question: string;
  answer: string;
  /** Which pages render this entry. */
  tags: ("general" | "pricing")[];
};

export const faqs: FaqItem[] = [
  {
    question: "Who can benefit from your services?",
    answer:
      "Experienced technology professionals, career switchers, and aspiring professionals who want structured, personalized support for their US technology job search. If you are unsure whether your goals are realistic for your current profile, that is exactly what the consultation is for.",
    tags: ["general"],
  },
  {
    question: "Which technology domains do you support?",
    answer:
      "Software development, quality assurance and automation, data analytics and data engineering, cloud engineering and DevOps, cybersecurity, business analysis, UI/UX and product roles, and other technology domains. If your target role sits outside this list, tell us and we will be honest about whether we can support it well.",
    tags: ["general"],
  },
  {
    question: "Do you guarantee job placement?",
    answer:
      "No. We do not guarantee jobs, offers, interviews, salaries, or placement at any specific company. Hiring decisions are made by employers. What we provide is preparation, positioning, visibility, and guidance — and honest feedback about where you stand.",
    tags: ["general", "pricing"],
  },
  {
    question: "What is included in the Base package?",
    answer:
      "All core consultancy services: candidate marketing and recruiter networking, domain-specific training and mentorship, technical and behavioral interview preparation, mock interviews with personalized feedback, and support through the placement journey. Placement-related charges apply after successful placement.",
    tags: ["general", "pricing"],
  },
  {
    question: "What is included in the Premium package?",
    answer:
      "Everything in the Base Package, plus priority mentorship and strategic guidance, comprehensive end-to-end candidate support, and no post-placement charges after successful placement.",
    tags: ["general", "pricing"],
  },
  {
    question: "Are there post-placement charges?",
    answer:
      "With the Base Package, placement-related charges apply after successful placement. With the Premium Package, there are none. The exact amounts, timing, and conditions are set out in writing in your service agreement before you commit — never introduced afterwards.",
    tags: ["general", "pricing"],
  },
  {
    question: "How do I begin?",
    answer:
      "Book a free consultation. We will talk through your experience, target role, domain, and expectations, then explain the approach we would recommend and what it would involve. There is no obligation to continue.",
    tags: ["general"],
  },
  {
    question: "Do I need to submit a resume before contacting you?",
    answer:
      "No. Begin by booking a consultation and sharing your current profile, goals, target role, and expectations. We will guide you through the next steps.",
    tags: ["general"],
  },
  {
    /* PLACEHOLDER: confirm payment methods, schedule, currency, and refund
       terms with your finance and legal advisors before publishing. */
    question: "How is payment handled?",
    answer:
      "[Placeholder — describe accepted payment methods, instalment options if offered, invoicing, currency, and refund or cancellation terms here. This wording should be reviewed alongside your service agreement before publication.]",
    tags: ["pricing"],
  },
  {
    question: "Can the scope be adjusted to my situation?",
    answer:
      "Yes — the emphasis shifts depending on what you need. A candidate who already interviews well but lacks visibility gets a different balance of effort than one who needs depth in a new domain. We agree that balance during the consultation.",
    tags: ["pricing"],
  },
];

export const faqsFor = (tag: "general" | "pricing") =>
  faqs.filter((faq) => faq.tags.includes(tag));
