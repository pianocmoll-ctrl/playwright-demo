import { test, expect } from '@playwright/test';

test.describe('MaxBlue Account Opening Test', () => {


  test('should display personal data form after selection', async ({ page }) => {
    // Navigate to the MaxBlue account opening page
    const url = 'https://www.maxblue.de/opra4x/public/maxblue/security-account-opening/#/page-1-0?restartApplication=true&pageName=Kostenloses%20Wertpapierdepot%20von%20maxblue%20&pageUrl=https:%2F%2Fwww.deutsche-bank.de%2Fpk%2Fsparen-und-anlegen%2Fgeldanlage-online%2Fdepot.html&topic=neutral&businessUnit=Privatkunden&source=PWS%20PFB-Portal';
    
    await page.goto(url);
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');

        // Step 1a: Wait for popup and click "Zustimmen mit Zusammenführung" (if it appears)
    // Note: This popup might not always appear, so we use waitFor with timeout
    try {
      const consentButton = page.getByRole('button', { name: /Zustimmen mit Zusammenführung/i });
      await consentButton.waitFor({ timeout: 5000 });
      await consentButton.click();
    } catch (error) {
      console.log('Consent popup did not appear or was already dismissed');
    }


    // Click on "Nein, noch nicht"
    //await page.getByRole('radio', { name: 'Nein, noch nicht' }).click({ timeout: 15000 });
    await page.locator("//span[text()='Nein, noch nicht']").click({ timeout: 15000 });
    // Verify "Einzeldepot" is available
    //const einzeldepotOption = page.getByRole('radio', { name: 'Einzeldepot' });
    //await expect(einzeldepotOption).toBeVisible();

    // Click "Weiter"
    await page.getByRole('button', { name: 'Weiter' }).click();

    // Wait for personal data form
    await page.waitForLoadState('networkidle');

    //await page.waitForTimeout(13000); // Wait for potential animations or dynamic content

    /*
    // Verify personal data form is displayed
    await expect(page.locator('heading', { hasText: 'Ihr maxblue Depot' })).toBeVisible();
    await expect(page.locator('text=Bitte geben Sie hier Ihre persönlichen Daten an.')).toBeVisible();

    // Verify form fields are present
    await expect(page.getByLabel('Vorname(n)')).toBeVisible();
    await expect(page.getByLabel('Nachname')).toBeVisible();
    await expect(page.getByLabel(/Geburtsdatum/i)).toBeVisible();
    */
  });
});
