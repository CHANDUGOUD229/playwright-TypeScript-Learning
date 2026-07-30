import{test,expect} from "@playwright/test";

//fixture -globle variable ex=page,browser
test("validate URL of the page",async({page})=>{

   await page.goto("https://testautomationpractice.blogspot.com/");
    let title:string=await page.url();
   await expect(page).toHaveTitle("Automation Testing Practice");
   await page.getByPlaceholder("Enter Name").fill("chandra shekhar chirra");
   await page.close();

   
})

