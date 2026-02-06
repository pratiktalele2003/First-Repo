import { Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto('https://www.flipkart.com/', { waitUntil: 'domcontentloaded' });
  }

  async search(query: string): Promise<void> {
    await this.page.getByPlaceholder('Search for Products, Brands and More').fill(query);
    await this.page.getByPlaceholder('Search for Products, Brands and More').press('Enter');
    await this.page.waitForLoadState('domcontentloaded');
  }
}
