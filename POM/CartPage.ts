import { Page, Locator } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartHeading: Locator;
  readonly productTitleInCart: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartHeading = page.getByText("My Cart");
    this.productTitleInCart = page.locator("div.cartSection h3");
    this.checkoutButton = page.getByRole("button", { 'name': "Checkout" });
  }

  async checkOutProduct() {
    await this.checkoutButton.click();
  }
}