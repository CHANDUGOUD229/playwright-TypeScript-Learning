import { test, expect, Locator, Page, chromium, FrameLocator, firefox, webkit } from "@playwright/test";

let page: Page;


test.beforeAll("open App", async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('https://www.naukri.com/');

})

test.afterAll("close the browser", async () => {
    await page.close();
})

test.beforeEach("login App", async () => {
    await page.getByRole('link', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Email ID / Username' }).fill('chandu96qa@outlook.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('9542427545');
    // await page.waitForTimeout(5000);
    await page.getByRole('button', { name: 'Login', exact: true }).click();

})

test.afterEach("Logout App", async () => {
    await page.getByRole('button', { name: 'Open profile menu' }).click();
    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(page.getByRole('link', { name: 'Naukri.com' }).first()).toBeVisible();

})

test.describe("myGroup", async () => {

    test("view profile", async () => {
        await page.getByRole('link', { name: 'View profile' }).click();

    })

    test("edit option", async () => {
        await expect(page.getByRole('link', { name: 'View profile' })).toBeVisible();
        await page.getByRole('link', { name: 'View profile' }).dblclick();
        await expect(page.getByText('Selenium WebDriverTestngBDD')).toBeVisible();
        // await page.locator('#lazyKeySkills').getByText('editOneTheme').dblclick();

    })

})

// test("view profile", async () => {
//     await page.getByRole('link', { name: 'View profile' }).click();

// })

// test("edit option", async () => {
//     await expect(page.getByRole('link', { name: 'View profile' })).toBeVisible();
//     await page.getByRole('link', { name: 'View profile' }).dblclick();
//     await expect(page.getByText('Selenium WebDriverTestngBDD')).toBeVisible();
//     // await page.locator('#lazyKeySkills').getByText('editOneTheme').dblclick();

// })