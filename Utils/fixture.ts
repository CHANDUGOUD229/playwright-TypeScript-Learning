import { test as base, Page, APIRequestContext } from '@playwright/test';
import { ApiUtils } from "./ApiUtils";

const loginPayload = { userEmail: "anshika@gmail.com", userPassword: "Iamking@000" };
const orderCreationPayLoad = {
  orders: [{ country: "United States", productOrderedId: "6960ea76c941646b7a8b3dd5" }]
};

type AuthFixtures = {
    authenticatedPage: Page;
    createOrder: any;
    testDataForOrder:any;
};

export const test = base.extend<AuthFixtures>({
    authenticatedPage: async ({ page }, use) => {
        await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
        await page.getByPlaceholder("email@example.com").fill("anshika@gmail.com");
        await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
        await page.locator("input#login").click();
        await use(page);
    },

    createOrder: async ({ request }: { request: APIRequestContext }, use:any) => {
        const apiUtils = new ApiUtils(request, loginPayload);
        const response = await apiUtils.createOrder(orderCreationPayLoad);
        await use(response);
    },
    testDataForOrder:{
        productName:"ADIDAS ORIGINAL"
    }
});

export { expect } from '@playwright/test';