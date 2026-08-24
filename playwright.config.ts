import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout:40*1000,
  expect:{timeout:40*1000},
  reporter:'html',
  use:{

    actionTimeout:10*10000,//it will wait each and evvery action
    navigationTimeout:10*10000, //it will wait for navigaition
    browserName:'chromium',
    headless:true,
    screenshot:'only-on-failure',
    video:'retain-on-failure',
    trace:'retain-on-failure'

  }
  
});



