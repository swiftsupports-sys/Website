import { PageTransition } from "@/components/site/page-transition";

/** Remounts on every top-level navigation, which animates the page change. */
export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
