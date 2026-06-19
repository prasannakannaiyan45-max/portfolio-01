import { test } from '@playwright/test';

test('log errors', async ({ page }) => {
  page.on('console', msg => {
    console.log(`[BROWSER CONSOLE ${msg.type()}]: ${msg.text()}`);
  });

  page.on('pageerror', exception => {
    console.log(`[BROWSER UNCAUGHT EXCEPTION]: ${exception.message}`);
    console.log(exception.stack);
  });

  page.on('requestfailed', request => {
    console.log(`[BROWSER REQUEST FAILED]: ${request.url()} - ${request.failure().errorText}`);
  });

  console.log('Navigating to website...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 10000 });
  console.log('Page loaded. Waiting...');
  await page.waitForTimeout(3000);
});
