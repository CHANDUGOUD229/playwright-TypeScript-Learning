import { test, expect, request, chromium, Locator, Page } from '@playwright/test';

let loginPayload = {
    userEmail: "anshika@gmail.com",
    userPassword: "Iamking@000"
};

let orderCreationPayLoad = {
    orders: [
        {
            country: "United States",
            productOrderedId: "6960ea76c941646b7a8b3dd5"
        }
    ]
};
let token: any;
let orderId: any;
test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const loginResponce = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: loginPayload
        })
    expect((await loginResponce).ok()).toBeTruthy();
    const loginResponseJson = await loginResponce.json();
    token = loginResponseJson.token;
    console.log(token);


    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
        data: orderCreationPayLoad,
        headers: {
            'Authorization': token,
            'content-type': 'application/json'
        }
    })

    const Responsejson = await orderResponse.json();
    console.log(Responsejson);
    orderId = Responsejson.orders[0];


})

// test.beforeEach(() => {
//     {

//     }
// })

test.only("WebApp testing API", { tag: "@ss" }, async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const procductEx: string = "iphone 13 pro";



    await page.locator("button.btn.btn-custom").filter({hasText:"ORDERS"}).click();
    const row = page.locator("tbody tr").filter({
        has: page.locator("th", { hasText: orderId })
    });
    await row.getByRole("button", { name: "View" }).click();
    await page.pause();
    await expect(page.getByText(orderId)).toHaveText(orderId);
    await page.getByRole('button', { "name": ' Sign Out ' }).click();

})
