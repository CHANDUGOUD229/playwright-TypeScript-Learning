import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://quickresultonline.com/?dn=amzan.com&sksubid=35029&_slsen=0');
  await page.locator('[id="_ol_one_1785929897994420419"] iframe').contentFrame().getByText('amzan.com', { exact: true }).click();
  await page.goto('https://www.google.com/sorry/index?continue=https://www.google.com/search%3Fq%3Damazon%26oq%3Damazon%26gs_lcrp%3DEgZjaHJvbWUyBggAEEUYOdIBCDMyODBqMGo0qAIAsAIB%26sourceid%3Dchrome%26ie%3DUTF-8%26sei%3DtiBzaruAJZmQseMPwfGkqQI&q=EhAkCUDwZDgYMACFvQiQahzDGLbBzNMGIjApUqvsCLM4BmDP77c09Y0dO1H57FIxO0YJFosGVkTVCT40Qude2YEUy9xUWgqc8XUyAVJaAUM');
  await page.locator('iframe[name="a-ajqoeuge3zs2"]').contentFrame().getByRole('checkbox', { name: 'I\'m not a robot' }).click();
  await page.locator('iframe[name="c-ajqoeuge3zs2"]').contentFrame().locator('.rc-canonical-car').click();
  await page.goto('https://www.google.com/search?q=amazon&oq=amazon&gs_lcrp=EgZjaHJvbWUyBggAEEUYOdIBCDMyODBqMGo0qAIAsAIB&sourceid=chrome&ie=UTF-8&sei=tiBzaruAJZmQseMPwfGkqQI');
  await page.getByRole('link', { name: 'Amazon.in | Great Prices |' }).click();
  await page.getByRole('link', { name: 'Bestsellers' }).click();
  await page.locator('#B0H7S6LT9P > a').click();
  await page.getByRole('button', { name: 'Add to cart' }).click();
});