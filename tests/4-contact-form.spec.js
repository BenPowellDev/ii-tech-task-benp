import { PageManager, PlaywrightBlocker, fetch, test, expect } from '../src/page-manager';
import { TestUser } from '../src/test-data/signup-testdata';


test('Write a message, and attach a file to the contact us form before submitting', async ({ page }) => 
{
    // Sets up the page manager, and generates a new Test User
    const pm = new PageManager(page);
    const user = new TestUser();

    // Ad blocking with playwrightblocker, not ideal but the ads were really annoying. :'(
    const blocker = await PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch);
    await blocker.enableBlockingInPage(page);

    // Handle Dialog from form submission
    page.on('dialog', async dialog => {
        console.log(`Dialog message: ${dialog.message()}`);
        await dialog.accept();
    });

    // Navigate to the contact page from root
    await pm.moveTo.siteRoot();
    await pm.moveTo.tabName("Contact Us", "contact_us");

    // Fill the contact form and submit
    await pm.contact.fillContactForm(user.firstName, user.email, "test", "test");
    await pm.contact.submitContactForm();

    // Verify successful submission
    await pm.contact.verifySuccess();
});