import { test, expect, Locator, Page, chromium, FrameLocator, firefox, webkit } from "@playwright/test";
import fs from 'fs';

//Reading data from JSON
const jsonpath = "testData/data.json";
const loginData:any = JSON.parse(fs.readFileSync(jsonpath, 'utf-8'));

test.describe("Login data driven testing json file", async () => {

    for (let {email, pwd, validity} of loginData) {

        test(`login test using json file ${email} and ${pwd}`, async ({ page }) => {

            await page.goto("https://demowebshop.tricentis.com/login");
            await page.locator("#Email").fill(email);
            await page.locator("#Password").fill(pwd);
            await page.locator("input.login-button").click();

            if (validity.toLowerCase() === "valid") {
                let logout: Locator = page.locator("a[href='/logout']");
                await expect(logout).toBeVisible({ timeout: 5000 });
            } else {
                let error: Locator = page.locator("div.validation-summary-errors")
                await expect(error).toBeVisible({ timeout: 6000 });
                await expect(page).toHaveURL("https://demowebshop.tricentis.com/login");
            }
        })

    }
});

