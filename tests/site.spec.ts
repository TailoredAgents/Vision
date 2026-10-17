import { expect, test } from "@playwright/test";

const publicRoutes = [
  "/", "/properties", "/properties/ridgewalk-professional-center", "/services", "/services/landlord-seller-representation", "/services/tenant-buyer-representation", "/services/advisory", "/about", "/team", "/team/david-hacker", "/insights", "/insights/what-to-verify-before-signing-a-commercial-lease", "/contact", "/privacy",
];

test("public routes render one heading, canonical metadata, and no browser errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  for (const route of publicRoutes) {
    const response = await page.goto(route, { waitUntil: "networkidle" });
    expect(response?.ok(), route).toBeTruthy();
    await expect(page.locator("h1"), route).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]'), route).toHaveCount(1);
    const width = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
    expect(width.scroll, `horizontal overflow on ${route}`).toBeLessThanOrEqual(width.client + 1);
  }
  expect(errors).toEqual([]);
});

test("home imagery loads as the page is explored", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const images = page.locator("img");
  for (let index = 0; index < await images.count(); index += 1) {
    const current = images.nth(index);
    await current.scrollIntoViewIfNeeded();
    await expect.poll(() => current.evaluate((image) => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0)).toBe(true);
  }
  const failed = await page.locator("img").evaluateAll((images) => images.filter((image) => !(image as HTMLImageElement).complete || (image as HTMLImageElement).naturalWidth === 0).map((image) => (image as HTMLImageElement).src));
  expect(failed).toEqual([]);
});

test("property explorer filters without inventing live status", async ({ page }) => {
  await page.goto("/properties");
  await expect(page.getByText("8 illustrative properties")).toBeVisible();
  await page.locator("select").first().selectOption("Industrial");
  await expect(page.getByText("2 illustrative properties")).toBeVisible();
  await expect(page.getByText("North Georgia Logistics Center")).toBeVisible();
  await expect(page.getByText("I-575 Commerce Park")).toBeVisible();
});

test("admin pages redirect unauthenticated visitors", async ({ page }) => {
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/admin\/login/);
  await expect(page.getByRole("heading", { name: "Welcome back." })).toBeVisible();
});

test("contact form fails honestly when storage is not configured", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel("Name *").fill("Test User");
  await page.getByLabel("Email *").fill("test@example.com");
  await page.getByLabel("How can we help? *").fill("This is a local verification message only.");
  await page.getByRole("button", { name: "Send inquiry" }).click();
  await expect(page.getByRole("status")).toContainText("being configured");
});
