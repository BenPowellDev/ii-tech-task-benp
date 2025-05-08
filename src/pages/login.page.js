import { expect } from '@playwright/test';

export class LoginPage
{
  constructor(page) 
  {
    this.page = page;

    // Login inputs
    this.loginEmail = page.locator("//input[@data-qa='login-email']");
    this.loginPassword = page.locator("//input[@placeholder='Password']");

    // Buttons
    this.loginButton = page.locator("//button[normalize-space()='Login']");
    this.continueButton = page.locator("//a[normalize-space()='Continue']");
  }

  async loginToAccount(email, password) 
  {
    // Check the login inputs are visible
    await expect(this.loginEmail).toBeVisible();
    await expect(this.loginPassword).toBeVisible();
    
    // Fill the login information
    await this.loginEmail.fill(email);
    await this.loginPassword.fill(password);

    // Click 'Login'
    await expect(this.loginButton).toBeVisible();
    await this.loginButton.click(); 
  }
}