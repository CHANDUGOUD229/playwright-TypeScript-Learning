// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';
import { off } from 'cluster';
import dotenv from 'dotenv';
import path from 'path';

// Load environment-specific variables (e.g., .env.staging, .env.prod)
dotenv.config({
  path: path.resolve(__dirname, `.env.${process.env.ENV || 'staging'}`),
});

export default defineConfig({
  // ---- Test discovery ----
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  outputDir: './test-results',
  

  // ---- Timeouts ----
  timeout: 30 * 1000,          // max time per test
  expect: {
    timeout: 5 * 1000,         // max time for each `expect()` assertion
  },

  // ---- Execution behavior ----
  fullyParallel: true,                        // run tests in files in parallel
  forbidOnly: !!process.env.CI,                // fail build if test.only left in code
  retries: process.env.CI ? 2 : 0,             // retry flaky tests only on CI
  workers: process.env.CI ? 4 : undefined,     // limit workers on CI, auto-detect locally

  // ---- Reporting ----
  reporter: [
    ['list'],                                             // readable console output
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],  // for CI dashboards (Jenkins, Azure DevOps)
    ['json', { outputFile: 'test-results/results.json' }],
  ],

  // ---- Shared settings for all projects ----
  use: {
    baseURL: process.env.BASE_URL || 'https://demowebshop.tricentis.com',

    trace: 'retain-on-failure',      // capture trace only when a test fails
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    actionTimeout: 10 * 1000,        // max time for a single action (click, fill, etc.)
    navigationTimeout: 15 * 1000,    // max time for page.goto()

    ignoreHTTPSErrors: true,
    headless: process.env.CI ? true : false,
    viewport: { width: 1366, height: 768 },
  },

  // ---- Cross-browser / cross-device projects ----
  projects: [
    {
      name: 'chromium',
      use: { browserName:'chromium',
        headless:false,
        screenshot:'off',
        trace:'on',
        ignoreHTTPSErrors:true,
        permissions:['geolocation'],
        ...devices['iPhone 11 Pro'],
        viewport:{width:1020,height:900}
      
      },
      
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 7'] },
    },
    {
      name: 'api-tests',
      testDir: './tests/api',
      use: {
        baseURL: process.env.API_BASE_URL || 'https://api.example.com',
      },
    },
  ],

  // ---- Local dev server (optional — spins up app before tests) ----
  webServer: process.env.CI
    ? undefined // in CI, app is usually already deployed
    : {
        command: 'npm run start',
        url: 'http://localhost:3000',
        reuseExistingServer: true,
        timeout: 60 * 1000,
      },
});