import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv'
import path from 'path';

// Load variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  timeout: 240000,
  workers: 3,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  expect: {
    timeout: 5000,
  },
  reporter: [['html'], ['github']],
  use: {
    actionTimeout: 15000,
    navigationTimeout: 180000,
    headless: false,
    browserName: 'chromium',
    acceptDownloads: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    viewport: { width: 1920, height: 1080 },

    httpCredentials: {
      username: process.env.technical_test_user ?? '',
      password: process.env.technical_test_user_password ?? '',  
    },  
  },

  projects: [
    {
      name: 'Google Chrome',
      use: { 
        ...devices['Desktop Chrome'], 
        channel: 'chrome'
      },
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});