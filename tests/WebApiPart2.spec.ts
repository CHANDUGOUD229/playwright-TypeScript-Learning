import { test, expect, BrowserContext, chromium, Locator, request } from '@playwright/test';

let webContext: BrowserContext;

test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    await page.getByPlaceholder("email@example.com").fill("anshika@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
    await page.locator("input#login").click();
    await page.waitForURL(
        "https://rahulshettyacademy.com/client/#/dashboard/dash"
    );

    await expect(
        page.getByRole("button", { name: "ORDERS" })
    ).toBeVisible();
    await context.storageState({ path: "state.json" });
    webContext = await browser.newContext({ storageState: "state.json" });
})



test("E2E test by generic", { tag: "@ss" }, async () => {
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");

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
    // await page.getByRole('button', { "name": ' Sign Out ' }).click();

})




test("E2E test by Ecome", { tag: "@ss" }, async () => {
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");

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
})

test("E2E test", { tag: "@ss" }, async () => {
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");

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

});
