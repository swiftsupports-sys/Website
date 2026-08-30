import { expect, test } from "@playwright/test";

const pages = [
  { path: "/", heading: /Build Your Career at/i },
  { path: "/about", heading: /More Than Job Search Support/i },
  { path: "/services", heading: /Career Services Designed/i },
  { path: "/how-it-works", heading: /A Clear Path Toward/i },
  { path: "/domains", heading: /Support Across/i },
  { path: "/pricing", heading: /Choose the Support Model/i },
  { path: "/success-stories", heading: /Career Progress Starts With/i },
  { path: "/contact", heading: /Let's Build/i },
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
      await expect(
        page.getByRole("link", { name: /chat with us on whatsapp/i }),
      ).toBeVisible();
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
  await expect(page.getByText(/We do not guarantee jobs, offers/i).first()).toBeVisible();
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
