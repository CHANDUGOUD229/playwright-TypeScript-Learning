import { test, expect, Locator, Page, chromium, FrameLocator, firefox, webkit } from "@playwright/test";

// test.describe.configure({mode: "serial"});
// test.describe.configure({mode: "parallel"});


test("launch google", async ({ page, browserName }) => {
    await page.goto("https://www.google.com/");

})


test("launch insta", async ({ page, browserName }) => {
    await page.goto("https://www.instagram.com/");

})

test("launch insta for slow", async ({ page, browserName }) => {
    test.slow(); // triple the default timeout but its not recomended
    await page.goto("https://www.instagram.com/");
})