import {
  Award,
  BadgeCheck,
  Braces,
  ClipboardList,
  Contact,
  FileText,
  GraduationCap,
  LifeBuoy,
  Map,
  MessagesSquare,
  Mic,
  Network,
  Send,
  Target,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

export type ServiceGroupId = "positioning" | "preparation" | "continuity";

export type Service = {
  /** Display number used in the home-page list. */
  n: string;
  title: string;
  /** One line, used in the condensed home-page list. */
  short: string;
  /** Full description, used on the services page. */
  long: string;
  icon: LucideIcon;
  group: ServiceGroupId;
};

export const serviceGroups: {
  id: ServiceGroupId;
  eyebrow: string;
  heading: string;
  intro: string;
}[] = [
  {
    id: "positioning",
    eyebrow: "Group 01 — Positioning",
    heading: "Positioning & Market Visibility.",
    intro:
      "Making sure the right people see an accurate, well-structured version of your professional story.",
  },
  {
    id: "preparation",
    eyebrow: "Group 02 — Preparation",
    heading: "Training & Interview Readiness.",
    intro:
      "Building the depth and composure to handle real interview rounds in your target domain.",
  },
  {
    id: "continuity",
    eyebrow: "Group 03 — Continuity",
    heading: "Mentorship & Ongoing Support.",
    intro:
      "Someone in your corner before, during, and after the search — so momentum does not depend on you carrying it alone.",
  },
];

export const services: Service[] = [
  {
    n: "01",
    title: "Career Assessment and Role Guidance",
    short: "Clarify your target role, level, and realistic direction.",
    long: "A structured review of your experience, strengths, and expectations, ending in a clear view of the roles and levels worth targeting now — and the ones worth building toward.",
    icon: Target,
    group: "positioning",
  },
  {
    n: "02",
    title: "Resume and ATS Optimization",
    short: "Structure, language, and keywords that survive screening.",
    long: "Structure, language, and keyword coverage tuned for applicant tracking systems and human reviewers alike — while keeping every claim something you can defend.",
    icon: FileText,
    group: "positioning",
  },
  {
    n: "03",
    title: "LinkedIn Optimization and Professional Branding",
    short: "A profile that reads like the candidate you are targeting.",
    long: "Headline, summary, experience framing, skills, and the signals recruiters actually filter on — aligned to the roles you are pursuing.",
    icon: Contact,
    group: "positioning",
  },
  {
    n: "04",
    title: "Candidate Marketing and Opportunity Positioning",
    short: "Present your strengths where they are most relevant.",
    long: "Your profile presented to relevant hiring channels with the emphasis placed where it matters for each type of role, rather than a single generic pitch sent everywhere.",
    icon: Send,
    group: "positioning",
  },
  {
    n: "05",
    title: "Recruiter Networking Support",
    short: "Targeted outreach and follow-up that stays professional.",
    long: "Targeted outreach, professional messaging, and disciplined follow-up that builds visibility with recruiters working on roles in your domain.",
    icon: Network,
    group: "positioning",
  },
  {
    n: "06",
    title: "Job Search Strategy and Application Guidance",
    short: "Where to apply, how often, and how to track progress.",
    long: "Where to apply, how much volume is realistic, how to prioritize openings, and how to track responses so you can adjust based on evidence rather than guesswork.",
    icon: Map,
    group: "positioning",
  },
  {
    n: "07",
    title: "Domain-Specific Training",
    short: "Focused upskilling for the role you are pursuing.",
    long: "Focused upskilling in the technologies, tools, and practices that appear in the job descriptions you are actually pursuing — not a generic curriculum.",
    icon: GraduationCap,
    group: "preparation",
  },
  {
    n: "08",
    title: "Software Application and Project Guidance",
    short: "Build and explain work that stands up to scrutiny.",
    long: "Guidance on building work worth talking about — scope, architecture, and the ability to explain your decisions clearly when an interviewer probes them.",
    icon: Braces,
    group: "preparation",
  },
  {
    n: "09",
    title: "Technical Interview Preparation",
    short: "Role-relevant problems, systems, and live practice.",
    long: "Role-relevant problems, system and design discussion, and live practice under realistic conditions, calibrated to the level you are interviewing for.",
    icon: ClipboardList,
    group: "preparation",
  },
  {
    n: "10",
    title: "HR and Behavioral Interview Preparation",
    short: "Structured answers for experience and situational rounds.",
    long: "Structured, specific answers for experience, situational, and motivation questions — including the ones about gaps, transitions, and expectations.",
    icon: MessagesSquare,
    group: "preparation",
  },
  {
    n: "11",
    title: "Mock Interviews with Feedback",
    short: "Realistic sessions followed by specific, written notes.",
    long: "Full-length sessions that mirror real rounds, followed by written feedback naming what worked, what did not, and precisely what to change next time.",
    icon: Mic,
    group: "preparation",
  },
  {
    n: "12",
    title: "Communication and Workplace Readiness Coaching",
    short: "Clarity, presence, and collaboration in US work settings.",
    long: "Clarity, pace, and presence in professional settings — plus the collaboration norms and written communication expected on US technology teams.",
    icon: Award,
    group: "preparation",
  },
  {
    n: "13",
    title: "One-to-One Mentorship",
    short: "A consistent point of contact through the whole journey.",
    long: "A consistent point of contact who knows your history and your goals, available for the decisions that come up between the formal sessions.",
    icon: LifeBuoy,
    group: "continuity",
  },
  {
    n: "14",
    title: "Pre-Placement Support",
    short: "Offer conversations, documentation, and readiness checks.",
    long: "Help through the final stretch: offer conversations, documentation, background checks, notice periods, and the questions worth asking before you accept.",
    icon: BadgeCheck,
    group: "continuity",
  },
  {
    n: "15",
    title: "Post-Placement Career Guidance",
    short: "Settling in, early performance, and next-step planning.",
    long: "Settling into a new team, navigating the first performance cycle, and planning the step after this one — because a role is a stage, not a destination.",
    icon: TrendingUp,
    group: "continuity",
  },
];

export const servicesByGroup = (group: ServiceGroupId) =>
  services.filter((service) => service.group === group);
