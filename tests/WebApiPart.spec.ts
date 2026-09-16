import { test, expect, request, chromium, Locator, Page } from '@playwright/test';
import { ApiUtils } from "../Utils/ApiUtils";

let loginPayload = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };
let orderCreationPayLoad = { orders: [{ country: "United States", productOrderedId: "6960ea76c941646b7a8b3dd5" }] };
let response: any;
test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderCreationPayLoad);

})


test("WebApp testing API", { tag: "@ss" }, async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const procductEx: string = "iphone 13 pro";
    await page.locator("button.btn.btn-custom").filter({ hasText: "ORDERS" }).click();
    
    const row = page.locator("tbody tr").filter({
        has: page.locator("th", { hasText: response.orderId })
    });
    await row.getByRole("button", { name: "View" }).click();
    await page.pause();
    has: page.locator("th", { hasText: response.orderId })
    await expect(page.getByText(response.orderId)).toHaveText(response.orderId);
    await page.getByRole('button', { "name": ' Sign Out ' }).click();

})
