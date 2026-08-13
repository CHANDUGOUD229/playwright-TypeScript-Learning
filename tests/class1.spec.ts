import { test, expect, chromium, Locator } from '@playwright/test';

test.only("first class", { tag: '@qa' }, async () => {

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


test.only("autowait checking...", { tag: '@qaq' }, async ({ page, browser, browserName }) => {

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator("input#userEmail").fill("anshika@gmail.com");
    await page.locator("input#userPassword").fill("Iamking@000");
    await page.locator("input#login").click();
    await page.locator("div.card-body b").first().waitFor();
    console.log(await page.locator("div.card-body b").allTextContents());


})