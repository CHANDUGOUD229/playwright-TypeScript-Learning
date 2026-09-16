import { Page, Locator } from "@playwright/test";

export class OrdersPage {
    readonly page: Page;
    readonly cvvCode: Locator;
    readonly selectCountry: Locator;
    readonly paymentType: Locator;
    readonly itemTitle: Locator;
    readonly couponInput: Locator;
    readonly applyCouponBtn: Locator;
    readonly invalidCouponMessage: Locator;
    readonly placeOrderBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cvvCode = page
            .locator("div.field.small")
            .filter({ hasText: "CVV Code" })
            .locator("input");
        this.selectCountry = page.getByPlaceholder("Select Country");
        this.paymentType = page.locator(".payment__type.payment__type--cc.active");
        this.itemTitle = page.locator("div.item__title");
        this.couponInput = page.locator("input[name='coupon']");
        this.applyCouponBtn = page.getByRole('button', { name: "Apply Coupon" });
        this.invalidCouponMessage = page.getByText("* Invalid Coupon");
        this.placeOrderBtn = page.locator(".btnn.action__submit.ng-star-inserted");
    }

    countryOption(optionText: string): Locator {
        return this.page.getByRole('button', { name: optionText }).nth(1);
    }

    async placeOrder(cvv: string, country: string, option: string) {
        await this.cvvCode.fill(cvv);
        await this.selectCountry.pressSequentially(country, { delay: 150 });
        await this.countryOption(option).click();
    }

    async applyCoupon(couponCode: string) {
        await this.couponInput.fill(couponCode);
        await this.applyCouponBtn.click();
    }

    async submitOrder() {
        await this.placeOrderBtn.click();
    }
}