export const authFixture = async ({ page }) => {
    // Set up authentication context
    await page.goto('https://example.com/login');
    await page.fill('input[name="username"]', 'testuser');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    
    // Wait for navigation after login
    await page.waitForNavigation();
    
    // Return the authenticated page context
    return page;
};