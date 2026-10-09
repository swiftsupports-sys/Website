import {
  CircleCheckBig,
  ClipboardList,
  FileText,
  GraduationCap,
  Megaphone,
  type LucideIcon,
} from "lucide-react";

export type ProcessStep = {
  n: string;
  title: string;
  description: string;
  /** Extra detail shown on the How It Works page only. */
  details: string[];
  icon: LucideIcon;
};

export const processSteps: ProcessStep[] = [
  {
    n: "01",
    title: "Free Career Consultation",
    description:
      "We learn about your experience, skills, target role, and goals, and recommend the package that fits.",
    details: [
      "An honest review of your background and current profile",
      "A clear recommendation on which roles and levels to target",
    ],
    icon: ClipboardList,
  },
  {
    n: "02",
    title: "Resume & Profile Building",
    description:
      "We build your ATS-friendly resume, optimize LinkedIn and GitHub, and create your personal portfolio website.",
    details: [
      "Resume and LinkedIn written for the roles you are targeting",
      "Real-world projects and a portfolio that back up your experience",
    ],
    icon: FileText,
  },
  {
    n: "03",
    title: "Profile Marketing",
    description:
      "We submit 40+ targeted applications daily and reach out to recruiters hiring in your domain.",
    details: [
      "Applications matched to your skills, level, and domain",
      "Weekly reports on applications, responses, and next steps",
    ],
    icon: Megaphone,
  },
  {
    n: "04",
    title: "Role-Specific Training",
    description:
      "Hands-on technical and behavioral training focused on what your target role actually assesses.",
    details: [
      "Depth in the technologies your target roles ask for",
      "Practical, real-world work you can discuss with confidence",
    ],
    icon: GraduationCap,
  },
  {
    n: "05",
    title: "Interviews & Offer",
    description:
      "Mock interviews, job-description-based practice, and support before and after every round — through to the offer.",
    details: [
      "A briefing before each scheduled interview and a debrief after it",
      "Guidance on evaluating, negotiating, and accepting offers",
    ],
    icon: CircleCheckBig,
  },
];
