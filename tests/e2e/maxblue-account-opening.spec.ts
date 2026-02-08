import { test, expect, request } from '@playwright/test';
import fs from 'fs';
import { getNetworkPayload} from '../../src/utils/read-network-data';

test.describe('MaxBlue Account Opening Test', () => {
  test('should display personal data form after selection', async ({ page }) => {
    const url = 'https://www.maxblue.de/opra4x/public/maxblue/security-account-opening/#/page-1-0?restartApplication=true&pageName=Kostenloses%20Wertpapierdepot%20von%20maxblue%20&pageUrl=https:%2F%2Fwww.deutsche-bank.de%2Fpk%2Fsparen-und-anlegen%2Fgeldanlage-online%2Fdepot.html&topic=neutral&businessUnit=Privatkunden&source=PWS%20PFB-Portal';
    await page.goto(url);
    await page.waitForLoadState('networkidle');

    try {
      const consentButton = page.getByRole('button', { name: /Zustimmen mit Zusammenführung/i });
      await consentButton.waitFor({ timeout: 5000 });
      await consentButton.click();
    } catch (error) {
      console.log('Consent popup did not appear or was already dismissed');
    }

    const payloadPromise = getNetworkPayload(page, '/address');

    await page.locator("//span[text()='Nein, noch nicht']").click({ timeout: 15000 });
    await page.getByRole('button', { name: 'Weiter' }).click();
    await page.locator('.ml-2 > .db-radio-button__label > .db-radio-button__indicator > .db-radio-button__indicator-dot > svg > circle').click();
    await page.getByRole('textbox', { name: 'Vorname(n)' }).fill('ssss');
    await page.getByRole('textbox', { name: 'Nachname' }).fill('xxxx');
    await page.getByLabel('Familienstand').selectOption('003_geschieden');
    await page.getByRole('textbox', { name: 'Geburtsdatum (TT.MM.JJJJ)' }).fill('19.11.1965');
    await page.getByRole('textbox', { name: 'Geburtsort' }).fill('Hamburg');
    await page.getByText('Ich bin ausschließlich in').click();
    await page.getByRole('textbox', { name: 'Straße und Hausnummer' }).fill('Musterstr. 220');
    await page.getByRole('textbox', { name: 'PLZ' }).fill('20144');
    await page.getByRole('textbox', { name: 'Stadt' }).fill('Hamburg');
    await page.getByText('Werderstr. 220, 20144 Hamburg').click();
    await page.getByRole('textbox', { name: 'Mobilnummer (z.B. +' }).fill('+491729875675');
    await page.getByRole('textbox', { name: 'E-Mail' }).fill('dasdasd@gmail.com');
    await page.getByRole('button', { name: 'Weiter', exact: true }).click();

    const payload = await payloadPromise;
    console.log('Intercepted Address Data:', payload);
    fs.writeFileSync('payload.json', JSON.stringify(payload, null, 2));
  });

  test('should show error for invalid email', async ({ page }) => {
    const url = 'https://www.maxblue.de/opra4x/public/maxblue/security-account-opening/#/page-1-0?restartApplication=true&pageName=Kostenloses%20Wertpapierdepot%20von%20maxblue%20&pageUrl=https:%2F%2Fwww.deutsche-bank.de%2Fpk%2Fsparen-und-anlegen%2Fgeldanlage-online%2Fdepot.html&topic=neutral&businessUnit=Privatkunden&source=PWS%20PFB-Portal';
    await page.goto(url);
    await page.waitForLoadState('networkidle');

    try {
      const consentButton = page.getByRole('button', { name: /Zustimmen mit Zusammenführung/i });
      await consentButton.waitFor({ timeout: 5000 });
      await consentButton.click();
    } catch {}

    await page.locator("//span[text()='Nein, noch nicht']").click({ timeout: 15000 });
    await page.getByRole('button', { name: 'Weiter' }).click();
    await page.locator('.ml-2 > .db-radio-button__label > .db-radio-button__indicator > .db-radio-button__indicator-dot > svg > circle').click();
    await page.getByRole('textbox', { name: 'Vorname(n)' }).fill('Max');
    await page.getByRole('textbox', { name: 'Nachname' }).fill('Mustermann');
    await page.getByLabel('Familienstand').selectOption('001_ledig');
    await page.getByRole('textbox', { name: 'Geburtsdatum (TT.MM.JJJJ)' }).fill('01.01.1990');
    await page.getByRole('textbox', { name: 'Geburtsort' }).fill('Berlin');
    await page.getByText('Ich bin ausschließlich in').click();
    await page.getByRole('textbox', { name: 'Straße und Hausnummer' }).fill('Teststr. 1');
    await page.getByRole('textbox', { name: 'PLZ' }).fill('10115');
    await page.getByRole('textbox', { name: 'Stadt' }).fill('Berlin');
    await page.getByText('Teststr. 1, 10115 Berlin').click();
    await page.getByRole('textbox', { name: 'Mobilnummer (z.B. +' }).fill('+491234567890');
    await page.getByRole('textbox', { name: 'E-Mail' }).fill('invalid-email');
    await page.getByRole('button', { name: 'Weiter', exact: true }).click();

    await expect(page.locator('text=Bitte geben Sie eine gültige E-Mail-Adresse ein')).toBeVisible();
  });

  test('should require mandatory fields', async ({ page }) => {
    const url = 'https://www.maxblue.de/opra4x/public/maxblue/security-account-opening/#/page-1-0?restartApplication=true&pageName=Kostenloses%20Wertpapierdepot%20von%20maxblue%20&pageUrl=https:%2F%2Fwww.deutsche-bank.de%2Fpk%2Fsparen-und-anlegen%2Fgeldanlage-online%2Fdepot.html&topic=neutral&businessUnit=Privatkunden&source=PWS%20PFB-Portal';
    await page.goto(url);
    await page.waitForLoadState('networkidle');

    try {
      const consentButton = page.getByRole('button', { name: /Zustimmen mit Zusammenführung/i });
      await consentButton.waitFor({ timeout: 5000 });
      await consentButton.click();
    } catch {}

    await page.locator("//span[text()='Nein, noch nicht']").click({ timeout: 15000 });
    await page.getByRole('button', { name: 'Weiter' }).click();
    await page.locator('.ml-2 > .db-radio-button__label > .db-radio-button__indicator > .db-radio-button__indicator-dot > svg > circle').click();
    // Leave all fields empty and try to proceed
    await page.getByRole('button', { name: 'Weiter', exact: true }).click();

    await expect(page.locator('text=Bitte füllen Sie dieses Feld aus')).toBeVisible();
  });
});