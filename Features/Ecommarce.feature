Feature: Validate Ecommerce application

Scenario: placing the order
Given a login to Ecommerce application with "ankshika@gmail.com" and "Iamking@000"
When add "zara coat 3" to cart
Then validate "zara coat 3" is displayed in the cart
When enter valid details to place the order
Then validate the order is prasent in an order history page
