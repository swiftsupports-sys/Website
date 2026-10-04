import { WhatsAppIcon } from "@/components/site/brand";
import { hasWhatsApp, whatsappLink } from "@/lib/site";

/**
 * Floating WhatsApp action. Rendered on every page; the label collapses to the
 * icon alone on small screens so it never crowds the content. Deliberately
 * quiet — a white button with a hairline border, no pulse or glow.
 *
 * Renders nothing while no WhatsApp number is configured. Unlike the inline
 * contact entries, which degrade to plain text, this is a large tappable
 * button — leaving it visible but inert would invite a tap that does nothing.
 * It returns automatically once `whatsappNumber` is set in site.ts.
 */
export function WhatsAppFab() {
  if (!hasWhatsApp) return null;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener"
      aria-label="Chat with us on WhatsApp"
      className="fixed right-4 bottom-4 z-70 flex items-center gap-2.5 rounded-md border border-border bg-surface p-3 text-[0.9375rem] font-medium text-brand-navy shadow-overlay transition-colors duration-200 hover:border-brand-blue-border hover:bg-brand-blue-light sm:right-6 sm:bottom-6 sm:px-4"
    >
      {/* WhatsApp's own green stays on the mark only, so it reads as the
          service it opens rather than as a brand colour. */}
      <WhatsAppIcon className="size-5.5 text-[#128C7E]" />
      <span className="hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
