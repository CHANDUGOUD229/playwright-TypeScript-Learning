import { test, expect, Locator, Page, chromium, FrameLocator, firefox, webkit } from "@playwright/test";

let page: Page;

/*Annotations
   skip
   only
   fixme still is under progress same to skip the test
   fail
   slow
*/


test.beforeAll("open App", async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('https://www.naukri.com/');

})

test.afterAll("close the browser", async () => {
    await page.close();
})
/*
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

*/

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

test("view profile", async ({page,browserName}) => {
    test.skip(browserName==="chromium","test is skipped browsername firfox")
    await page.getByRole('link', { name: 'View profile' }).click();

})

test.skip("edit option", async () => {
    await expect(page.getByRole('link', { name: 'View profile' })).toBeVisible();
    await page.getByRole('link', { name: 'View profile' }).dblclick();
    await expect(page.getByText('Selenium WebDriverTestngBDD')).toBeVisible();
    // await page.locator('#lazyKeySkills').getByText('editOneTheme').dblclick();

})

test("launch app store", async ({page,browserName}) => {
    test.skip(browserName==="chromium","test is skipped browsername firfox")
    await page.goto("https://www.demoblaze.com/cart.html#");
})

test.fixme("launch google", async ({page,browserName}) => {
        await page.goto("https://www.google.com/");

})

test.fail("launch insta", async ({page,browserName}) => {
        await page.goto("https://www.instagram.com/");


})


test("launch insta for slow", async ({page,browserName}) => {
    test.slow(); // triple the default timeout but its not recomended
        await page.goto("https://www.instagram.com/");


})