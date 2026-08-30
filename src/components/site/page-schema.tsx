import { breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd, webPageJsonLd } from "@/lib/structured-data";

/**
 * WebPage + BreadcrumbList markup for a standard inner page.
 *
 * The breadcrumb mirrors the trail already rendered in `PageHero`, so the
 * markup never describes navigation a visitor cannot see.
 */
export function PageSchema({
  name,
  description,
  path,
  breadcrumb,
}: {
  name: string;
  description: string;
  path: string;
  /** Label shown as the current page in the breadcrumb trail. */
  breadcrumb: string;
}) {
  return (
    <JsonLd
      data={[
        webPageJsonLd({ name, description, path }),
        breadcrumbJsonLd([{ name: breadcrumb, path }]),
      ]}
    />
  );
}
