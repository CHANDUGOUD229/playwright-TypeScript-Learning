# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: reports.spec.ts >> launch insta for slow
- Location: tests\reports.spec.ts:79:5

# Error details

```
TimeoutError: locator.click: Timeout 15000ms exceeded.
Call log:
  - waiting for locator('a.testing')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - heading "Access Denied" [level=1] [ref=e2]
  - text: You don't have permission to access "http://www.naukri.com/" on this server.
  - paragraph [ref=e3]: "Reference #18.2c4b3917.1786249921.96f9db1"
  - paragraph [ref=e4]: https://errors.edgesuite.net/18.2c4b3917.1786249921.96f9db1
```

# Test source

```ts
  1  | import { test, expect, Locator, Page, chromium, FrameLocator, firefox, webkit } from "@playwright/test";
  2  | 
  3  | let page: Page;
  4  | 
  5  | test.beforeAll("open App", async ({ browser }) => {
  6  |     page = await browser.newPage();
  7  |     await page.goto('https://www.naukri.com/');
  8  | 
  9  | })
  10 | 
  11 | test.afterAll("close the browser", async () => {
  12 |     await page.close();
  13 | })
  14 | 
  15 | // test.beforeEach("login App", async () => {
  16 | //     await page.getByRole('link', { name: 'Login' }).click();
  17 | //     await page.getByRole('textbox', { name: 'Email ID / Username' }).fill('chandu96qa@outlook.com');
  18 | //     await page.getByRole('textbox', { name: 'Password' }).fill('9542427545');
  19 | //     // await page.waitForTimeout(5000);
  20 | //     await page.getByRole('button', { name: 'Login', exact: true }).click();
  21 | 
  22 | // })
  23 | 
  24 | // test.afterEach("Logout App", async () => {
  25 | //     await page.getByRole('button', { name: 'Open profile menu' }).click();
  26 | //     await page.getByRole('button', { name: 'Logout' }).click();
  27 | //     await expect(page.getByRole('link', { name: 'Naukri.com' }).first()).toBeVisible();
  28 | 
  29 | // })
  30 | 
  31 | 
  32 | 
  33 | test.describe.skip("myGroup", async () => {
  34 | 
  35 |     test("view profile", async () => {
  36 |         await page.getByRole('link', { name: 'View profile' }).click();
  37 | 
  38 |     })
  39 | 
  40 |     test("edit option", async () => {
  41 |         await expect(page.getByRole('link', { name: 'View profile' })).toBeVisible();
  42 |         await page.getByRole('link', { name: 'View profile' }).dblclick();
  43 |         await expect(page.getByText('Selenium WebDriverTestngBDD')).toBeVisible();
  44 |         // await page.locator('#lazyKeySkills').getByText('editOneTheme').dblclick();
  45 | 
  46 |     })
  47 | 
  48 | })
  49 | 
  50 | test.skip("view profile", async ({ page, browserName }) => {
  51 |     test.skip(browserName === "chromium", "test is skipped browsername firfox")
  52 |     await page.getByRole('link', { name: 'View profile' }).click();
  53 | 
  54 | })
  55 | 
  56 | test.skip("edit option", async () => {
  57 |     await expect(page.getByRole('link', { name: 'View profile' })).toBeVisible();
  58 |     await page.getByRole('link', { name: 'View profile' }).dblclick();
  59 |     await expect(page.getByText('Selenium WebDriverTestngBDD')).toBeVisible();
  60 |     // await page.locator('#lazyKeySkills').getByText('editOneTheme').dblclick();
  61 | 
  62 | })
  63 | 
  64 | test("launch app store", async ({ page, browserName }) => {
  65 |     test.skip(browserName === "chromium", "test is skipped browsername firfox")
  66 |     await page.goto("https://www.demoblaze.com/cart.html#");
  67 | })
  68 | test("launch google", async ({ page, browserName }) => {
  69 |     await page.goto("https://www.google.com/");
  70 | 
  71 | })
  72 | 
  73 | test("launch insta", async ({ page, browserName }) => {
  74 |     await page.goto("https://www.instagram.com/");
  75 | 
  76 | 
  77 | })
  78 | 
  79 | test("launch insta for slow", async ({ page, browserName }) => {
  80 |     test.slow(); // triple the default timeout but its not recomended
  81 |     await page.goto("https://www.instagram.com/");
> 82 |     await page.locator("a.testing").click();
     |                                     ^ TimeoutError: locator.click: Timeout 15000ms exceeded.
  83 | 
  84 | 
  85 | })
```