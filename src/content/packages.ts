export type Package = {
  id: "base" | "premium";
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
    id: "base",
    name: "Base Package",
    price: "$2.5K",
    description:
      "A complete career-support package for candidates seeking structured preparation, marketing, and placement guidance.",
    features: [
      "All core consultancy services",
      "Candidate marketing and recruiter networking",
      "Domain-specific training and mentorship",
      "Technical and behavioral interview preparation",
      "Mock interviews and personalized feedback",
      "Support through the placement journey",
    ],
    cta: "Discuss the Base Package",
    note: "Placement-related charges apply after successful placement.",
  },
  {
    id: "premium",
    name: "Premium Package",
    price: "$10K",
    description:
      "Complete, end-to-end career support with no additional charges after successful placement.",
    features: [
      "Everything in the Base Package",
      "Priority mentorship and strategic guidance",
      "Comprehensive end-to-end candidate support",
      "No post-placement charges after successful placement",
    ],
    cta: "Choose Premium Support",
    note: "Engagement scope is confirmed in writing before any payment.",
    recommended: true,
  },
];

export const pricingDisclaimer =
  "Packages and terms are discussed transparently during the consultation based on candidate requirements and service scope.";
