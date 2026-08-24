import { test, expect, chromium, Locator, Page, request } from '@playwright/test';
import { text } from 'node:stream/consumers';

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
    await username.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
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
                .locator("text= Add to Cart")
                .click();
            break;
        }

    }
    await expect(page.locator("button[routerlink='/dashboard/cart'] label")).toHaveText("1");
    await page.locator("button[routerlink='/dashboard/cart']").click({ timeout: 4000 });
    await expect(page.locator(".heading.cf h1")).toHaveText("My Cart");
    await expect(page.locator("div.cartSection h3")).toHaveText(expected, { timeout: 3000 });
    await page.getByRole("button", { 'name': "Checkout" }).click();
    await expect(page.locator(".payment__type.payment__type--cc.active")).toHaveText("Credit Card");
    await expect(page.locator("div.item__title")).toHaveText("iphone 13 pro");
    await page
        .locator("div.field.small")
        .filter({ hasText: "CVV Code" })
        .locator("input")
        .fill("754");

    await page.getByPlaceholder("Select Country").pressSequentially("ind", { delay: 150 });
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

test("playwright special locator", async ({ page }) => {
    test.setTimeout(6000);
    page.setDefaultTimeout(8000); //test level
    page.setDefaultNavigationTimeout(4000);
    const slowExpect = expect.configure({ timeout: 6000 });// test level wait
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByPlaceholder("Password").fill("Automation");
    await page.getByLabel("Check me out if you Love IceCreams!").check();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByRole('button', { name: 'Submit' }).click();
    const SuccessText = page.getByText("Success! The Form has been submitted successfully!.");
    await slowExpect(SuccessText).toBeVisible({ timeout: 5000 });//step level timeout
    await page.waitForTimeout(5000);
    await page.getByRole('link', { name: "Shop" }).click();
    await page.locator("app-card").filter({ hasText: "Nokia Edge" }).getByRole('button').click();

})



test("E2E test by generic", { tag: "@ss" }, async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.getByPlaceholder("email@example.com").fill("anshika@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
    await page.locator("input#login").click();
    const procductEx: string = "iphone 13 pro";

    await page.locator("div.card-body").filter({ hasText: procductEx }).getByRole('button', { name: "Add to Cart" }).click();

    await page.waitForLoadState("networkidle");

    await expect(page.locator("button[routerlink='/dashboard/cart'] label")).toHaveText("1");
    await page.getByRole("listitem").getByRole("button", { name: "Cart" }).click();
    await expect(page.locator(".heading.cf h1")).toHaveText("My Cart");

    await expect(page.locator("div.cartSection h3")).toHaveText(procductEx, { timeout: 3000 });
    await page.getByRole("button", { 'name': "Checkout" }).click();

    await expect(page.locator(".payment__type.payment__type--cc.active")).toHaveText("Credit Card");
    await expect(page.locator("div.item__title")).toHaveText(procductEx);
    await page
        .locator("div.field.small")
        .filter({ hasText: "CVV Code" })
        .locator("input")
        .fill("754");

    await page.getByPlaceholder("Select Country").pressSequentially("ind", { delay: 150 });
    await page.getByRole('button', { name: "India" }).nth(1).click();


    await page.locator("input[name='coupon']").fill("rahulshetty");
    await page.getByRole('button', { 'name': "Apply Coupon" }).click();
    await expect(page.getByText("* Invalid Coupon")).toHaveText("* Invalid Coupon");
    await page.locator(".btnn.action__submit.ng-star-inserted").click();
    await expect(page.getByText("iphone 13 pro")).toHaveText(procductEx);
    const orderId = await page.locator("label.ng-star-inserted").textContent();
    const actualOrderId: any = orderId?.replace(/^\s*\|\s*|\s*\|\s*$/g, "");

    console.log(actualOrderId);
    await page.getByText(" Orders History Page ").click();

    const row = page.locator("tbody tr").filter({
        has: page.locator("th", { hasText: actualOrderId })
    });
    await row.getByRole("button", { name: "View" }).click();


    await expect(page.getByText(actualOrderId)).toHaveText(actualOrderId);
    await page.getByRole('button', { "name": ' Sign Out ' }).click();

    await page.waitForTimeout(5000);



})



async function login(
    page: Page,
    username: string,
    password: string
): Promise<void> {

    await page.getByPlaceholder("you@email.com").fill(username);
    await page.getByLabel("Password").fill(password);
    await page.locator("#login-btn").click();
}

let requestPayload = {
    email: "playwrightAutomation22211@gmail.com",
    password: "Ch@ndra2026"
}
let eventhub_token: any;
test.beforeAll(async () => {
    const apiContext = await request.newContext();
    let responsePayload = await apiContext.post("https://api.eventhub.rahulshettyacademy.com/api/auth/login",
        {
            data: requestPayload
        });
    const responseJson = await responsePayload.json();
    eventhub_token = responseJson.token;
    console.log("Status:", responsePayload.status());
    console.log("token  ==>>  ",eventhub_token);
    console.log(responseJson);

})


test("Book event task1", async ({ page }) => {

    await page.addInitScript((tokenValue) => {
        window.localStorage.setItem("eventhub_token", tokenValue);
    }, eventhub_token);



    await page.goto("https://eventhub.rahulshettyacademy.com");
    // await login(page, "playwrightAutomation22211@gmail.com", "Ch@ndra2026");


    const storedToken = await page.evaluate(() => {
        return window.localStorage.getItem("eventhub_token");
    });

    console.log("Stored token:", storedToken);
    console.log("Current URL:", page.url());


    let date = Date.now();
    let celebName: string = "QA Team lunch Party" + date;
    await expect(page.getByText("Browse Events →")).toBeVisible();
    await page.getByRole('button', { name: 'Admin' }).click();
    await page.getByRole('navigation').getByRole('link', { name: 'Manage Events' }).click();
    await page.locator("#event-title-input").fill(celebName);
    await page.getByPlaceholder("Describe the event…").fill("After long time have a dinner with all the QA people");
    await page.getByLabel("Category").selectOption("Concert");
    await page.getByLabel("City").fill("hyderabad");
    await page.getByLabel("Venue").fill("DLF street Hotel");
    await page.getByLabel("Event Date & Time").fill("2026-08-29T14:03");
    await page.getByLabel("Price ($)").fill('4500');
    let seats = page.getByLabel("Total Seats");
    await seats.fill('50');
    const seatCounts = Number(await seats.inputValue());
    await page.getByRole('button', { name: '+ Add Event' }).click();
    await page.locator("#nav-events").click();
    await page.locator("article#event-card").first().waitFor();
    let cards: Locator = page.locator("article#event-card").filter({ hasText: celebName });
    let card = await cards.isVisible();
    expect(card).toBeTruthy();
    let seatsCount: any = await page.locator("article#event-card").filter({ hasText: celebName }).locator("span.text-xs.font-semibold.text-emerald-600").textContent();
    console.log(seatsCount);
    const seatCountInt = parseInt(seatsCount, 10);
    if (seatCountInt === seatCounts) {
        console.log("sucssfully created events");
    }
    await page.getByText(celebName).click();
    // const BookTickets = await page.getByText("Book Tickets").first().isVisible();
    // await expect(BookTickets).toBeTruthy();
    let count = await page.locator("#ticket-count").textContent();
    const Numtickets = parseInt(count ?? "0", 10);
    expect(Numtickets).toBe(1);
    await page.getByPlaceholder("Your full name").fill("Automation Testing");
    await page.getByPlaceholder("you@email.com").fill("test@gmail.com");
    await page.getByPlaceholder("+91 98765 43210").fill("7854875487");
    await page.locator("#confirm-booking").click();
    let confirm = page.getByText("confirmed").isVisible();
    expect(confirm).toBeTruthy();
    await page.locator("#nav-events").click();
    await expect(seatCountInt - 1).toBe(49);



})

test("validate toBeHidden toBeVisible goBack goForward ", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://www.google.com/");
    // await page.goBack();
    // await page.goForward();

    const txtBox = page.locator("#displayed-text");
    await expect(txtBox).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(txtBox).toBeHidden();


})

test("handle popups", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    page.on("dialog", dialog => dialog.dismiss());
    // page.on("dialog", dialog => dialog.accept());
    page.on("dialog", dialog => dialog.defaultValue());
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
    const frame = page.frameLocator("#courses-iframe");
    frame.locator("li a[href*='lifetime-access']:visible").click();
    await page.waitForTimeout(5000);


})