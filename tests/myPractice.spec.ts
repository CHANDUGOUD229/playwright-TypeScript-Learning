import { test, Browser, chromium } from "@playwright/test";

test("practice", async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("");
})