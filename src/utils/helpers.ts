import { Page } from "playwright";



export async function doScreenshot(screenShotName: string, testInfo: any, page: Page) {

    //await page.waitForTimeout(2000);
    const elementPath = testInfo.outputPath(screenShotName + '.png');
    await page.locator('form').screenshot({ path: elementPath });
    // attach the screenshot to the test so the HTML report shows it
    testInfo.attachments.push({
        name: 'home-form-element',
        path: elementPath,
        contentType: 'image/png',
    });

    //await page.waitForTimeout(1000);


}

