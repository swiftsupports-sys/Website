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
      "Recent graduates, experienced technology professionals, and career switchers who want structured, personalized support for their US technology job search. If you are unsure whether your goals are realistic for your current profile, that is exactly what the free consultation is for.",
    tags: ["general"],
  },
  {
    question: "Which roles and domains do you support?",
    answer:
      "Software development (Java, Python, .NET, full-stack, front-end, and back-end), QA and automation, data analytics, data science and data engineering, cloud and DevOps, cybersecurity, business analysis, and UI/UX and product roles. If your target role is not listed, tell us and we will be honest about whether we can support it well.",
    tags: ["general"],
  },
  {
    question: "Which package is right for me?",
    answer:
      "Choose Profile Marketing if you are interview-ready but not getting enough calls. Choose Training and Support if you are getting interviews but need stronger preparation to convert them. Choose the Complete Career Package if you want both — most candidates starting a fresh search do. We will recommend one honestly during your consultation.",
    tags: ["general", "pricing"],
  },
  {
    question: "Do you guarantee job placement?",
    answer:
      "We guarantee our work, not an employer's decision. Your engagement includes dedicated interview opportunities, candidate marketing, and recruiter networking — worked continuously rather than stopping after a fixed number of applications. Candidates who follow the process, complete the work, and stay responsive can expect to start reaching interview opportunities within weeks, depending on their profile and the opportunities available. Our goal is to move you from interviews to an offer within three to six months, and sooner where a candidate is highly consistent. What we cannot honestly guarantee is a specific offer, employer, salary, or joining date, because the final hiring decision belongs to the employer. Any consultancy promising you a job is either charging for something outside its control or not telling you the whole truth.",
    tags: ["general", "pricing"],
  },
  {
    question: "What is included in the Profile Marketing package?",
    answer:
      "40+ targeted job applications daily, a professional ATS-friendly resume, LinkedIn profile optimization and ongoing management, GitHub optimization with real-world project building, a personal portfolio website, recruiter outreach, and weekly application reports.",
    tags: ["pricing"],
  },
  {
    question: "What is included in the Training and Support package?",
    answer:
      "Role-specific technical training, behavioral interview training, interview support with a briefing before every round and a debrief after it, mock interviews with detailed feedback, job-description-based mock practice, one-to-one mentorship, and a curated interview question bank for your role.",
    tags: ["pricing"],
  },
  {
    question: "What does the Complete Career Package add?",
    answer:
      "Everything in both Profile Marketing and Training and Support, coordinated by one dedicated consultant, with priority scheduling, weekly strategy and progress reviews, and guidance on evaluating and negotiating offers.",
    tags: ["pricing"],
  },
  {
    question: "Do you really apply to 40+ jobs a day for me?",
    answer:
      "Yes. With Profile Marketing and the Complete Career Package, our team submits 40+ targeted applications every working day to roles that match your skills, level, and domain. You approve your resume and target roles first, and you receive a weekly report of where you have applied and what responses have come in.",
    tags: ["general"],
  },
  {
    question: "Will you add skills or experience I do not have?",
    answer:
      "No. We present your real experience as strongly as it deserves, but nothing is invented or inflated. A claim you cannot defend fails at the first technical question — and the training exists precisely so you can back up everything on your resume.",
    tags: ["general"],
  },
  {
    question: "Do you attend or assist during real interviews?",
    answer:
      "No. Interview support means a focused briefing before each round and a debrief after it. We never attend interviews, assessments, or any part of a hiring process on a candidate's behalf.",
    tags: ["general"],
  },
  {
    question: "Are there any other charges?",
    answer:
      "Every fee, its timing, and its conditions are set out in writing in your service agreement before you commit — never introduced afterwards.",
    tags: ["pricing"],
  },
  {
    question: "How do I begin?",
    answer:
      "Book a free consultation. We will talk through your experience, target role, domain, and expectations, then recommend the package that fits and explain what it involves. There is no obligation to continue.",
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
    question: "Can I upgrade to the Complete Career Package later?",
    answer:
      "Yes. If you start with Profile Marketing or Training and Support and later want both, talk to your consultant — the upgrade terms are confirmed in writing before anything changes.",
    tags: ["pricing"],
  },
];

export const faqsFor = (tag: "general" | "pricing") =>
  faqs.filter((faq) => faq.tags.includes(tag));
