import { test, expect } from '@playwright/test';

test('login and navigate routes', async ({ page, request }) => {
  // obtain token via API request (server-side, bypasses CORS)
  const authRes = await request.post('http://localhost/MIS/MIS/Backend/auth.php', {
    data: { username: 'admin', password: 'admin' },
  });

  const authBody = await authRes.json();
  expect(authBody.token).toBeTruthy();


  // seed localStorage before loading the app using addInitScript
  const userString = JSON.stringify(authBody.user).replaceAll("'", "\\'");
  const script = `window.localStorage.setItem('token', '${authBody.token}'); window.localStorage.setItem('user', '${userString}');`;
  await page.addInitScript({ content: script });

  // load the app (baseURL configured in playwright.config.mjs)
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Monitoring KPI/ })).toBeVisible({ timeout: 10000 });

  // navigate to /input and /monitoring
  await page.goto('/input');
  await expect(page.getByRole('heading', { name: 'Input KPI' })).toBeVisible();

  await page.goto('/monitoring');
  await expect(page.getByRole('heading', { name: /Multi Server Monitoring/ })).toBeVisible();
});
