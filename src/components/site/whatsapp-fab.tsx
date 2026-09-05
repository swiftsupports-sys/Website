import { WhatsAppIcon } from "@/components/site/brand";
import { hasWhatsApp, whatsappLink } from "@/lib/site";

/**
 * Floating WhatsApp action. Rendered on every page; the label collapses to the
 * icon alone on small screens so it never crowds the content.
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
      className="fixed right-4 bottom-4 z-70 flex items-center gap-2.5 rounded-full bg-[#25D366] p-3.5 font-display text-[0.9rem] font-bold text-[#062d12] shadow-[0_12px_34px_rgb(37_211_102/0.4)] transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgb(37_211_102/0.55)] sm:right-7 sm:bottom-7 sm:py-3 sm:pr-5 sm:pl-3.5"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 animate-wa-pulse rounded-full border-2 border-[#25D366]"
      />
      <WhatsAppIcon className="relative size-6.5" />
      <span className="relative hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
