import { test, expect } from '@playwright/test';


test.describe('Home Page E2E Tests', () => {


    test('test case 1', async ({ page }) => {

        await page.goto("https://demoqa.com/automation-practice-form");

        await page.waitForTimeout(5000);
        console.log('test case 1');

    });

    test('test case 2', async ({ page }) => {
        console.log('test case 2');

    });

    test('test case 3', async ({ page }) => {
        console.log('test case 3');
    });

    // Add more test cases as needed
});