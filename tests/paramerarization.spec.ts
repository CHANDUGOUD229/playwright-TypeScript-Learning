import { test, expect, Locator, Page, chromium, FrameLocator, firefox, webkit } from "@playwright/test";

//testdata
const searchItems: string[] = ["Loptop", "Gift card", "smartphone", "monitor"];

// using for -of loop

/*
for(let item of searchItems)
{
test(`Auto waiting and forcing ${item}`, async ({ page }) => {
    
    await page.goto("https://demowebshop.tricentis.com/");
    await expect(page).toHaveURL("https://demowebshop.tricentis.com/", { timeout: 10000 });
    await expect(page.locator("#small-searchterms")).toBeVisible({ timeout: 10000 });//assertion time out
    await page.locator("#small-searchterms").fill(item, { force: true });
    await page.locator("input.search-box-button").click({ force: true});
    await page.waitForTimeout(4000);

})
}
*/

// using for each loop

/*
searchItems.forEach((item)=> {
    test(`search test for ${item}`, async ({ page }) => {

        await page.goto("https://demowebshop.tricentis.com/");
        await expect(page).toHaveURL("https://demowebshop.tricentis.com/", { timeout: 10000 });
        await expect(page.locator("#small-searchterms")).toBeVisible({ timeout: 10000 });//assertion time out
        await page.locator("#small-searchterms").fill(item, { force: true });
        await page.locator("input.search-box-button").click({ force: true });
        await page.waitForTimeout(4000);

    })
})

*/

// describe
test.describe.fixme("searching for a item", async () => {

    searchItems.forEach((item) => {
        test(`search test for ${item}`, async ({ page }) => {

            await page.goto("https://demowebshop.tricentis.com/");
            await expect(page).toHaveURL("https://demowebshop.tricentis.com/", { timeout: 10000 });
            await expect(page.locator("#small-searchterms")).toBeVisible({ timeout: 10000 });//assertion time out
            await page.locator("#small-searchterms").fill(item, { force: true });
            await page.locator("input.search-box-button").click({ force: true });
            await page.waitForTimeout(4000);

        })
    })

})


const loginTestData: string[][] = [
    ["test@emanil.com", "wewr123", "invalid"],
    ["test123@emanil.com", "weytr123", "invalid"],
    ["laura.taylor1234@example.com", "test123", "valid"],
    ["", "", "invalid"],
];

for (let [Email, pwd, validmsg] of loginTestData) {

    test.describe("Login data driven testing", async () => {


        test(`login test${Email} and ${pwd}`, async ({ page }) => {

            await page.goto("https://demowebshop.tricentis.com/login");
            await page.locator("#Email").fill(Email);
            await page.locator("#Password").fill(pwd);
            await page.locator("input.login-button").click();

            if (validmsg.toLowerCase() === "valid") {
                let logout: Locator = page.locator("a[href='/logout']");
                await expect(logout).toBeVisible({ timeout: 5000 });
            }else{
            let error: Locator = page.locator("div.validation-summary-errors")
            await expect(error).toBeVisible({ timeout: 6000 });
            await expect(page).toHaveURL("https://demowebshop.tricentis.com/login");
            }
        })


    })

}

