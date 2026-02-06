import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
 
  reporter: [ ['line'], ['allure-playwright'] ],
  timeout : 120000,
  use: {
    screenshot:'on',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

  ],
});
