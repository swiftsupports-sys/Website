import { loadEnvConfig } from "@next/env";
import { defineConfig, devices } from "@playwright/test";

// Load .env files the way `next start` does, so the tests see the same
// configuration as the server they drive.
loadEnvConfig(process.cwd());

// End-to-end runs never deliver real email: the form test would mail the team
// inbox and bounce off example.com addresses. A blank sender makes delivery
// fail closed — for the web server (which inherits this environment) and the
// tests alike.
process.env.CONSULTATION_FROM = "";

const PORT = 3100;
const baseURL = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: { baseURL, trace: "on-first-retry" },
  projects: [
    // `channel: "chromium"` runs the full Chromium build in new headless mode,
    // which behaves like the browser real visitors use.
    { name: "chromium", use: { ...devices["Desktop Chrome"], channel: "chromium" } },
    { name: "mobile", use: { ...devices["Pixel 7"], channel: "chromium" } },
  ],
  webServer: {
    command: `npm run build && npm run start -- --port ${PORT}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
