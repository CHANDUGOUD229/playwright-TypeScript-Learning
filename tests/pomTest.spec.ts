import { test, expect } from '@playwright/test';   // fixed: was 'playwright/test'
import { POMManager } from "../POM/POMManager";      // fixed: typo "POMManger" -> "POMManager"
import placeOrderTestData from "../Utils/placeOrderTestData.json";
const data = JSON.parse(JSON.stringify(placeOrderTestData));

for(let dataSet of data){
test(`e2e application ${dataSet.productId}`, async ({ page }) => {

    // const url: string = "https://rahulshettyacademy.com/client/#/auth/login";
    // const userName: string = "anshika@gmail.com";
    // const password: string = "Iamking@000";
    // const productEx: string = "iphone 13 pro";
    // const cvv = "745";
    // const country = 'ind';
    // const option = 'India';
    // const couponCode = 'rahulshetty';

    const pom = new POMManager(page);

    // ---- Login ----
    await pom.getLoginPage().goTo();
    await pom.getLoginPage().login(dataSet.userName, dataSet.password);

    // ---- Add to cart ----
    await pom.getDashBoardPage().addToCart(dataSet.productId);

    // ---- Cart page ----
    await expect(pom.getCartPage().cartHeading).toHaveText("My Cart");
    await expect(pom.getCartPage().productTitleInCart).toHaveText(dataSet.productId, { timeout: 3000 });
    await pom.getCartPage().checkOutProduct();

    // ---- Orders / payment page ----
    await expect(pom.getOrderPage().paymentType).toHaveText("Credit Card");
    await expect(pom.getOrderPage().itemTitle).toHaveText(dataSet.productId);

    await pom.getOrderPage().placeOrder(dataSet.cvv, dataSet.country, dataSet.option);

    await pom.getOrderPage().applyCoupon(dataSet.couponCode);
    await expect(pom.getOrderPage().invalidCouponMessage).toHaveText("* Invalid Coupon");

    await pom.getOrderPage().submitOrder();

    // ---- Order confirmation ----
    await expect(pom.getOrderConfirmationPage().confirmedProductTitle(dataSet.productId)).toHaveText(dataSet.productId);
    const orderId = await pom.getOrderConfirmationPage().getOrderId();

    // ---- Order history ----
    await pom.getOrderConfirmationPage().goToOrderHistory();
    await pom.getOrderHistoryPage().viewOrder(orderId);
    await expect(pom.getOrderHistoryPage().orderIdOnDetailsPage(orderId)).toHaveText(orderId);

    // ---- Sign out ----
    await pom.getDashBoardPage().signOut();
});
};