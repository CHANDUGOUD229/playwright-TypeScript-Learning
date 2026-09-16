import { Page } from '@playwright/test';
import { LoginPage } from "./LoginPage";
import { DashBoardPage } from "./DashBoardPage";
import { CartPage } from "./CartPage";
import { OrdersPage } from "./OrdersPage";
import { OrderConfirmationPage } from "./OrderConfirmationPage";
import { OrderHistoryPage } from "./OrderHistoryPage";

export class POMManager {
    private readonly loginPage: LoginPage;
    private readonly dashBoardPage: DashBoardPage;
    private readonly cartPage: CartPage;
    private readonly orderPage: OrdersPage;
    private readonly orderConfirmationPage: OrderConfirmationPage;
    private readonly orderHistoryPage: OrderHistoryPage;

    constructor(page: Page) {
        this.loginPage = new LoginPage(page);
        this.dashBoardPage = new DashBoardPage(page);
        this.cartPage = new CartPage(page);
        this.orderPage = new OrdersPage(page);
        this.orderConfirmationPage = new OrderConfirmationPage(page);
        this.orderHistoryPage = new OrderHistoryPage(page);
    }

    getLoginPage() { return this.loginPage; }
    getDashBoardPage() { return this.dashBoardPage; }
    getCartPage() { return this.cartPage; }
    getOrderPage() { return this.orderPage; }
    getOrderConfirmationPage() { return this.orderConfirmationPage; }
    getOrderHistoryPage() { return this.orderHistoryPage; }
}