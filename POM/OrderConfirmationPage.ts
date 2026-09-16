import { Page, Locator } from '@playwright/test';

export class OrderConfirmationPage {
  readonly page: Page;
  readonly orderIdLabel: Locator;
  readonly orderHistoryLink: Locator;

  constructor(page: Page) {
    this.page = page;
      this.orderIdLabel = page.locator("label.ng-star-inserted");
    this.orderHistoryLink = page.getByText(" Orders History Page ");
  }
 productTitle(productName: string) {
    return this.page.getByText(productName);
}

confirmedProductTitle(productName: string) {
    return this.productTitle(productName);
}

  async getOrderId(): Promise<string> {
    const text = await this.orderIdLabel.textContent();
    return (text ?? "").replace(/^\s*\|\s*|\s*\|\s*$/g, "");
  }

  async goToOrderHistory() {
    await this.orderHistoryLink.click();
  }
}