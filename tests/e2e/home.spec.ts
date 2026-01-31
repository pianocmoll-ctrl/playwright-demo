import { test, expect } from '@playwright/test';
import { doScreenshot } from '../../src/utils/helpers';


test.describe('Home Page E2E Tests', () => {


    test('test case 1', async ({ page }, testInfo) => {

        await page.goto("https://demoqa.com/automation-practice-form");
        await page.waitForTimeout(3000);

        await page.getByRole('textbox', { name: 'First Name' }).fill('Sascha');
        await page.getByRole('textbox', { name: 'Last Name' }).fill('Baumann');
        await page.getByRole('textbox', { name: 'name@example.com' }).fill('sascha.baumann@yahoo.com');
        await page.getByText('Male', { exact: true }).click();
        await page.getByRole('textbox', { name: 'Current Address' }).fill('Königstr. 1 , Stuttgart');
        await page.locator('.css-19bqh2r').first().click();
        await page.getByText('Haryana', { exact: true }).click();
        await page.getByRole('textbox', { name: 'Mobile Number' }).fill('0176859734');
        await page.locator('.subjects-auto-complete__value-container').click();


        await doScreenshot('form-filled', testInfo, page);
        await page.getByRole('button', { name: 'Submit' }).click();
        await doScreenshot('form-filled-submit', testInfo, page);

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