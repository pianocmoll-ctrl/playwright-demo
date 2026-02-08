import { Page, request, Request } from "playwright";
import * as fs from "fs";

const allPayloads: any[] = [];




/**
 * Sets up a listener for a specific network request and returns the JSON payload.
 * @param {import('@playwright/test').Page} page
 * @param {string} urlPart - Part of the URL to match
 * @param {string} method - HTTP method (default: 'POST')
 * @returns {Promise<any>} - The parsed JSON payload
 */
export async function getNetworkPayload(page: Page, urlPart: string, method: string = 'POST') {
  const request = await page.waitForRequest(req => 
    req.url().includes(urlPart) && req.method() === method
  );
  
  return request.postDataJSON();
}