import {
  BarChart3,
  Braces,
  Cloud,
  Database,
  LayoutPanelTop,
  ListChecks,
  PlusCircle,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export type Domain = {
  title: string;
  /** One line for the home-page grid. */
  short: string;
  /** Fuller description for the domains page. */
  long: string;
  icon: LucideIcon;
};

export const domains: Domain[] = [
  {
    title: "Software Development",
    short: "Java, Python, .NET, full-stack, front-end, and back-end developer roles.",
    long: "Java, Python, .NET, full-stack, front-end, and back-end developer roles. Preparation covers language and framework depth, problem solving, code quality, design discussion, and explaining the systems you have worked on.",
    icon: Braces,
  },
  {
    title: "Quality Assurance & Automation",
    short: "QA analyst, automation engineer, and SDET roles.",
    long: "QA analyst, automation engineer, and SDET roles. Focus on test strategy, framework design, coverage decisions, defect reasoning, and working effectively alongside development teams.",
    icon: ListChecks,
  },
  {
    title: "Data Analytics & Data Engineering",
    short: "Data analyst, data scientist, and data engineer roles.",
    long: "Data analyst, data scientist, and data engineer roles. Preparation spans SQL and Python, statistics and machine learning fundamentals, pipelines, transformation, warehousing concepts, visualization, and communicating findings to non-technical stakeholders.",
    icon: Database,
  },
  {
    title: "Cloud Engineering & DevOps",
    short: "AWS, Azure, and GCP cloud, DevOps, and SRE roles.",
    long: "AWS, Azure, and GCP cloud, DevOps, and site reliability roles. Coverage spans CI/CD, infrastructure as code, containers, monitoring, and reliability practice — including how to describe operational trade-offs you have actually made.",
    icon: Cloud,
  },
  {
    title: "Cybersecurity",
    short: "SOC analyst, security engineer, and GRC roles.",
    long: "Security operations, application security, governance, risk, and compliance. Preparation emphasises practical reasoning, incident thinking, and clear communication under pressure.",
    icon: ShieldCheck,
  },
  {
    title: "Business Analysis",
    short: "Business analyst, product owner, and scrum master roles.",
    long: "Requirements, process mapping, stakeholder management, and documentation. Interview preparation focuses on structured thinking and translating ambiguity into workable specifications.",
    icon: BarChart3,
  },
  {
    title: "UI/UX and Product Roles",
    short: "UI/UX designer, product designer, and product manager roles.",
    long: "Design, research, and product-adjacent paths. Focus on portfolio narrative, design reasoning, user research fundamentals, and defending decisions in a critique setting.",
    icon: LayoutPanelTop,
  },
  {
    title: "Other Technology Domains",
    short: "Tell us your target role — we will map the right approach.",
    long: "Working toward something not listed here? Tell us the role and we will be candid about whether we can support it properly — and what that support would look like.",
    icon: PlusCircle,
  },
];
