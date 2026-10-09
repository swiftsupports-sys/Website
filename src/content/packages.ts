export type Package = {
  id: "marketing" | "training" | "complete";
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  note: string;
  recommended?: boolean;
};

export const packages: Package[] = [
  {
    id: "marketing",
    name: "Profile Marketing",
    price: "$1K",
    description:
      "Build a profile that stands out and put it in front of the right recruiters, every day.",
    features: [
      "40+ targeted job applications daily",
      "Professional, ATS-friendly resume writing",
      "LinkedIn profile optimization and ongoing management",
      "GitHub profile optimization and real-world project building",
      "Personal portfolio website, designed and built for you",
      "Recruiter outreach and networking on your behalf",
      "Weekly application and response reports",
    ],
    cta: "Start With Profile Marketing",
    note: "Scope and terms are confirmed in writing before any payment.",
  },
  {
    id: "training",
    name: "Training and Support",
    price: "$1K",
    description:
      "Role-specific preparation so you walk into every interview confident and ready.",
    features: [
      "Role-specific technical training",
      "Behavioral interview training",
      "Interview support: a briefing before every round and a debrief after",
      "Mock interview practice with detailed feedback",
      "Job-description-based mock interviews",
      "One-to-one mentorship from domain experts",
      "Curated interview question bank for your role",
    ],
    cta: "Start Training and Support",
    note: "Scope and terms are confirmed in writing before any payment.",
  },
  {
    id: "complete",
    name: "Complete Career Package",
    price: "$2K",
    description:
      "Profile marketing and training together: one end-to-end program from application to offer stage.",
    features: [
      "Everything in Profile Marketing",
      "Everything in Training and Support",
      "One dedicated consultant coordinating your journey",
      "Priority scheduling for mock interviews and support",
      "Weekly strategy and progress reviews",
      "Offer evaluation and negotiation guidance",
    ],
    cta: "Choose the Complete Package",
    note: "Scope and terms are confirmed in writing before any payment.",
    recommended: true,
  },
];

export const pricingDisclaimer =
  "Packages and terms are discussed transparently during the consultation based on candidate requirements and service scope.";
