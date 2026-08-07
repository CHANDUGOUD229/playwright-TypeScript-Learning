import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  // Global timeout for each test  by chandra
  timeout: 60 * 1000,

  // Timeout for expect assertions by chandra
  expect: {
    timeout: 10 * 1000,
  },

  // Execute tests in parallel
  fullyParallel: false,

  // Prevent accidental test.only in CI
  forbidOnly: !!process.env.CI,

  // Retry failed tests in CI
  // retries: process.env.CI ? 2 : 0,

  // Retry failed tests in local by chandra
  retries:3,

  // Number of workers
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html'],
    ['list']
    // ['json', { outputFile: 'test-results/results.json' }],
    // ['junit', { outputFile: 'test-results/results.xml' }]
  ],

  use: {
    headless: false,

    // Launch browser maximized
    viewport: null,

    launchOptions: {
      args: ['--start-maximized'],
      slowMo: 0
    },

    actionTimeout: 15000,

    navigationTimeout: 30000,

    screenshot: 'only-on-failure',  //by chandra

    video: 'retain-on-failure',     // by chandra

    trace: 'retain-on-failure',     // by chandra

    ignoreHTTPSErrors: true,

    acceptDownloads: true,

    testIdAttribute: 'data-pw',

    // baseURL: 'https://yourapplication.com'
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    // Uncomment when needed
    // {
    //   name: 'firefox',
    //   use: {
    //     ...devices['Desktop Firefox'],
    //   },
    // },

    // {
    //   name: 'webkit',
    //   use: {
    //     ...devices['Desktop Safari'],
    //   },
    // },
  ],

  outputDir: 'test-results/',
});