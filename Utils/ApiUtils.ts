import { APIRequestContext, expect } from "@playwright/test";
export class ApiUtils {

    private apiContext: any;
    private loginPayload: any;

    constructor(apiContext: any, loginPayload: any) {
        this.apiContext = apiContext;
        this.loginPayload = loginPayload;
    }


    async getToken(): Promise<string> {
        const loginResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayload
            }
        );

        expect(loginResponse.ok()).toBeTruthy();

        const loginResponseJson = await loginResponse.json();

        const token = loginResponseJson.token;

        console.log("Token:", token);

        return token;
    }


    async createOrder(orderCreationPayload: any): Promise<string> {

        let response: any = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderCreationPayload,

                headers: {
                    Authorization: response.token,
                    "Content-Type": "application/json"
                }
            }
        );

        expect(orderResponse.ok()).toBeTruthy();

        const responseJson = await orderResponse.json();

        console.log(responseJson);

        const orderId = responseJson.orders[0];
        response.orderId = orderId;

        return response;
    }
}

