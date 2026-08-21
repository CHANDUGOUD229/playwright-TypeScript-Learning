import { test, expect, chromium, Locator, Page } from '@playwright/test';

test("first class", { tag: '@rer' }, async () => {

    // chrome plugins and cookies
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const username = page.locator("input#username");
    const password = page.locator("input#password");
    const login = page.locator("input#signInBtn");



    console.log(await page.title());
    await expect(page).toHaveURL("https://rahulshettyacademy.com/loginpagePractise/");
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
    await username.type("rahulshettyacademy ch");
    await password.type("Learning@830$3mK2");
    await login.click();
    const errorMsg: Locator = await page.locator("div.alert.alert-danger.col-md-12");
    await expect(errorMsg).toHaveText("Incorrect username/password.");
    // await expect(errorMsg).toContainText("Incorrect username/password.");
    await username.fill("", { timeout: 30000 });
    await username.fill("rahulshettyacademy", { timeout: 30000 });
    await password.fill("Learning@830$3mK2");
    await login.click();
    const element = page.locator("div.card-body a");
    // const ele = await element.first().textContent();
    // const ele2 = await element.last().textContent();
    // const ele3 = await element.nth(0).textContent();
    // console.log(ele,ele2,ele3);
    await page.waitForLoadState("networkidle");//by using networkidle or by using waitfor() we can wait for ele 
    const allEle = await element.allTextContents();// it return string of an array and it dont have auto waiting mechanism
    console.log(allEle);


    // await expect(element).toHaveText("iphone X");

    await page.waitForTimeout(5000);



})


test("autowait checking...", { tag: '@tes' }, async ({ page, browser, browserName }) => {

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("input#userEmail").fill("anshika@gmail.com");
    await page.locator("input#userPassword").fill("Iamking@000");
    await page.locator("input#login").click();
    await page.locator("div.card-body b").first().waitFor();
    console.log(await page.locator("div.card-body b").allTextContents());


})

test("UI controls...", { tag: '@qa' }, async ({ page, browser, browserName }) => {

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const username = page.locator("input#username");
    const password = page.locator("input#password");
    const login = page.locator("input#signInBtn");
    await username.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await login.click();

    const radioBtn = page.locator("label.customradio");
    await expect(radioBtn.first()).toBeChecked();

    const flag = await radioBtn.first().isChecked();
    // await page.pause();
    if (flag) {
        await radioBtn.last().click();
        await page.locator("button#okayBtn").click();
    } else {
        await radioBtn.first().click();
        await page.locator("button#okayBtn").click();

    }
    await expect(radioBtn.last()).toBeChecked();

    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption({ value: 'teach' });
    // await page.pause();
    await dropdown.selectOption("Consultant");
    const checkBox = await page.locator("input#terms");
    const ischeck = await checkBox.isChecked();
    if (!ischeck) {
        await checkBox.check();
    }
    await expect(checkBox).toBeChecked();
    await checkBox.uncheck();
    await expect(checkBox).not.toBeChecked();
    expect(await checkBox.isChecked()).toBeFalsy();

    const blnkTxt = page.locator("[href*='document']");
    await expect(blnkTxt).toHaveAttribute("class", "blinkingText");
})


test("Handling windows...", { tag: '@qa' }, async ({ browser, browserName }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const blnkTxt = page.locator("[href*='document']");
    const [newPage] = await Promise.all(
        [
            context.waitForEvent("page"),
            await blnkTxt.click()
        ]
    );


    //console.log(domain);
    await page.locator("#username").fill("chandra");
    console.log(await page.locator("#username").inputValue());//it will get the input text and form and select 
    console.log(await page.locator("#username").textContent());// reads the text inside an element 


});

test("E2E test", async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("input#userEmail").fill("anshika@gmail.com");
    await page.locator("input#userPassword").fill("Iamking@000");
    await page.locator("input#login").click();
    const products = page.locator("div.card-body");
    await products.first().waitFor();
    await page.waitForLoadState("networkidle");
    const expected: string = "iphone 13 pro";
    const count: number = await products.count();


    for (let i = 0; i < count; i++) {
        let actulTxt: string | null = await products
            .nth(i)
            .locator("b")
            .textContent();
        console.log(actulTxt);
        if (actulTxt === expected) {
            await products
                .nth(i)
                .locator(">button.btn.w-10.rounded")
                .click();
            break;
        }

    }
    await expect(page.locator("button[routerlink='/dashboard/cart'] label")).toHaveText("1");
    await page.locator("button[routerlink='/dashboard/cart']").click({ timeout: 4000 });
    await expect(page.locator(".heading.cf h1")).toHaveText("My Cart");
    await expect(page.locator("div.cartSection h3")).toHaveText(expected,{timeout:3000});
    await page.getByRole("button", { 'name': "Checkout" }).click();
    await expect(page.locator(".payment__type.payment__type--cc.active")).toHaveText("Credit Card");
    await expect(page.locator("div.item__title")).toHaveText("iphone 13 pro");
    await page
        .locator("div.field.small")
        .filter({ hasText: "CVV Code" })
        .locator("input")
        .fill("754");

    await page.getByPlaceholder("Select Country").pressSequentially("ind");
    const lists = page.locator("section.ta-results.list-group.ng-star-inserted button");
    await lists.first().waitFor();
    const coun = await lists.count();
    for (let i = 0; i < coun; i++) {
        let country = await lists.nth(i).locator("span").textContent();
        console.log(country);
        if (country?.trim() === "India") {
            await lists.nth(i).click();
            break;
        }

    }



    await page.locator("input[name='coupon']").fill("rahulshetty");
    await page.getByRole('button', { 'name': "Apply Coupon" }).click();
    await expect(page.getByText("* Invalid Coupon")).toHaveText("* Invalid Coupon");
    await page.locator(".btnn.action__submit.ng-star-inserted").click();
    await expect(page.getByText("iphone 13 pro")).toHaveText("iphone 13 pro");
    const orderId = await page.locator("label.ng-star-inserted").textContent();
    const actualOrderId: any = orderId?.replace(/^\s*\|\s*|\s*\|\s*$/g, "");

    console.log(actualOrderId);
    await page.getByText(" Orders History Page ").click();

    let rows = page.locator("tbody tr");
    await rows.first().waitFor();
    let c = await rows.count();
    for (let i = 0; i < c; i++) {
        let row = rows.nth(i);
        let expectedOrderId = await row.locator("th").textContent();
        console.log(expectedOrderId);
        console.log(`Actual:   [${actualOrderId}]`);
        console.log(`Expected: [${expectedOrderId}]`);
        if (expectedOrderId?.trim() === actualOrderId?.trim()) {
            await row.getByRole("button", { name: "View" }).click();
            break;
        }

    }
    await expect(page.getByText(actualOrderId)).toHaveText(actualOrderId);
    await page.getByRole('button', { "name": ' Sign Out ' }).click();

    await page.waitForTimeout(5000);



})