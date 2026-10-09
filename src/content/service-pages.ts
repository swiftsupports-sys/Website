/**
 * Dedicated service pages.
 *
 * Each entry maps to a distinct commercial search intent and is built only from
 * services listed in `services.ts` — nothing here describes work the business
 * does not actually do. Four substantial pages, not fifteen thin ones: a page
 * per service would duplicate itself into uselessness.
 */

export type ServicePage = {
  slug: string;
  /** Short label for internal links and breadcrumbs. */
  navLabel: string;
  /** <title> without the brand suffix. */
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  /** Page H1. Split so the second half can carry the accent colour. */
  h1: { lead: string; accent: string };
  intro: string[];
  /** schema.org Service.serviceType values. */
  serviceType: string[];
  includes: { title: string; body: string }[];
  process: { n: string; title: string; body: string }[];
  audience: { title: string; body: string }[];
  faqs: { question: string; answer: string }[];
  /** Slugs of the other service pages worth linking to from this one. */
  related: string[];
};

export const servicePages: ServicePage[] = [
  {
    slug: "interview-preparation",
    navLabel: "Interview Preparation",
    metaTitle: "Technical & Behavioral Interview Preparation",
    metaDescription:
      "One-to-one technical and behavioral interview training for US technology roles, with job-description-based mock interviews, detailed feedback, and support before every round.",
    eyebrow: "Interview Preparation",
    h1: {
      lead: "Technical and Behavioral",
      accent: "Interview Preparation.",
    },
    intro: [
      "Most candidates who struggle with interviews are not short on ability. They are short on practice under realistic conditions, and on specific feedback about what actually went wrong in the room.",
      "We prepare you for the rounds you will genuinely face for your target role and level: technical problems and system discussion, HR and behavioral questions, and the managerial conversations that decide offers. When a real interview is scheduled, we build a mock session from that role's job description and brief you before you go in.",
    ],
    serviceType: [
      "Technical interview preparation",
      "Behavioral interview coaching",
      "Mock interviews",
    ],
    includes: [
      {
        title: "Technical interview preparation",
        body: "Role-relevant problems, system and design discussion, and live practice under realistic conditions, calibrated to the level you are interviewing for rather than a generic difficulty curve.",
      },
      {
        title: "HR and behavioral interview preparation",
        body: "Structured, specific answers for experience, situational, and motivation questions — including the uncomfortable ones about gaps, transitions, notice periods, and expectations.",
      },
      {
        title: "Mock interviews with written feedback",
        body: "Full-length sessions that mirror real rounds, followed by written feedback. Not 'be more confident', but which answer rambled, which claim invited a follow-up you could not defend, and what to cut.",
      },
      {
        title: "Job-description-based mock practice",
        body: "For every scheduled interview, a mock session built from that role's job description — the skills, tools, and scenarios that specific team is most likely to ask about.",
      },
      {
        title: "Interview support",
        body: "A focused briefing before each round on the company, the role, and the likely questions — and a debrief afterwards, so every interview makes the next one stronger.",
      },
    ],
    process: [
      {
        n: "01",
        title: "Establish your baseline",
        body: "A first mock session tells us far more than a questionnaire. We find out how you actually perform under pressure before deciding what to work on.",
      },
      {
        n: "02",
        title: "Target the weakest round",
        body: "Preparation concentrates where you are losing rounds. There is no value in drilling problems you already solve well.",
      },
      {
        n: "03",
        title: "Practise and debrief",
        body: "Repeated sessions with written feedback after each, so progress is visible rather than assumed.",
      },
      {
        n: "04",
        title: "Prepare round by round",
        body: "As real interviews are scheduled, preparation shifts to the specific format and stage in front of you, with a debrief after each one.",
      },
    ],
    audience: [
      {
        title: "Reaching interviews but not offers",
        body: "Your profile is working and the conversations are happening, but rounds keep ending without progression.",
      },
      {
        title: "Returning after a gap",
        body: "You have not interviewed in years and the format, expectations, and pace have moved on since you last did.",
      },
      {
        title: "Moving up a level",
        body: "You are targeting a more senior role where the questions test judgement and trade-offs, not just implementation.",
      },
    ],
    faqs: [
      {
        question: "Are mock interviews conducted one-to-one?",
        answer:
          "Yes. Every session is one-to-one with a consultant who knows your background and target role. Written feedback follows each session.",
      },
      {
        question: "Do you guarantee I will pass my interviews?",
        answer:
          "Your engagement includes dedicated interview opportunities and recruiter networking, and we prepare you for them thoroughly. What no one can guarantee is the outcome of a specific interview or a particular offer — that decision belongs to the employer.",
      },
      {
        question: "Do you attend or assist during real interviews?",
        answer:
          "Never. We do not attend interviews, assessments, or any part of a hiring process on a candidate's behalf, in any form. Preparation happens before the interview, not during it.",
      },
    ],
    related: ["training-and-mentorship", "resume-and-linkedin"],
  },

  {
    slug: "resume-and-linkedin",
    navLabel: "Resume & Profile Building",
    metaTitle: "Resume, LinkedIn, GitHub and Portfolio",
    metaDescription:
      "ATS-friendly resume writing, LinkedIn optimization and management, GitHub optimization with real-world projects, and a personal portfolio website for technology professionals.",
    eyebrow: "Profile & Positioning",
    h1: {
      lead: "Resume, LinkedIn, GitHub",
      accent: "and Portfolio Building.",
    },
    intro: [
      "A strong background presented poorly reads as a weak background. Most candidates who go quiet after applying are not being rejected on merit — they are being filtered before a person ever reads the document.",
      "We rebuild how your experience is presented everywhere a recruiter looks: an ATS-friendly resume, a LinkedIn profile we optimize and manage, a GitHub backed by real-world projects, and a personal portfolio website that ties it all together. Every claim stays something you can defend when an interviewer probes it.",
    ],
    serviceType: [
      "Resume writing and ATS optimization",
      "LinkedIn profile optimization",
      "Portfolio website development",
    ],
    includes: [
      {
        title: "Resume and ATS optimization",
        body: "Structure, language, and keyword coverage tuned for applicant tracking systems and the humans who read afterwards — drawn from real postings in your domain rather than generic templates.",
      },
      {
        title: "LinkedIn optimization and management",
        body: "Headline, summary, experience framing, and skills rewritten around the signals recruiters actually filter and search on — then actively managed throughout your search.",
      },
      {
        title: "GitHub optimization and real-world projects",
        body: "A clean, professional GitHub profile and guided real-world projects in your target stack — work you understand end to end and can explain with confidence.",
      },
      {
        title: "Personal portfolio website",
        body: "Your own professional website, designed and built for you, bringing your experience, projects, and skills together in one link you can share on every application.",
      },
    ],
    process: [
      {
        n: "01",
        title: "Read what you have",
        body: "We review your current resume and profile against the postings you are actually pursuing, and identify where the mismatch sits.",
      },
      {
        n: "02",
        title: "Rebuild the narrative",
        body: "Same experience, described the way your target roles describe it — with specifics that survive scrutiny instead of adjectives that do not.",
      },
      {
        n: "03",
        title: "Build the evidence",
        body: "LinkedIn, GitHub, projects, and your portfolio website are brought in line with the resume, so the story is consistent wherever a recruiter encounters you.",
      },
      {
        n: "04",
        title: "Adjust on evidence",
        body: "As responses come in, we revise based on what is actually happening rather than assumptions.",
      },
    ],
    audience: [
      {
        title: "Applying without responses",
        body: "Volume is high, replies are not. Usually a screening and positioning problem rather than a qualifications problem.",
      },
      {
        title: "Changing domain",
        body: "Your experience is relevant but does not look relevant on paper to the roles you are now targeting.",
      },
      {
        title: "Nothing to show",
        body: "You have the skills but no projects, GitHub activity, or portfolio that proves them to a hiring team.",
      },
    ],
    faqs: [
      {
        question: "Do I need to send a resume before contacting you?",
        answer:
          "No. Begin by booking a consultation and sharing your current profile, goals, target role, and expectations. We will guide you through the next steps.",
      },
      {
        question: "Will you add skills or experience I do not have?",
        answer:
          "No. We represent your experience accurately. Nothing is invented, inflated, or reframed into something you cannot defend in an interview — that fails at the first technical question and damages your credibility.",
      },
    ],
    related: ["candidate-marketing", "interview-preparation"],
  },

  {
    slug: "candidate-marketing",
    navLabel: "Profile Marketing",
    metaTitle: "Profile Marketing and Daily Applications",
    metaDescription:
      "Profile marketing for technology professionals targeting US roles — 40+ targeted job applications every day, recruiter outreach, and weekly reports on applications and responses.",
    eyebrow: "Marketing & Visibility",
    h1: {
      lead: "Profile Marketing and",
      accent: "Daily Applications.",
    },
    intro: [
      "Applying through job boards puts you in the same queue as everyone else, evaluated on the same thirty-second scan. Visibility with the people actually filling roles is a different channel, and most candidates never work it deliberately.",
      "Our team submits 40+ targeted applications for you every working day, runs professional outreach to recruiters hiring in your domain, and reports back weekly — so your search keeps moving while you focus on training and interviews.",
    ],
    serviceType: [
      "Candidate marketing",
      "Job application services",
      "Recruiter outreach",
    ],
    includes: [
      {
        title: "40+ targeted applications daily",
        body: "Applications submitted every working day to roles matched to your skills, level, and target domain — chosen for fit, not sprayed at every opening.",
      },
      {
        title: "Recruiter networking support",
        body: "Targeted outreach, professional messaging, and disciplined follow-up that builds visibility with recruiters working on roles in your domain.",
      },
      {
        title: "Weekly application reports",
        body: "Where you have applied, which recruiters have responded, and what is scheduled — tracked so the strategy can be adjusted on evidence.",
      },
      {
        title: "Pre-placement support",
        body: "Help through the final stretch: offer conversations, documentation, background checks, notice periods, and the questions worth asking before accepting.",
      },
    ],
    process: [
      {
        n: "01",
        title: "Agree the positioning",
        body: "You approve how your profile is presented before any outreach happens. Nothing goes out that you have not seen.",
      },
      {
        n: "02",
        title: "Apply every day",
        body: "40+ targeted applications each working day to roles that match your domain and level.",
      },
      {
        n: "03",
        title: "Reach out and follow up",
        body: "Professional, targeted messages to recruiters with disciplined follow-up — persistent without becoming the candidate people stop replying to.",
      },
      {
        n: "04",
        title: "Track and adjust",
        body: "Responses are tracked so the strategy shifts based on what is landing, not on assumptions about what should.",
      },
    ],
    audience: [
      {
        title: "Strong profile, no visibility",
        body: "Your experience holds up well, but the right people are not seeing it.",
      },
      {
        title: "No time to apply",
        body: "You are working or studying full time and cannot sustain the daily applications and follow-up a search actually requires.",
      },
      {
        title: "Unsure where to focus",
        body: "You are applying broadly without a clear view of which roles and channels are worth the effort.",
      },
    ],
    faqs: [
      {
        question: "Do you apply to jobs on my behalf?",
        answer:
          "Yes. Our team submits 40+ targeted applications every working day to roles that match your profile. You approve your resume and target roles before anything is sent, and you receive a weekly report of every application and response.",
      },
      {
        question: "Do you have partnerships with specific companies?",
        answer:
          "We commit to dedicated interview opportunities and active recruiter networking, worked continuously rather than stopped after a set number of applications. We do not claim partnerships with, or guaranteed placement at, any named company — hiring decisions rest with employers.",
      },
    ],
    related: ["resume-and-linkedin", "interview-preparation"],
  },

  {
    slug: "training-and-mentorship",
    navLabel: "Training & Mentorship",
    metaTitle: "Technology Career Training and Mentorship",
    metaDescription:
      "Role-specific technical and behavioral training with one-to-one mentorship for professionals targeting US technology roles — hands-on, project-based, and built around real job descriptions.",
    eyebrow: "Training & Mentorship",
    h1: {
      lead: "Domain Training and",
      accent: "Career Mentorship.",
    },
    intro: [
      "Generic courses teach a syllabus. Preparing for a specific role means depth in the areas that role actually assesses, and the ability to talk about your work credibly when questioned.",
      "Training is built around the job descriptions you are pursuing. Alongside it, a named consultant stays with you through the search — for the decisions that come up between formal sessions, and after you start the new role.",
    ],
    serviceType: [
      "Technology training",
      "Career mentorship",
      "Project guidance",
    ],
    includes: [
      {
        title: "Role-specific technical training",
        body: "Hands-on training in the technologies, tools, and practices that appear in the job descriptions you are actually pursuing — not a fixed curriculum.",
      },
      {
        title: "Software application and project guidance",
        body: "Guidance on building work worth discussing: scope, architecture, and explaining your decisions clearly when an interviewer probes them.",
      },
      {
        title: "One-to-one mentorship",
        body: "A consistent point of contact who knows your history and goals, available for the decisions that arise between the formal sessions.",
      },
      {
        title: "Behavioral interview training",
        body: "Structured answers for experience, situational, and motivation questions, plus the communication style expected on US technology teams.",
      },
    ],
    process: [
      {
        n: "01",
        title: "Map the gap",
        body: "We compare your current depth against what your target roles assess, and name the difference honestly.",
      },
      {
        n: "02",
        title: "Sequence the work",
        body: "Highest-impact areas first, so preparation time goes where it changes outcomes rather than where it is comfortable.",
      },
      {
        n: "03",
        title: "Build something real",
        body: "Practical work you can discuss with confidence, guided so it holds up to technical questioning.",
      },
      {
        n: "04",
        title: "Keep the thread",
        body: "The same consultant stays with you through interviews, offer decisions, and the first months of the new role.",
      },
    ],
    audience: [
      {
        title: "Switching domain",
        body: "You are moving into a new technology area and need to close a real skills gap, not just relabel your resume.",
      },
      {
        title: "Self-taught and unsure",
        body: "You have learned independently and want an honest read on whether your depth matches the roles you are targeting.",
      },
      {
        title: "Deciding what comes next",
        body: "You want a considered view of the direction to take, from someone who knows your background.",
      },
    ],
    faqs: [
      {
        question: "Is this a course with a fixed syllabus?",
        answer:
          "No. Training is shaped around your target role and the gaps found during your assessment. Two candidates with the same job title often need very different work.",
      },
      {
        question: "How long does training take?",
        answer:
          "It depends on your starting point, target role, and the time you can commit each week. Your consultant will set a realistic rhythm during the assessment. We do not promise a fixed timeline or a placement date.",
      },
    ],
    related: ["interview-preparation", "candidate-marketing"],
  },
];

export const servicePageBySlug = (slug: string) =>
  servicePages.find((p) => p.slug === slug);
