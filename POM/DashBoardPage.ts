import { Page, Locator } from '@playwright/test';

export class DashBoardPage {
  readonly page: Page;
  readonly signOutBtn: Locator;
  readonly addToCartBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartBtn = page.getByRole("listitem").getByRole("button", { name: "Cart" });
    this.signOutBtn = page.getByRole('button', { name: ' Sign Out ' });
  }
   selectProduct(productId: string):Locator {
    return this.page.locator("div.card-body").filter({ hasText: productId }).getByRole('button', { name: "Add to Cart" });

  }
  async addToCart(productID: string) {
    await this.selectProduct(productID).click();
    await this.addToCartBtn.click();
  }

  async signOut() {
    await this.signOutBtn.click();
  }
}