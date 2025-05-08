import { expect } from "@playwright/test";

export class CartPage
{
    constructor(page)
    {
        this.page = page;

        // Buttons
        this.registerButton = page.locator("//u[normalize-space()='Register / Login']");
        this.proceedButton = page.locator("//a[normalize-space()='Proceed To Checkout']");

        //Information
        this.cartInformation = page.locator("#cart_info");
    }

    async verifyItemAdded()
    {
        // Checks that the cart data matches the item added
        await expect(this.cartInformation).toContainText("Soft Stretch Jeans"); // Item Name
        await expect(this.cartInformation).toContainText("Rs. 799"); // Item Price
        await expect(this.cartInformation).toContainText("1"); // Item Quantity
    }

    async proceedToCheckout()
    {
        // Waits for the proceed button to be visible and clicks it
        await expect(this.proceedButton).toBeVisible();
        await this.proceedButton.click(); 
    }

    async registerUser()
    {
        // Waits for the register button to be visible and clicks it
        await expect(this.registerButton).toBeVisible();
        await this.registerButton.click(); 
    }
}