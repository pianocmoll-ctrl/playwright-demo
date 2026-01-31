import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 240000,
  expect: {
    timeout: 5000,
  },
  reporter: [['html'], ['github']],
  use: {
    headless: true,
    actionTimeout: 0,
    trace: 'on-first-retry',
        // global screenshot policy:
    // 'off' - never capture automatically
    // 'only-on-failure' - capture when a test fails
    // 'on' - always capture after each test
    screenshot: 'only-on-failure',
    //fullPage: true,
    viewport: { width: 1280, height: 720 },
    // you can also enable video: 'on' | 'retain-on-failure' | 'off'
    // video: 'retain-on-failure',
  },
});