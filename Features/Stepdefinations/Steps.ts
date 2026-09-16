import { Given, When, Then, context } from "@cucumber/cucumber";
import { POMManager } from "../../POM/POMManager";
import { test, expect, chromium, Page } from "@playwright/test";



Given('a login to Ecommerce application with {string} and {string}', async function (username, Password) {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.pom = new POMManager(this.page);
    // ---- Login ----
    const loginPage = await this.pom.getLoginPage();
    await loginPage.goTo();
    await loginPage.login(username,Password);

});

When('add {string} to cart', async function (productId) {
    await this.pom.getDashBoardPage().addToCart(productId);


});

Then('validate {string} is displayed in the cart', async function (productId) {
    await expect(this.pom.getCartPage().cartHeading).toHaveText("My Cart");
    await expect(this.pom.getCartPage().productTitleInCart).toHaveText(productId);
    await this.pom.getCartPage().checkOutProduct();

});

When('enter valid details to place the order', async function () {
    await expect(this.pom.getOrderPage().paymentType).toHaveText("Credit Card");
    await this.pom.getOrderPage().placeOrder("548", "ind", "India");
    await this.pom.getOrderPage().applyCoupon("krish");
    await expect(this.pom.getOrderPage().invalidCouponMessage).toHaveText("* Invalid Coupon");
    await this.pom.getOrderPage().submitOrder();

});

Then('validate the order is prasent in an order history page', async function () {
    const orderId = await this.pom.getOrderConfirmationPage().getOrderId();
    await this.pom.getOrderConfirmationPage().goToOrderHistory();
    await this.pom.getOrderHistoryPage().viewOrder(orderId);
    await expect(this.getOrderHistoryPage().orderIdOnDetailsPage(orderId)).toHaveText(orderId);
    await this.pom.getDashBoardPage().signOut();

});