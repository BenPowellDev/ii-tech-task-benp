import { PageManager, PlaywrightBlocker, fetch, test, expect } from '../src/page-manager';
import { TestUser } from '../src/test-data/signup-testdata';


test('Register and check credentials, delete account and retry login', async ({ page }) => 
{
    // Sets up the page manager, and generates a new Test User
    const pm = new PageManager(page);
    const user = new TestUser();

    // Ad blocking with playwrightblocker, not ideal but the ads were really annoying. :'(
    const blocker = await PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch);
    await blocker.enableBlockingInPage(page);
    
    // Navigate to the login page from site root
    await pm.moveTo.siteRoot();
    await pm.moveTo.tabName("Signup / Login", "login");

    // Create a new account
    await pm.signup.beginSignup(user.firstName, user.email);
    await pm.signup.fillSignup(user.password, user.firstName, user.lastName, user.address, user.state, user.city, user.zipcode, user.phoneNumber);

    // Log out after creating new account
    await pm.moveTo.tabName("Logout", "login");

    // Attempt to log back in
    await pm.moveTo.tabName("Signup / Login", "login");
    await pm.login.loginToAccount(user.email, user.password);

    // Check that logged in username matches the test users firstname
    await expect(page.locator('b')).toContainText(user.firstName);
    
    // Delete the fresh user account
    await pm.moveTo.tabName("Delete Account", "delete_account");

    // Ensures the account deleted text is present
    await expect(page.getByText("Account Deleted!")).toBeVisible();

    // Attempt to login using the deleted account credentials
    await pm.moveTo.tabName("Signup / Login", "login");
    await pm.login.loginToAccount(user.email, user.password);

    // Ensure the incorrect email/password prompt is visible
    await expect(page.getByText("Your email or password is incorrect!")).toBeVisible();
});