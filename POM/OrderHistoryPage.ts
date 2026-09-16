import { Page, Locator } from '@playwright/test';

export class OrderHistoryPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private orderRow(orderId: string): Locator {
    return this.page.locator("tbody tr").filter({
      has: this.page.locator("th", { hasText: orderId }),
    });
  }

  async viewOrder(orderId: string) {
    await this.orderRow(orderId).getByRole("button", { name: "View" }).click();
  }

  orderIdOnDetailsPage(orderId: string): Locator {
    return this.page.getByText(orderId);
  }
}