import { expect, BrowserContext, chromium, Locator, request } from '@playwright/test';
import { test } from "../Utils/fixture";

test("fixtures demo", async ({ authenticatedPage,createOrder }) => {
    const procductEx: string = "iphone 13 pro";
    await authenticatedPage.goto("https://rahulshettyacademy.com/client");
    await authenticatedPage.locator("button.btn.btn-custom").filter({ hasText: "ORDERS" }).click();

    const row = authenticatedPage.locator("tbody tr").filter({
        has: authenticatedPage.locator("th", { hasText: createOrder.orderId })
    });
    await row.getByRole("button", { name: "View" }).click();
    
    
});