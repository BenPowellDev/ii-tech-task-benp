import { expect } from "@playwright/test";

export class PaymentPage
{
    constructor(page)
    {
        this.page = page

        // Address Information Fields
        this.deliveryAddress = page.locator("//ul[@id='address_delivery']");
        this.invoiceAddress = page.locator("//ul[@id='address_invoice']")

        // Payment Information Fields
        this.nameOnCardInput = page.locator("//input[@data-qa='name-on-card']");
        this.cardNumberInput = page.locator("//input[@data-qa='card-number']");
        this.cvvInput = page.locator("//input[@data-qa='cvc']");
        this.expiryMonthInput = page.locator("//input[@data-qa='expiry-month']");
        this.expiryYearInput = page.locator("//input[@data-qa='expiry-year']");

        // Buttons
        this.placeOrderButton = page.locator("//a[normalize-space()='Place Order']");
        this.confirmOrderButton = page.locator("//button[@id='submit']");   
        this.continueButton = page.locator("//a[normalize-space()='Continue']");
        this.downloadInvoiceButton = page.locator("//a[normalize-space()='Download Invoice']");
    }

    async addressCheck(address)
    {
        // Ensures the address information is visible.
        await expect(this.deliveryAddress).toBeVisible();
        await expect(this.invoiceAddress).toBeVisible();

        // Checks the address show, to that of the user account
        await expect(this.deliveryAddress).toContainText(address);
        await expect(this.invoiceAddress).toContainText(address);

        // Clicks the place order button
        await this.placeOrderButton.click();
    }

    async fillPaymentInfo(nameOnCard, cardNumber, cvv, expirationMonth, expirationYear)
    {
        // Ensure the card elements are visible
        await expect(this.nameOnCardInput).toBeVisible();
        await expect(this.cardNumberInput).toBeVisible();
        await expect(this.cvvInput).toBeVisible();
        await expect(this.expiryMonthInput).toBeVisible();
        await expect(this.expiryYearInput).toBeVisible();
       
        // Fills the card details
        await this.nameOnCardInput.fill(nameOnCard);
        await this.cardNumberInput.fill(cardNumber);
        await this.cvvInput.fill(cvv);
        await this.expiryMonthInput.fill(expirationMonth);
        await this.expiryYearInput.fill(expirationYear);
    }

    async placeOrder()
    {
        // Waits for the confirm order button to be visible and clicks it
        await expect(this.confirmOrderButton).toBeVisible();
        await this.confirmOrderButton.click();

        // Ensures the order placed text is on screen
        await expect(this.page.getByText("Order Placed!")).toBeVisible();
    }
}