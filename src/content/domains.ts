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
    short: "Frontend, backend, and full-stack engineering roles.",
    long: "Frontend, backend, and full-stack engineering. Preparation covers language and framework depth, problem solving, code quality, design discussion, and explaining the systems you have worked on.",
    icon: Braces,
  },
  {
    title: "Quality Assurance & Automation",
    short: "Manual, automation, and quality engineering tracks.",
    long: "Manual, automation, and quality engineering tracks. Focus on test strategy, framework design, coverage decisions, defect reasoning, and working effectively alongside development teams.",
    icon: ListChecks,
  },
  {
    title: "Data Analytics & Data Engineering",
    short: "Analytics, pipelines, warehousing, and reporting roles.",
    long: "Analysis, pipelines, modelling, and reporting. Preparation spans querying, transformation, warehousing concepts, visualization, and communicating findings to non-technical stakeholders.",
    icon: Database,
  },
  {
    title: "Cloud Engineering & DevOps",
    short: "Cloud platforms, CI/CD, infrastructure, and reliability.",
    long: "Cloud platforms, CI/CD, infrastructure as code, containers, monitoring, and reliability practice — including how to describe operational trade-offs you have actually made.",
    icon: Cloud,
  },
  {
    title: "Cybersecurity",
    short: "Security operations, governance, and application security.",
    long: "Security operations, application security, governance, risk, and compliance. Preparation emphasises practical reasoning, incident thinking, and clear communication under pressure.",
    icon: ShieldCheck,
  },
  {
    title: "Business Analysis",
    short: "Requirements, process, and product-adjacent analyst roles.",
    long: "Requirements, process mapping, stakeholder management, and documentation. Interview preparation focuses on structured thinking and translating ambiguity into workable specifications.",
    icon: BarChart3,
  },
  {
    title: "UI/UX and Product Roles",
    short: "Design, research, and product-oriented career paths.",
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
