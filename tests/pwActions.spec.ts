import { test, expect, Locator, Page, chromium, FrameLocator, firefox, webkit } from "@playwright/test";
//text box
//radio button
//check boxes


test("text box action", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const textBox: Locator = page.locator("input#name");
    await expect(textBox).toBeVisible();
    await expect(textBox).toBeEnabled();
    const len: string | null = await textBox.getAttribute("maxlength");
    expect(len).toBe("15");
    await textBox.fill("automation");
    const enteredText: string = await textBox.inputValue(); // return input value of text box 
    console.log("your entered text : ", enteredText);
    await expect(enteredText).toBe("automation");
    await page.waitForTimeout(3000);
})

test("radio button & check box validation ", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const radioBtn: Locator = page.locator("#male");
    await expect(radioBtn).toBeVisible();
    await expect(radioBtn).toBeEditable();
    expect(await radioBtn.isChecked()).toBe(false);
    await radioBtn.check();
    await expect(radioBtn).toBeChecked();
    const FeradioBtn: Locator = page.locator("#female");
    await FeradioBtn.check();
    expect(await radioBtn.isChecked()).toBe(false);
    await page.waitForTimeout(3000);

})

test("checkbox actions", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    // const sunday: Locator = page.getByLabel("Sunday");
    // await sunday.check();
    // await expect(sunday).toBeChecked();

    const days: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const checkBoxes: Locator[] = days.map(index => page.getByLabel(index));
    for (let checkbox of checkBoxes) {
        await checkbox.check();
        await expect(checkbox).toBeChecked();
    }
    await page.waitForTimeout(3000);

    for (let checkbox of checkBoxes.slice(-3)) {
        await checkbox.uncheck();
        await expect(checkbox).not.toBeChecked();
    }
    await page.waitForTimeout(3000);

    for (const checkbox of checkBoxes) {
        if (await checkbox.isChecked()) {
            await checkbox.uncheck();
            await expect(checkbox).not.toBeChecked();
        } else {
            await checkbox.check();
            await expect(checkbox).toBeChecked();
        }
    }

    await page.waitForTimeout(3000);

    //random select checkboxes
    const indexes = [1, 3, 6];
    for (let i of indexes) {
        await checkBoxes[i].check();
        expect(checkBoxes[i]).toBeChecked();
    }
    await page.waitForTimeout(3000);

    // select the check box based on the value
    let weekday: string = "Sunday";
    for (let label of days) {
        if (label.toLowerCase() === weekday.toLowerCase()) {
            await page.getByLabel(label).check();
            await expect(page.getByLabel(label)).toBeChecked();
        }
    }

    await page.waitForTimeout(3000);


})

test("demo test radio btn and check boxes", async ({ page }) => {
    await page.goto("https://demo.automationtesting.in/Register.html");
    const firstName: Locator = page.getByPlaceholder("First Name");
    await expect(firstName).toBeVisible();
    await expect(firstName).toBeEnabled();
    await firstName.fill("chandra shekhar");
    const attribute: string | null = await firstName.getAttribute("type");
    const enteredValue: string = await firstName.inputValue();
    await expect(enteredValue).toBe("chandra shekhar");
    //handling radio btn
    const maleRadioBtn: Locator = await page.locator("input[value='Male']");
    await maleRadioBtn.check();
    await expect(maleRadioBtn).toBeChecked();

    //handling checkbox

    const checkbox: Locator = page.locator("input#checkbox1");
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    await checkbox.uncheck();

    // const game: string[] = [" Cricket ", "Movies ", "Hockey"];

    // const elements: Locator[] = game.map(index => page.locator('checkbox').getByText(index));
    let checkBoxes: Locator = page.locator("input[type='checkbox']");
    let checkBoxesTxt: Locator[] = await checkBoxes.all();
    for (let ele of checkBoxesTxt) {
        await ele.check();
        await expect(ele).toBeChecked()
    }
    await page.waitForTimeout(3000);

})


test("handle single dropdown", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    // await page.locator("#country").selectOption("United Kingdom"); //by visible text
    // await page.locator("#country").selectOption({ value: 'japan' });//using value attribute
    // await page.locator("#country").selectOption({ label: 'India' }); //using label
    // await page.locator("#country").selectOption({ index: 3 }); //by using index

    const dropdownOptions: Locator = page.locator("#country>option");

    await expect(dropdownOptions).toHaveCount(10);
    //check an option prasent in dropdown

    const options: string[] = await (await dropdownOptions.allTextContents()).map(text => text.trim());
    console.log(options);
    expect(options).toContain("Brazil");

    // await page.waitForTimeout(3000);



})

test("handle multy dropdown", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    // await page.locator("#colors").selectOption(["Red","Green","White"]);//using visible text
    // await page.locator("#colors").selectOption(["red", "blue", "green"]); //using value
    //  await page.locator("#colors").selectOption([{label:"Red"},{label:"Green"}]);
    await page.locator("#colors").selectOption([{ index: 1 }, { index: 4 }]);
    const colorsCount: Locator = page.locator("#colors>option");
    const colorTxt: string[] = (await colorsCount.allTextContents()).map(text => text.trim());
    await expect(colorsCount).toHaveCount(7);
    await page.waitForTimeout(3000);
    expect(colorTxt).toContain("Green");
    console.log(colorTxt);
    for (let c of colorTxt) {
        console.log(c);
    }


})

test("validate dropdown is Sorted", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    // const dropdownOption: Locator = page.locator("#colors>option");
    const dropdownOption: Locator = page.locator("#animals>option");

    const optionsTxt: string[] = (await dropdownOption.allTextContents()).map(text => text.trim());
    const originalList: string[] = [...optionsTxt];
    const sortedList: string[] = [...optionsTxt].sort();

    console.log("original list : ", originalList);
    console.log("sorted list : ", sortedList);

    await expect(originalList).toEqual(sortedList);

});


test("validate dropdown is Duplicates", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    // const dropdownOption: Locator = page.locator("#colors>option");//having duplicates
    const dropdownOption: Locator = page.locator("#animals>option");// not having duplicates
    const options: string[] = (await dropdownOption.allTextContents()).map(text => text.trim());
    const myset = new Set<string>();
    const dup: string[] = [];
    for (let t of options) {
        if (myset.has(t)) {
            dup.push(t);
        } else {
            myset.add(t);
        }
    }
    console.log("duplicate value : ", dup);
    // console.log("unique value : ",myset);
    await expect(dup.length).toBe(0);

});

test("test dropdown", async ({ page }) => {
    await page.goto("https://www.bstackdemo.com/");
    const dropdown: Locator = page.locator("div[class='sort'] select");
    await expect(dropdown).toBeVisible();
    await expect(dropdown).toBeEnabled();
    await dropdown.selectOption("Lowest to highest");
    const prices: Locator = page.locator(".val");
    const productName: Locator = page.locator(".shelf-item__title");
    await expect(productName).toHaveCount(25);
    const productNameTxt: string[] = (await productName.allTextContents()).map(text => text.trim());
    const priceText: string[] = await prices.allTextContents();
    await expect(prices).toHaveCount(25);

    await expect(await prices.count()).toEqual(await productName.count());
    // for (let i = 0; i < priceText.length; i++) {
    //     console.log(`product Name   ${productNameTxt[i]}                  ||    price   ${priceText[i]}`);
    // }

    let highestPrice: number = Number.MAX_VALUE; // and use 0 for hightest value
    let highestProduct: string = "";

    for (let i = 0; i < productNameTxt.length; i++) {
        const price = parseFloat(priceText[i].replace(/[^0-9.]/g, ""));
        if (price < highestPrice) {
            highestPrice = price;
            highestProduct = productNameTxt[i];
        }
    }
    console.log(`Product Name : ${highestProduct}`);
    console.log(`Product Price: ${highestPrice}`);

    await page.waitForTimeout(3000);

})


test("dynamic dropdown handling ", async ({ page }) => {
    await page.goto("https://www.flipkart.com/");
    await page.getByRole('button', { name: '✕' }).click();
    await page.getByRole('textbox', { name: 'Search for Products, Brands' }).fill("iphone");
    // get all suggestions and actions  cntl+shift+p --> emulate a focused page
    await page.waitForTimeout(3000);
    const list: Locator = page.locator("ul>li");
    const count: number = await list.count();
    console.log("auto suggested values count : ", count);
    await page.waitForTimeout(3000);
    // let dpoption: string[] = (await list.allTextContents()).map(text => text.trim());

    // for (let option of dpoption) {
    //     console.log(option);
    // }
    let expe: string = "iphone 16"

    for (let i = 0; i < count; i++) {
        let text: string | null = await list.nth(i).textContent();
        if (text === expe) {
            await list.nth(i).click();
            break;
        }
    }


})

test("handle hidden dropdown", async ({ page }) => {
    await page.goto("https://opensource-demo.orangehrmlive.com/");
    await page.getByPlaceholder("Username").fill("Admin");
    await page.getByPlaceholder("Password").fill("admin123");
    await page.getByRole("button", { name: "Login" }).click();
    await page.getByText("PIM").click();
    await page.locator("form i").nth(2).click();
    const options: Locator = await page.locator("div[role='listbox'] span");
    await page.waitForTimeout(5000);
    let count: number = await options.count();
    console.log(count);
    for (let i = 0; i < count; i++) {
        let txt: string | null = await options.nth(i).textContent();
        if (txt?.toLowerCase() === "Finance Manager".toLowerCase()) {
            options.nth(i).click();
            break;
        }
    }
    await page.waitForTimeout(3000);
})

test("handle google auto suggestions ", async ({ page }) => {
    await page.goto("https://www.google.com/");
    await page.locator("#APjFqb").fill("playwrite");
    const options: Locator = page.locator("ul.G43f7e li");
    await page.waitForTimeout(3000);
    let count: number = await options.count();
    const option: Locator[] = await options.all();

    // for (let locator of option) {
    //     let txt: string = await locator.innerText();
    //     console.log(txt);
    //     if (txt === "playwright automation") {
    //         await locator.click();
    //     }
    // }

    await page.waitForTimeout(6000);

});

test("validate static table ", async ({ page }) => {
    // await page.goto("https://testautomationpractice.blogspot.com/");
    // let table: Locator = page.locator("table[name='BookTable'] tbody");

    await page.goto("https://money.rediff.com/gainers");

    let table: Locator = page.locator("table[class='dataTable'] tbody");

    await expect(table).toBeVisible();
    let rows: Locator = table.locator("tr");
    let count: number = await rows.count();
    await expect(rows).toHaveCount(100);
    // let coulmns: Locator = rows.locator("th");
    // await expect(coulmns).toHaveCount(4);

    // for (let i = 0; i < count; i++) {
    //     let cells: Locator = rows.nth(i).locator("td");
    //     console.log(await cells.allInnerTexts());

    // }
    let allLocators: Locator[] = await rows.all();
    for (let row of allLocators) {
        let txt: string[] = await row.locator("td").allInnerTexts();
        console.log(txt.join("\t"));
    }
    console.log("------------------------------------");
    // print comapany based on the group
    let Ncomapny: string[] = [];
    let sumOfPrice: number = 0;
    for (let row of allLocators) {
        let cell: string[] = await row.locator("td").allInnerTexts();
        let group: string = cell[1];
        let comapany: string = cell[0];
        let price: number = parseFloat(cell[3].replace(/,/g, ""));
        if (group === "A") {
            console.log(`${comapany} \t ${group} \t${price}`);
            sumOfPrice += price;
            Ncomapny.push(comapany);
        }

    }
    console.log("sum of price : ", sumOfPrice);
    await expect(Ncomapny).toHaveLength(8);
    await expect(sumOfPrice).toBe(11055.749999999998);

})

test("handling dynamic web table", async ({ page }) => {
    await page.goto("https://practice.expandtesting.com/dynamic-table#google_vignette");
    let table: Locator = page.locator("table[class='table table-striped']");
    await expect(table).toBeVisible();
    let tableHeaders: Locator = await table.locator("th");
    await expect(tableHeaders).toHaveCount(5);
    let rows: Locator[] = await table.locator("tr").all();
    let cpuLoad = '';
    for (let row of rows.slice(1)) {
        let processName: string = await row.locator("td").nth(0).innerText();
        if (processName === "Chrome") {
            // cpuLoad = await row.locator('td:has-text("%")').innerText();
            cpuLoad = await row.locator('td', { hasText: '%' }).innerText();
            console.log("cpu ", cpuLoad);
            break;
        }
    }

    let yellowboxTxt: string = await page.locator("#chrome-cpu").innerText();
    console.log('yello box text', yellowboxTxt);
    if (yellowboxTxt.includes(cpuLoad)) {
        console.log("cpu load of chrome equal")
    } else {
        console.log("cpu load of chrome Not equal")

    }
    await expect(yellowboxTxt).toContain(cpuLoad);


})


test("read all data from pagination table", async ({ page }) => {

    await page.goto("https://datatables.net/examples/core/basic_init/zero_configuration.html");
    let hasMorePages = true;


    while (hasMorePages) {
        let rows: Locator[] = await page.locator("table#example tbody tr").all();
        for (let row of rows) {
            console.log(await row.innerText());
        }
        await page.waitForTimeout(2000);
        // button[aria-controls='example']:nth-child(9)
        // button[aria-controls='example']:has-text('›')

        let nextBtn: Locator = await page.locator("button[aria-label='Next']");
        let isDisabled: string | null = await nextBtn.getAttribute("class");
        if (isDisabled?.includes("disabled")) {
            hasMorePages = false;
        } else {
            await nextBtn.click();
        }

    }


})



test("filter rows and check the row count", async ({ page }) => {

    await page.goto("https://datatables.net/examples/core/basic_init/zero_configuration.html");
    await page.locator("#dt-length-0").selectOption({ value: "25" });
    let rows: Locator[] = await page.locator("table#example tbody tr").all();
    await expect(rows.length).toBe(25);
    await page.waitForTimeout(3000);
    let rowss: Locator = await page.locator("table#example tbody tr");
    await expect(rowss).toHaveCount(25);
    let searchBox: Locator = page.locator("#dt-search-0");
    let inputValue: string = "Sonya Frost";
    await searchBox.fill(inputValue);

    if (rows.length >= 1) {
        let matchFound = false;
        for (let row of rows) {
            let txt: string = await row.innerText();
            if (txt.includes(inputValue)) {
                console.log("record exist -found");
                matchFound = true;
                break;
            }
        }
        await expect(matchFound).toBeTruthy();

    } else {
        console.log("No matching records found........");
    }

    await page.waitForTimeout(3000);






})


test("given task habdle tables", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const rows: Locator = page.locator("#taskTable tr");
    await expect(rows).toHaveCount(5);
    let rowss: Locator[] = await rows.all();
    let cpuLoad: string = "";
    for (let row of rowss.slice(1)) {
        let firstColummn: string = await row.locator("td").nth(0).innerText();
        if (firstColummn === "Chrome") {
            cpuLoad = await row.locator("td", { hasText: "%" }).innerText();
            break;
        }
    }
    let orgtext: string = await page.locator("strong.chrome-cpu").innerText();
    await expect(cpuLoad).toContain(orgtext);
})


test("given task habdle tables 2", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const rows: Locator = page.locator("#taskTable tr");
    await expect(rows).toHaveCount(5);
    let rowss: Locator[] = await rows.all();
    let cpuLoad: string = "";
    for (let row of rowss.slice(1)) {
        let firstColummn: string = await row.locator("td").nth(0).innerText();
        if (firstColummn === "Firefox") {
            cpuLoad = await row.locator("td").filter({ hasText: /^\d+(\.\d+)?\sMB$/ }).innerText();
            break;
        }
    }
    let orgtext: string = await page.locator("strong.firefox-memory").innerText();
    await expect(cpuLoad).toContain(orgtext);
})

test("given task habdle tables 3", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const rows: Locator = page.locator("#taskTable tr");
    await expect(rows).toHaveCount(5);
    let rowss: Locator[] = await rows.all();
    let cpuLoad: string = "";
    for (let row of rowss.slice(1)) {
        let firstColummn: string = await row.locator("td").nth(0).innerText();
        if (firstColummn === "Chrome") {
            cpuLoad = await row.locator("td").filter({ hasText: /^\d+(\.\d+)?\sMbps$/ }).innerText();
            break;
        }
    }
    let orgtext: string = await page.locator("strong.chrome-network").innerText();
    await expect(cpuLoad).toContain(orgtext);
})

test("given task habdle tables 4", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const rows: Locator = page.locator("#taskTable tr");
    await expect(rows).toHaveCount(5);
    let rowss: Locator[] = await rows.all();
    let cpuLoad: string = "";
    for (let row of rowss.slice(1)) {
        let firstColummn: string = await row.locator("td").nth(0).innerText();
        if (firstColummn === "Firefox") {
            cpuLoad = await row.locator("td").filter({ hasText: "MB/s" }).innerText();
            break;
        }
    }
    let orgtext: string = await page.locator("strong.firefox-disk").innerText();
    await expect(cpuLoad).toContain(orgtext);
})


test("pagination task ", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    let pages: Locator = page.locator("#pagination a");
    let count: number = await pages.count();

    for (let i = 0; i <= count; i++) {
        await pages.nth(i).click();
        let checkBoxs: Locator[] = await page.locator("td input[type='checkbox']").all();
        for (let checkBox of checkBoxs) {
            await checkBox.click();
        }

    }
    await page.waitForTimeout(8000);


})
async function selectDate(targetYear: string, targetMonth: string, targetDate: string, page: Page, isFuture: boolean) {
    while (true) {
        let currentYear: string = await page.locator(".ui-datepicker-year").innerText();
        let currentMonth: string = await page.locator(".ui-datepicker-month").innerText();
        if (currentMonth === targetMonth && currentYear === targetYear) {
            break;
        }

        if (isFuture) {
            await page.locator(".ui-datepicker-next").click();

        } else {
            await page.locator(".ui-datepicker-prev").click();
        }

    }
    const dateLocator: Locator[] = await page.locator(".ui-datepicker-calendar td").all();
    for (let dates of dateLocator) {
        let dateTxt: string = await dates.innerText();
        if (dateTxt === targetDate) {
            await dates.click();
            break;
        }

    }


}




test("handling date pickers", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    // await page.locator("#datepicker").fill("07/21/2026");
    // let txt: string = await page.locator("#datepicker").inputValue();
    // await expect(txt).toBe("07/21/2026");//mm/dd/yyyy
    const year: string = "2025";
    const month: string = "June";
    const date: string = "25";
    await page.locator("#datepicker").click();
    selectDate(year, month, date, page, false);
    await page.waitForTimeout(5000);
})

async function checkRadioBtn(exOption: string, page: Page, locator: string) {
    let options: Locator[] = await page.locator(locator).all();
    for (let option of options) {
        let txt: string | null = await option.textContent();
        if (txt?.includes(exOption)) {
            await option.check();
            await expect(option).toBeChecked();
        }

    }

}

async function enterText(text: string, page: Page, locator: string) {
    const element = page.locator(locator);
    await element.waitFor({ state: "visible" });
    await element.fill(text);
}

test("dummy ticket application not compalted fully...", async ({ page }) => {
    await page.goto("https://www.dummyticket.com/dummy-ticket-for-visa-application/");
    // await checkRadioBtn("2,750",page,"label input[type='radio']");
    let options: Locator = page.locator(".opc-radio-list-label");
    let count: number = await options.count();
    for (let i = 0; i < count; i++) {
        let radioBtnTxt: string = await page.locator(".price bdi").nth(i).innerText();
        console.log(radioBtnTxt);
        if (radioBtnTxt?.includes("₹2,750")) {
            await options.nth(i).click();
        }
    }

    await page.waitForTimeout(6000);


    await enterText("chandra", page, "#travname");
    await enterText("chirra", page, "#travlastname");
    await page.waitForTimeout(6000);
})

test("simple dialog ahndling", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    // page.on("dialog",(Dialog)=>{
    //     console.log(Dialog.type());
    //     expect(Dialog.type()).toContain("alert");
    //     console.log(Dialog.message());
    //     expect(Dialog.message()).toContain("I am an alert box!");
    //     Dialog.accept();

    // })

    // await page.locator("#alertBtn").click();
    page.on("dialog", (Dialog) => {
        console.log(Dialog.type());
        console.log(Dialog.message());
        Dialog.accept();
        // Dialog.dismiss();
    })
    await page.locator("#confirmBtn").click();

    await expect(page.locator("#demo")).toHaveText("You pressed OK!");

    // await page.locator("#alertBtn").click();
    // await page.locator("#promptBtn").click();
    await page.waitForTimeout(5000);


})

test(" promt dialog handling", async ({ page }) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    page.on("dialog", (dialog) => {
        console.log(dialog.type());
        // expect(Dialog.type()).toContain("Promt");
        console.log(dialog.message());
        // expect(Dialog.message()).toContain("I am an alert box!");
        let message: string = dialog.defaultValue();
        expect(message).toContain("");
        console.log(message);
        dialog.accept("chandra");
    })
    await page.locator("#promptBtn").click();
    await expect(page.locator("#demo")).toHaveText("Hello chandra! How are you today?Hello");


})

test("handling iframes ", async ({ page }) => {
    await page.goto("https://ui.vision/demo/webtest/frames/");
    let frames = page.frames();
    console.log("number of frames", frames.length);
    //------------------approch 1 frame page.frame();-------------------
    // name or url by using this we can navigate to frame
    let frame = page.frame({ url: "https://ui.vision/demo/webtest/frames/frame_1" });
    if (frame) {
        //  await   frame.locator("input[name=mytext1]").fill("Automation");
        await frame.fill("input[name=mytext1]", "playwright");
    } else {
        console.log("frame is not available....");
    }

    //------------------- using frameLocator()--------single line we can handle it??------
    let framess: Locator = page.frameLocator("frame[src='frame_3.html']").locator("input[name='mytext3']");
    await framess.fill("Automation");
    await page.waitForTimeout(2000);
})


test("handling inner  frames ", async ({ page }) => {
    await page.goto("https://ui.vision/demo/webtest/frames/");

    let frame3 = page.frame({ url: "https://ui.vision/demo/webtest/frames/frame_3" })

    if (frame3) {
        //  await   frame.locator("input[name=mytext1]").fill("Automation");
        await frame3.fill("input[name=mytext3]", "playwright Automation");
        let childFrames = frame3.childFrames();
        console.log("Total child frames is : ", childFrames.length);
        childFrames[0].getByLabel("I am a human").click();
        let rdioBtn = childFrames[0].getByLabel("Form Autofilling");
        await rdioBtn.click();
        await expect(rdioBtn).toBeChecked();

    } else {
        console.log("frame is not available....");
    }

    await page.waitForTimeout(2000);


})

test("Browser context checking", async () => {
    const browser = await chromium.launch();
    // const browser1 = await chromium.launch();

    const context = await browser.newContext();
    const context1 = await browser.newContext();

    const page1 = await context.newPage();
    const page2 = await context.newPage();
    const page3 = await context.newPage();
    const page4 = await context1.newPage();
    const page5 = await context1.newPage();
    const page6 = await context1.newPage();


    await page1.goto("https://testautomationpractice.blogspot.com/");
    await page2.goto("https://www.google.com/");
    await page3.goto("https://www.instagram.com/");
    await page4.goto("https://www.facebook.com/");
    await page5.goto("https://web.whatsapp.com/");
    await page6.goto("https://www.linkedin.com/");
    console.log(browser.contexts().length, "length of contexts");
    console.log(context.pages().length, " lenth of pages");



})


test("Handling Tabs ", async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const parentPage = await context.newPage();
    await parentPage.goto("https://testautomationpractice.blogspot.com/");


    const [childPages] = await Promise.all([
        context.waitForEvent("page"),
        parentPage.locator("button:has-text('New Tab')").click()])
    //approch 1 switch between pages by using (context) its return array
    const pages = context.pages();
    console.log("number of pages open", pages.length);
    let titleOfPArent = await pages[0].title();
    let titleOfChild = await pages[1].title();
    console.log(titleOfPArent, "------------ ", titleOfChild);
    await pages[1].locator("input.gsc-input").fill("Automation");
    await pages[1].locator("input.gsc-search-button").click();
    // await pages[1].close();
    await parentPage.bringToFront();
    await parentPage.locator("button:has-text('New Tab')").click();
    //approch 2 if we have only two tabs its good to use
    console.log(await parentPage.title(), "======>", await childPages.title())

})

test("handle popup windows", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://testautomationpractice.blogspot.com/");
    const [popups] = await Promise.all([
        page.waitForEvent("popup"),
        page.locator("#PopUp").click()
    ])
    await popups.waitForLoadState();//wait for load state
    const allPopups = context.pages();
    const url0: string = allPopups[0].url();
    const url1: string = allPopups[1].url();
    const url2: string = allPopups[2].url();
    console.log(url1, "===", url2, "======", url0);
    console.log("number of pages ", allPopups.length);

    if (allPopups.length > 2) {
        for (let popUp of allPopups) {
            let titleOfPage: string = await popUp.title();
            if (titleOfPage.toLowerCase().includes("selenium".toLowerCase())) {
                await popUp.getByAltText("BrowserStack").click();
                popUp.close();
            }
        }
    }

    await page.waitForTimeout(4000);
})

test("handle authentication popup", async ({ browser }) => {
    // https://username:password@the-internet.herokuapp.com/
    // Approch 1
    /* const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto("https://admin:admin@the-internet.herokuapp.com/basic_auth");
      await page.waitForLoadState();
      await expect( page.locator("text=Congratulations")).toBeVisible();
      await page.waitForTimeout(6000);
      */

    // Approch 2 passing username and password browsercontext
    const context = await browser.newContext({ httpCredentials: { username: "admin", password: "admin" } });
    const page = await context.newPage();
    await page.goto("https://the-internet.herokuapp.com/basic_auth");
    await page.waitForLoadState();
    await expect(page.locator("text=Congratulations")).toBeVisible();
    await page.waitForTimeout(2000);


})

test("Auto waiting andforcing ", async ({ page }) => {
    // test.setTimeout(50000); //local test 
    // test.slow(); //90 sec
    await page.goto("https://demowebshop.tricentis.com/");
    //assertions has auto wait works
    await expect(page).toHaveURL("https://demowebshop.tricentis.com/", { timeout: 10000 });
    //auto retrying assertion if we pass the argument as page or locator that is auto retrying assertion
    // if we pass argumenet as value its non retrying assertion
    // if we use 'not' in assertion its nagotible matcher we can apply any one assertion
    await expect(page.locator("#small-searchterms")).toBeVisible({ timeout: 10000 });//assertion time out

    //Action has deffault auto wait works

    await page.locator("#small-searchterms").fill("Laptop", { force: true });
    await page.locator("input.search-box-button").click({ force: true });

})

test.only("hard vs soft assertions", async ({ page }) => {
    test.setTimeout(20000);
    await page.goto("https://demowebshop.tricentis.com/");

    //Hard assertions..........

    //if assertion is failed remaing steps will break  the execution.......

    // await expect(page).toHaveURL("https://demowebshop.tricentis.com/");
    // await expect(page.locator("#small-searchterms")).toBeVisible();
    // const txtbox: Locator = page.locator("#small-searchterms");
    // await expect(txtbox).toBeVisible();
    // await expect(txtbox).toBeEditable();
    // await txtbox.fill("Laptop");
    // const button:Locator= page.locator("input.search-box-button");
    // await expect(button).toBeVisible({timeout:20000});
    // await expect(button).not.toBeDisabled();
    // await expect(button).toBeEnabled();
    // await button.click();
    // await page.waitForTimeout(4000);

    //if assertion is failed remaing steps will continue  the execution.......
    //Soft assertion
    await expect.soft(page).toHaveURL("https://demowebshop.tricentis./");
    await expect.soft(page.locator("#small-searchterms")).toBeVisible();
    const txtbox: Locator = page.locator("#small-searchterms");
    await expect.soft(txtbox).toBeVisible();
    await expect(txtbox).toBeEditable();
    await txtbox.fill("Laptop");
    const button: Locator = page.locator("input.search-box-butt");
    await expect.soft(button).toBeVisible({ timeout: 20000 });
    await expect.soft(button).not.toBeDisabled();
    await expect.soft(button).toBeEnabled();
    await button.click();
    await page.waitForTimeout(4000);


})