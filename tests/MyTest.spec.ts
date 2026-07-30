import{test,expect} from "@playwright/test";

//fixture -globle variable ex=page,browser
test("title of the page",async({page})=>{

   await page.goto("https://qa.pragmaticplaysports.net");
    let title:string=await page.title();
   await expect(page).toHaveTitle("Test Pragmatic Play (PP) Sportsbook");
   await page.close();
})

