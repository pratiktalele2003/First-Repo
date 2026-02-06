import { Page, Locator } from '@playwright/test';

export class SearchResultsPage {
  constructor(private page: Page) {}

  async openProduct(index: number): Promise<Page> {
    const product: Locator = this.page.locator('.pIpigb').nth(index);
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      product.click()
    ]);
    await newPage.waitForLoadState('domcontentloaded');
    return newPage;
  }
}
