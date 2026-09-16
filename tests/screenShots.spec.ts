import { expect, test } from "@playwright/test";


test("full and partial screenshot..", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator("#displayed-text").screenshot({ path: "ElementScreen.png" });
    await page.screenshot({ path: "fullPage.png" });

});


test("visual testing", async ({ page }) => {

    await page.goto("https://webmail.mailngx.com/satincorp.net/");
    expect(await page.screenshot()).not.toMatchSnapshot("landingPage.png");

})