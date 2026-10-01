import { expect, test } from "@playwright/test";

import { hasWhatsApp } from "@/lib/site";

const pages = [
  { path: "/", heading: /Build Your Career at/i },
  { path: "/about", heading: /More Than Job Search Support/i },
  { path: "/services", heading: /Career Services Designed/i },
  { path: "/how-it-works", heading: /A Clear Path Toward/i },
  { path: "/domains", heading: /Support Across/i },
  { path: "/pricing", heading: /Choose the Support Model/i },
  { path: "/success-stories", heading: /Career Progress Starts With/i },
  { path: "/contact", heading: /Let's Build/i },
  { path: "/services/interview-preparation", heading: /Interview Preparation/i },
  { path: "/services/resume-and-linkedin", heading: /LinkedIn Optimization/i },
  { path: "/services/candidate-marketing", heading: /Recruiter Networking/i },
  { path: "/services/training-and-mentorship", heading: /Career Mentorship/i },
  { path: "/privacy-policy", heading: /Privacy Policy/i },
  { path: "/terms", heading: /Terms of Service/i },
  { path: "/service-agreement", heading: /Service Agreement/i },
];

test.describe("every page renders", () => {
  for (const page_ of pages) {
    test(`${page_.path} has its heading and chrome`, async ({ page }) => {
      await page.goto(page_.path);
      await expect(page.getByRole("heading", { level: 1 })).toContainText(
        page_.heading,
      );
      await expect(page.getByRole("contentinfo")).toBeVisible();

      // The floating button is hidden while no WhatsApp number is configured,
      // so assert whichever state the config actually calls for.
      const fab = page.getByRole("link", { name: /chat with us on whatsapp/i });
      if (hasWhatsApp) {
        await expect(fab).toBeVisible();
      } else {
        await expect(fab).toHaveCount(0);
      }
    });
  }
});

test("primary navigation reaches the pricing page", async ({ page, isMobile }) => {
  await page.goto("/");

  if (isMobile) {
    await page.getByRole("button", { name: /open menu/i }).click();
    await page.getByRole("dialog").getByRole("link", { name: "Pricing" }).click();
  } else {
    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Pricing" }).click();
  }

  await expect(page).toHaveURL(/\/pricing$/);
  await expect(page.getByText("$2.5K")).toBeVisible();
  await expect(page.getByText("$10K")).toBeVisible();
});

test("the FAQ accordion opens an answer", async ({ page }) => {
  await page.goto("/");
  // `click()` scrolls and retries on its own, which survives the element being
  // replaced during hydration.
  const question = page.getByRole("button", { name: /do you guarantee job placement/i });
  await expect(question).toBeVisible();
  await question.click();
  await expect(page.getByText(/We guarantee our work/i).first()).toBeVisible();
});

test("the consultation form reports validation errors", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: /request a free consultation/i }).click();

  await expect(page.getByText(/please enter your full name/i)).toBeVisible();
  await expect(page.getByText(/please enter your email address/i)).toBeVisible();
  await expect(page.getByText(/please confirm we may contact you/i)).toBeVisible();
});

test("a complete consultation request reaches the server action", async ({ page }) => {
  await page.goto("/contact");

  await page.getByLabel("Full Name").fill("Priya Raman");
  await page.getByLabel("Email Address").fill("priya.raman@example.com");
  await page.getByLabel("Phone / WhatsApp Number").fill("+1 (555) 240-1180");

  await page.locator("#experience").click();
  await page.getByRole("option", { name: "5–8 years" }).click();

  await page.locator("#domain").click();
  await page.getByRole("option", { name: "Data Analytics & Data Engineering" }).click();

  await page.getByRole("checkbox").click();
  await page.getByRole("button", { name: /request a free consultation/i }).click();

  // A production build fails closed when credentials are missing, in the same
  // order the server action checks them: spam verification, then delivery.
  // Nothing is ever silently swallowed.
  if (!process.env.TURNSTILE_SECRET_KEY) {
    await expect(page.getByText(/could not verify your browser session/i)).toBeVisible();
  } else if (!process.env.RESEND_API_KEY || !process.env.CONSULTATION_FROM) {
    await expect(page.getByText(/temporarily unavailable/i)).toBeVisible();
  } else {
    // Fully configured: the form is replaced by a confirmation panel, so no
    // stale values or errors can survive a successful submission.
    await expect(page.getByText(/request received/i)).toBeVisible();
    await expect(page.getByLabel("Full Name")).toBeHidden();
  }
});

test("sitemap and robots are served", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  expect(await sitemap.text()).toContain("/pricing");

  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBeTruthy();
  expect(await robots.text()).toContain("Sitemap:");
});

test("the mobile drawer closes when a link is tapped", async ({ page, isMobile }) => {
  // The hamburger only exists below xl; on the desktop project there is
  // nothing to test.
  test.skip(!isMobile, "mobile layout only");

  await page.goto("/");
  await page.getByRole("button", { name: /open menu/i }).click();

  const drawer = page.getByRole("dialog");
  await expect(drawer).toBeVisible();

  await drawer.getByRole("link", { name: /^Services$/ }).first().click();

  // App Router navigations do not unmount the sheet, so without an explicit
  // close the page changes behind an open drawer with the body still
  // scroll-locked — which looks to a visitor like the menu doing nothing.
  await expect(page).toHaveURL(/\/services$/);
  await expect(drawer).toBeHidden();
  await expect
    .poll(() => page.evaluate(() => getComputedStyle(document.body).overflow))
    .not.toBe("hidden");
});

test("the drawer closes when tapping the page you are already on", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "mobile layout only");

  await page.goto("/pricing");
  await page.getByRole("button", { name: /open menu/i }).click();

  const drawer = page.getByRole("dialog");
  await expect(drawer).toBeVisible();

  // The route does not change here, so the pathname effect cannot fire —
  // the link's own handler has to close it.
  await drawer.getByRole("link", { name: /^Pricing$/ }).first().click();
  await expect(drawer).toBeHidden();
});
