import { test, expect, BrowserContext, chromium, Locator, request } from '@playwright/test';


test("E2E test by test abort", { tag: "@ss" }, async () => {
    let browser = await chromium.launch();
    let context = await browser.newContext();
    const page = await context.newPage();
    await page.route("**/*{jpg,png,jpeg}", route => route.abort()); //abort network calls

    page.on("request", request => console.log(request.url()));
    page.on("response", response => console.log(response.url(),response.status()));

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    await page.getByPlaceholder("email@example.com").fill("anshika@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
    await page.locator("input#login").click();
    await page.waitForURL(
        "https://rahulshettyacademy.com/client/#/dashboard/dash"
    );
    await page.pause();
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
