import { test, expect, selectors, Locator } from 'playwright/test';

test("check xpath ", async ({ page }) => {
  await page.goto("https://www.amazon.in/");
  await page.getByAltText("Continue shopping").click();
  await page.locator("//a[.=\"Today's Deals\"]").click();
  await page.locator("//a[contains(text(),'Electronics ') and contains(@class,'nav-a ')]").click();
  await page.waitForTimeout(5000);
  const elements: Locator = page.locator("//ul[@class='nav-ul']/li/div//a");
  let length: number = await elements.count();
  console.log(await elements.first().textContent());
  console.log(await elements.last().textContent());
  console.log(await elements.nth(3).textContent());
  let productTitle: string[] = await elements.allTextContents();
  console.log("all menu items : ", productTitle);
  for (let pt of productTitle) {
    console.log(pt);
  }
  console.log("count of the elements : ", length);
  await page.locator("//img[@alt='Laptops']").click();
  await page.getByText("Traditional Laptops").click();
  await page.getByText("HP 15 Smartchoice, 13th Gen Intel Core i3-1315U(8GB DDR4,512GB SSD) FHD, Anti-Glare, Micro-Edge, 15.6''/39.6cm, Win11, M365(1yr)*Office24, Silver,1.59kg, fd0572TU, FHD Camera w/Shutter, Backlit Laptop").click();
  const beforetext = await page.locator("//span[@id='nav-cart-count']").textContent();
  console.log("before adding cart: ", beforetext);
  await expect(beforetext).toBe("0");
  await page.locator("(//input[@id='add-to-cart-button'])[2]").click();
  await expect(page.getByText("Added to cart")).toBeVisible();
  const text = await page.locator("//span[@id='nav-cart-count']").textContent();
  console.log("Affter adding cart: ", text);
  await expect(text).toBe("1");

})


test("handling dynamic xpath", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  const element: Locator = page.locator("//button[@name='start' or @name='stop']");
  const cssEle: Locator = page.locator('button[name="start"], button[name="stop"]');
  const ele: Locator = page.getByRole("button", { name: /START|STOP/ });
  for (let i = 0; i < 5; i++) {
    await ele.click();
    await page.waitForTimeout(2000);
  }

})

test("xpath axis methods", async ({ page }) => {
  await page.goto("https://www.w3schools.com/html/html_tables.asp");
  let country: Locator = await page.locator("//table[@class='ws-table-all']/child::tbody/tr[2]/td[position()=3]");
  await expect(country).toHaveText("Germany");
  console.log("name of the country ", await country.textContent());

})

test("css selector test", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com/");
  await page.locator("#name").fill("chirra krishiv goud");
  await page.locator("#email").fill("chandu@gmail.com");
  await page.getByPlaceholder("Enter Phone").fill("98378292");
  await page.locator("#male").click();
  await page.locator(".wikipedia-search-input").fill("automation testing");
  await page.locator(".wikipedia-search-button").click();
  await page.locator("input[name='input1']").fill("text entered");
  await page.locator(".rectangular-button").click();
  await page.waitForTimeout(6000);

})



test('pp bet css selectors', async ({ page }) => {
  await page.goto('https://qa.pragmaticplaysports.net');
  await page.getByText('Football').first().click();
  await page.getByText('+ 277').click();
  const toggle = page.locator("div[class^=arrow-toggle]");
  const classValue = await toggle.first().getAttribute("class");
  if (classValue?.includes("arrow-down")) {
    await toggle.first().click();
  }
  await page.getByRole('button', { name: 'Cruzeiro 1.73' }).click();
  await page.getByRole('textbox', { name: '0.00' }).click();
  await page.getByRole('textbox', { name: '0.00' }).fill('34.56');
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByTitle("Sign in & Place Bet").click();
  await page.locator('input[type="text"]').click();
  await page.locator('input[type="text"]').fill('cha');
  await page.locator('input[type="password"]').click();
  await page.locator('input[type="password"]').fill('cha');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByText('Deposit & Place Bet').click();
});

test("flipcart test css ",async({page})=>{
  await page.goto("https://www.flipkart.com/");
  await page.locator("//div[text()='Electronics']").click();
  await page.locator("//div[text()='Laptops ']").click();
  
})