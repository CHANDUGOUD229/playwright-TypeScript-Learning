import { Page, Locator } from '@playwright/test';

export class LoginPage {

    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.getByPlaceholder('email@example.com');
        this.passwordInput = page.getByPlaceholder('enter your passsword');
        this.loginButton = page.locator('input#login');
    }
    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }


    async login(username: string, password: string) {
        await this.emailInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }


}