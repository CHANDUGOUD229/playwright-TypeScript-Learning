import{test,expect, selectors, Locator} from 'playwright/test';


test("validate locators",async({page})=>{
 await page.goto("https://www.amazon.in/");
  waitUntil: "domcontentloaded";
  await page.getByAltText("Continue shopping").click();
//  const logo:Locator= page.getByAltText("Washing machines");
 await expect(page.getByAltText(/Washing\s+Machines/i)).toBeVisible();//ignore the case sensitive
 await page.getByAltText("Washing machines").click();
 await page.getByText("Amazon Pay").click();
  await page.getByRole("link",{name:'Mobiles'}).click();
  await expect(page.getByRole("heading",{name:"Amazon Web Services"})).toBeVisible();
  await page.getByLabel('Search Amazon.in').fill("iphone");
  await page.getByRole('button',{name:'button'}).click();

})


test('check label locator', async ({ page }) => {
    await page.goto("https://demo.automationtesting.in/Register.html");
  await page.getByRole('textbox', { name: 'First Name' }).click();
  await page.getByRole('textbox', { name: 'First Name' }).fill('chandra');
  await page.getByRole('textbox', { name: 'Last Name' }).click();
  await page.getByRole('textbox', { name: 'Last Name' }).fill('chirra');
  await page.locator('textarea').click();
  await page.locator('textarea').fill('budharaopet,khanapur,warangel,pin 506134');
  await page.locator('input[type="email"]').click();
  await page.locator('input[type="email"]').fill('chandu@gmail.com');
  await page.locator('input[type="tel"]').click();
  await page.locator('input[type="tel"]').fill('9765365476');
  await page.getByText('Male', { exact: true }).click();
  await page.getByText('Movies').click();
  await page.locator('#msdd').click();
  await page.getByText('English').click();
  await page.getByText('Languages English Arabic').click();
  await page.getByText('Full Name* Address Email').click();
  await page.locator('#Skills').selectOption('Java');
  await page.getByText('Country* Select Country').click();
  await page.getByLabel('', { exact: true }).click();
  await page.getByRole('treeitem', { name: 'India' }).click();
  await page.locator('#yearbox').selectOption('1996');
  await page.getByRole('combobox').nth(4).selectOption('January');
  await page.getByText('Gender* Male FeMale').click();
  await page.locator('#daybox').selectOption('9');
  await page.locator('#firstpassword').fill('1234567');
  await page.locator('#secondpassword').click();
  await page.locator('#secondpassword').fill('1234567');
  await page.getByTitle("Sakinalium Demo SiteAutomation demo site").click();

});