import {
  Award,
  BadgeCheck,
  Braces,
  ClipboardList,
  Contact,
  FileText,
  GraduationCap,
  LayoutPanelTop,
  LifeBuoy,
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
    eyebrow: "Group 01 — Profile Marketing",
    heading: "Profile Building & Marketing.",
    intro:
      "A resume, LinkedIn, GitHub, and portfolio that present you at your best — then put in front of recruiters and hiring teams every single day.",
  },
  {
    id: "preparation",
    eyebrow: "Group 02 — Training & Support",
    heading: "Training & Interview Readiness.",
    intro:
      "Role-specific training and realistic practice, so that when the interview call comes you are ready for every round.",
  },
  {
    id: "continuity",
    eyebrow: "Group 03 — Mentorship",
    heading: "Mentorship & Offer Support.",
    intro:
      "Someone in your corner from the first call to your first months in the new role — so momentum never depends on you carrying it alone.",
  },
];

export const services: Service[] = [
  {
    n: "01",
    title: "Career Assessment and Role Guidance",
    short: "Clarify your target role, level, and realistic direction.",
    long: "A structured review of your experience, skills, and goals, ending in a clear view of the roles and levels worth targeting now — and a plan for the ones worth building toward.",
    icon: Target,
    group: "positioning",
  },
  {
    n: "02",
    title: "Resume Writing and ATS Optimization",
    short: "A professional resume built to pass screening and impress reviewers.",
    long: "A professionally written resume with the structure, language, and keywords that pass applicant tracking systems and hold a recruiter's attention — while keeping every claim something you can defend.",
    icon: FileText,
    group: "positioning",
  },
  {
    n: "03",
    title: "LinkedIn Optimization and Management",
    short: "A profile recruiters find, trust, and contact.",
    long: "Headline, summary, experience, and skills rewritten around the searches recruiters actually run — then actively managed, so your profile stays current and visible throughout your search.",
    icon: Contact,
    group: "positioning",
  },
  {
    n: "04",
    title: "GitHub Optimization and Project Building",
    short: "Real-world projects that prove what your resume claims.",
    long: "A clean, professional GitHub profile and guided real-world projects in your target stack — work you understand end to end and can walk an interviewer through with confidence.",
    icon: Braces,
    group: "positioning",
  },
  {
    n: "05",
    title: "Personal Portfolio Website",
    short: "Your own professional site, designed and built for you.",
    long: "A personal portfolio website that brings your experience, projects, and skills together in one place — a link that makes a strong first impression on every application.",
    icon: LayoutPanelTop,
    group: "positioning",
  },
  {
    n: "06",
    title: "Daily Targeted Job Applications",
    short: "40+ applications every day to roles that match your profile.",
    long: "40+ applications submitted every working day to roles matched to your skills, level, and target domain — tracked carefully and reported to you weekly, so you always know where you stand.",
    icon: Send,
    group: "positioning",
  },
  {
    n: "07",
    title: "Recruiter Outreach and Networking",
    short: "Direct, professional outreach to recruiters in your domain.",
    long: "Targeted outreach, professional messaging, and disciplined follow-up with recruiters and hiring teams working on roles in your domain — visibility that job boards alone cannot give you.",
    icon: Network,
    group: "positioning",
  },
  {
    n: "08",
    title: "Role-Specific Technical Training",
    short: "Focused training in the skills your target role assesses.",
    long: "Hands-on training in the technologies, tools, and practices that appear in the job descriptions you are pursuing — taught by practitioners and built around real-world scenarios, not a generic syllabus.",
    icon: GraduationCap,
    group: "preparation",
  },
  {
    n: "09",
    title: "Behavioral Interview Training",
    short: "Clear, structured answers that show who you are.",
    long: "Structured answers for experience, situational, and motivation questions — plus the communication style and workplace norms expected on US technology teams.",
    icon: MessagesSquare,
    group: "preparation",
  },
  {
    n: "10",
    title: "Mock Interviews with Feedback",
    short: "Realistic sessions followed by specific, actionable notes.",
    long: "Full-length mock interviews that mirror real technical and HR rounds, followed by detailed feedback naming what worked, what did not, and exactly what to change next time.",
    icon: Mic,
    group: "preparation",
  },
  {
    n: "11",
    title: "Job-Description-Based Mock Practice",
    short: "Practice built from the exact role you are interviewing for.",
    long: "When an interview is scheduled, we build a mock session from that role's job description — the skills, tools, and scenarios that specific team is most likely to ask about.",
    icon: ClipboardList,
    group: "preparation",
  },
  {
    n: "12",
    title: "Interview Support",
    short: "A briefing before every round and a debrief after it.",
    long: "Before each scheduled interview, a focused briefing on the company, the role, and the likely questions. After it, a debrief — so every round makes you stronger for the next one.",
    icon: Award,
    group: "preparation",
  },
  {
    n: "13",
    title: "One-to-One Mentorship",
    short: "A dedicated point of contact through the whole journey.",
    long: "A consistent mentor who knows your history and your goals, available for the questions and decisions that come up between formal sessions.",
    icon: LifeBuoy,
    group: "continuity",
  },
  {
    n: "14",
    title: "Offer and Onboarding Guidance",
    short: "Evaluate offers and prepare for a confident start.",
    long: "Help through the final stretch: comparing offers, negotiation, documentation, background checks, and the questions worth asking before you accept.",
    icon: BadgeCheck,
    group: "continuity",
  },
  {
    n: "15",
    title: "Post-Placement Career Guidance",
    short: "Settle in, perform well, and plan the next step.",
    long: "Support settling into a new team, navigating your first performance review, and planning the step after this one — because a role is a stage, not a destination.",
    icon: TrendingUp,
    group: "continuity",
  },
];

export const servicesByGroup = (group: ServiceGroupId) =>
  services.filter((service) => service.group === group);
