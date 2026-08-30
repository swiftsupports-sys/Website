import {
  CircleCheckBig,
  ClipboardList,
  GraduationCap,
  Map,
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
    title: "Career Assessment",
    description:
      "We understand your experience, career stage, target role, strengths, and professional expectations.",
    details: [
      "A detailed review of your background and current profile",
      "An honest read on which roles and levels are realistic today",
    ],
    icon: ClipboardList,
  },
  {
    n: "02",
    title: "Personalized Roadmap",
    description:
      "We create a focused plan covering profile positioning, skills, preparation, and next actions.",
    details: [
      "Priorities sequenced so the highest-impact work happens first",
      "Checkpoints so progress is visible, not assumed",
    ],
    icon: Map,
  },
  {
    n: "03",
    title: "Role-Specific Training",
    description:
      "Receive guidance around relevant technologies, real-world expectations, projects, and professional skills.",
    details: [
      "Depth in the areas your target roles actually assess",
      "Practical work you can discuss with confidence",
    ],
    icon: GraduationCap,
  },
  {
    n: "04",
    title: "Candidate Marketing & Networking",
    description:
      "We help position your profile and build visibility through targeted marketing and recruiter networking.",
    details: [
      "Positioning matched to each type of opportunity",
      "Consistent, professional follow-up with hiring channels",
    ],
    icon: Megaphone,
  },
  {
    n: "05",
    title: "Interview & Placement Guidance",
    description:
      "Receive dedicated interview preparation, mock sessions, feedback, and support as you navigate opportunities.",
    details: [
      "Round-by-round preparation as processes progress",
      "Debriefs after each interview so the next one goes better",
    ],
    icon: CircleCheckBig,
  },
];
