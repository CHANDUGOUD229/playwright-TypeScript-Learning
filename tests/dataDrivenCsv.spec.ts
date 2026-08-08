import { test, expect, Locator} from "@playwright/test";
import fs from 'fs';
import { parse } from "csv-parse/sync"

//Reading data from CSV
const csvPath = "testData/testdata.csv";
const fileContent = fs.readFileSync(csvPath, "utf-8");
const records = parse(fileContent,
    {
        columns: true,
        skip_empty_lines: true
    });


test.describe("Login data driven testing CSV file", async () => {

    for (const data of records) {

        test(`login test using csv file ${data.email} and ${data.pwd}`, async ({ page }) => {

            await page.goto("https://demowebshop.tricentis.com/login");
            await page.locator("#Email").fill(data.email);
            await page.locator("#Password").fill(data.pwd);
            await page.locator("input.login-button").click();

            if (data.validity.toLowerCase() === "valid") {
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

