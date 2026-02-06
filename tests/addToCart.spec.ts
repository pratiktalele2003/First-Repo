import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductPage } from '../pages/ProductPage';
import data from '../testdata/data.json';

test('Add to cart and validate order amount', async ({ page }) => {
  const home = new HomePage(page);
  const searchResults = new SearchResultsPage(page);

  await home.goto();
  await home.search(data.SearchTerm);

  // First product
  const newPage = await searchResults.openProduct(0);
  const productPage = new ProductPage(newPage);

  await productPage.addToCart();
  const totalAmount: number = await productPage.getTotalAmount();
  const dprice: number = await productPage.getPrice();
  console.log('First product total:', totalAmount);

  await newPage.close();

  // Second product
  const newPage1 = await searchResults.openProduct(1);
  const productPage1 = new ProductPage(newPage1);

  await productPage1.addToCart();
  const totalAmount1: number = await productPage1.getTotalAmount();
  let dprice1: number = await productPage1.getPrice();
  const ppfee1: number = await productPage1.getProtectionFee();

  dprice1 += dprice;
  const expectedTotal: number = dprice1 + ppfee1;

  await expect(expectedTotal).toBe(totalAmount1);
  console.log('Final total:', totalAmount1);

  await newPage1.close();
});
