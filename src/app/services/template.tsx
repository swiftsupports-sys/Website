import { PageTransition } from "@/components/site/page-transition";

/**
 * The root template only remounts when the first path segment changes, so
 * moving between /services and a service page needs its own.
 */
export default function ServicesTemplate({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
