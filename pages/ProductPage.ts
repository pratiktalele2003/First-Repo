import { Locator, Page } from '@playwright/test';
import { getAmount } from '../utils/helpers';

export class ProductPage {
  constructor(private page: Page) {}

  async addToCart(): Promise<void> {
    try {
      const addToCartBtn: Locator = this.page.locator("//button[contains(@class, 'IUmgrZ')]");
      await addToCartBtn.waitFor({ state: 'visible' });
      await addToCartBtn.click();
      await this.page.locator('.VYxWdo .oyozru').first().waitFor({ state: 'visible' });

    } catch (error) {
      console.error('Add to Cart failed:', error);
    }
  }

  async getTotalAmount(): Promise<number> {
    const text: string | null = await this.page.locator('.VYxWdo .oyozru').first().textContent();
    return getAmount(text || '');
  }

  async getPrice(): Promise<number> {
    const text: string | null = await this.page.locator('.Itm5h0 .Mmn1B1').first().textContent();
    return getAmount(text || '');
  }

  async getProtectionFee(): Promise<number> {
    const text: string | null = await this.page
      .locator('//*[@id="container"]/div/div[2]/div/div/div[2]/div[1]/div/div/div/div[3]/div[2]/span')
      .first()
      .textContent();
    return getAmount(text || '');
  }
}
