import { test, expect, BrowserContext, chromium, Locator, request } from '@playwright/test';
import path from 'node:path';

let webContext: any;
test.beforeAll(async ({ browser }) => {
    let context = await browser.newContext({viewport:{width:1920,height:1000}});
    const page = await context.newPage();
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await page.getByPlaceholder("Username").fill("Admin");
    await page.getByPlaceholder("Password").fill("admin123");
    await page.getByRole('button', { name: ' Login ' }).click();
    await context.storageState({ path: 'orang.json' });
    webContext = await browser.newContext({ storageState: "orang.json" });


})

test("validation", async () => {
    const page = await webContext.newPage();
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
    await page.getByRole('link', { name: 'Admin' }).click();
    await page.getByRole('link', { name: 'PIM' }).click();
    await page.getByRole('button', { name: ' Add' }).click();
    await page.getByRole('textbox', { name: 'First Name' }).fill('test');
    await page.getByRole('textbox', { name: 'Middle Name' }).fill('test23');
    await page.getByRole('textbox', { name: 'Last Name' }).click();
    await page.getByRole('textbox', { name: 'Last Name' }).fill('34');
    await page.getByRole('button', { name: 'Save' }).click();
});


test("validation test 1", async () => {
    const page = await webContext.newPage();
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
    await page.getByRole('link', { name: 'Admin' }).click();
    await page.getByRole('link', { name: 'PIM' }).click();
    await page.getByRole('button', { name: ' Add' }).click();
    await page.getByRole('textbox', { name: 'First Name' }).fill('test');
    await page.getByRole('textbox', { name: 'Middle Name' }).fill('test23');
    await page.getByRole('textbox', { name: 'Last Name' }).click();
    await page.getByRole('textbox', { name: 'Last Name' }).fill('34');
    await page.getByRole('button', { name: 'Save' }).click();
});


test("validation test 2", async () => {
    const page = await webContext.newPage();
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
    await page.getByRole('link', { name: 'Admin' }).click();
    await page.getByRole('link', { name: 'PIM' }).click();
    await page.getByRole('button', { name: ' Add' }).click();
    await page.getByRole('textbox', { name: 'First Name' }).fill('test');
    await page.getByRole('textbox', { name: 'Middle Name' }).fill('test23');
    await page.getByRole('textbox', { name: 'Last Name' }).click();
    await page.getByRole('textbox', { name: 'Last Name' }).fill('34');
    await page.getByRole('button', { name: 'Save' }).click();
});

test("validation test3 ", async () => {
    const page = await webContext.newPage();
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index");
    await page.getByRole('link', { name: 'Admin' }).click();
    await page.getByRole('link', { name: 'PIM' }).click();
    await page.getByRole('button', { name: ' Add' }).click();
    await page.getByRole('textbox', { name: 'First Name' }).fill('test');
    await page.getByRole('textbox', { name: 'Middle Name' }).fill('test23');
    await page.getByRole('textbox', { name: 'Last Name' }).click();
    await page.getByRole('textbox', { name: 'Last Name' }).fill('34');
    await page.getByRole('button', { name: 'Save' }).click();
});
