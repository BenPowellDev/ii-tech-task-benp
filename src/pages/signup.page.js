import { expect } from '@playwright/test';

export class SignupPage
{
    constructor(page)
    {
        this.page = page;
        
        //Signup/ login page inputs
        this.signupName = page.locator("//input[@placeholder='Name']");
        this.signupEmail = page.locator("//input[@data-qa='signup-email']");
        this.signupButton = page.locator("//button[normalize-space()='Signup']");

        this.checkoutRegister = page.locator("//u[normalize-space()='Register / Login']");

        //Singup form inputs
        this.passwordBox = page.locator("//input[@id='password']");
        this.firstNameBox = page.locator("//input[@id='first_name']");
        this.lastNameBox = page.locator("//input[@id='last_name']");
        this.addressBox = page.locator("//input[@id='address1']");
        this.stateBox = page.locator("//input[@id='state']");
        this.cityBox = page.locator("//input[@id='city']");
        this.zipcodeBox = page.locator("//input[@id='zipcode']");
        this.phoneNumberBox = page.locator("//input[@id='mobile_number']");

        // Buttons
        this.createAccountButton = page.locator("//button[normalize-space()='Create Account']");
        this.continueButton = page.locator("//a[normalize-space()='Continue']");
    }

    async beginSignup(firstName, email)
    {
        // Check that the signup inputs are visible
        await expect(this.signupName).toBeVisible();
        await expect(this.signupEmail).toBeVisible();
        
        // Fill the user information for registration
        await this.signupName.fill(firstName)
        await this.signupEmail.fill(email)

        // Click 'Signup'
        await expect(this.signupButton).toBeVisible();
        await this.signupButton.click();
    }

    async fillSignup(password, firstName, lastName, address, state, city, zipcode, phoneNumber)
    {
        // Check that the signup form inputs are visible
        await expect(this.passwordBox).toBeVisible();
        await expect(this.firstNameBox).toBeVisible();
        await expect(this.lastNameBox).toBeVisible();
        await expect(this.addressBox).toBeVisible();
        await expect(this.stateBox).toBeVisible();
        await expect(this.cityBox).toBeVisible();
        await expect(this.zipcodeBox).toBeVisible();
        await expect(this.phoneNumberBox).toBeVisible();

        // Fill the signup form with testUser info
        await this.passwordBox.fill(password);
        await this.firstNameBox.fill(firstName);
        await this.lastNameBox.fill(lastName);
        await this.addressBox.fill(address);
        await this.stateBox.fill(state);
        await this.cityBox.fill(city);
        await this.zipcodeBox.fill(zipcode);
        await this.phoneNumberBox.fill(phoneNumber);

        // Click 'Create Account'
        await expect(this.createAccountButton).toBeVisible();
        await this.createAccountButton.click();

        // Ensures the account created text is present
        await expect(this.page.getByText("Account Created!")).toBeVisible();

        // Bypass successful account creation message.
        await expect(this.continueButton).toBeVisible();
        await this.continueButton.click();
    }
}