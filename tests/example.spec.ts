import { test, expect } from '@playwright/test';

test('basic test example', async ({ page }) => {
    await page.goto('https://example.com');
    const title = await page.title();
    expect(title).toBe('Example Domain');
    
    const heading = await page.locator('h1').textContent();
    expect(heading).toBe('Example Domain');
    
    const moreInfoLink = page.locator('a');
    await moreInfoLink.click();
    await expect(page).toHaveURL('https://www.iana.org/domains/example');
});