import { PageManager, PlaywrightBlocker, fetch, test, expect } from '../src/page-manager';
import { TestUser } from '../src/test-data/signup-testdata';
import { creditCard } from '../src/test-data/checkout-testdata';


test('Register - During checkout', async ({ page }) => 
{
    // Sets up the page manager, generates a test user and credit card information
    const pm = new PageManager(page);
    const user = new TestUser();
    const card = new creditCard();

    // Ad blocking with playwrightblocker, not ideal but the ads were really annoying. :'(
    const blocker = await PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch);
    await blocker.enableBlockingInPage(page);

    // Move to the product page from root
    await pm.moveTo.siteRoot();
    await pm.moveTo.tabName("Products", "products");

    // Search for item, add it to the cart, verify its addition then proceed to checkout
    await pm.product.searchAndAdd("Soft Stretch Jeans");
    await pm.moveTo.tabName("Cart", "view_cart");
    await pm.cart.verifyItemAdded();
    await pm.cart.proceedToCheckout();

    // Navigate to the register user page and create a new user
    await pm.cart.registerUser();
    await pm.signup.beginSignup(user.firstName, user.email);
    await pm.signup.fillSignup(user.password, user.firstName, user.lastName, user.address, user.state, user.city, user.zipcode, user.phoneNumber);

    // Move back to the cart and verify it is still there, and checkout
    await pm.moveTo.tabName("Cart", "view_cart");
    await pm.cart.verifyItemAdded();
    await pm.cart.proceedToCheckout();

    //Verify address information, Enter payment details, and place the orde
    await pm.payment.addressCheck(user.address);
    await pm.payment.fillPaymentInfo(card.name, card.cardNumber, card.cvv, card.expiryMonth, card.expiryYear)
    await pm.payment.placeOrder();
});

test('Login - During checkout', async ({ page }) => 
{
    // Sets up the page manager, generates a test user and credit card information
    const pm = new PageManager(page);
    const user = new TestUser();
    const card = new creditCard();
    
    // Ad blocking with playwrightblocker, not ideal but the ads were really annoying. :'(
    const blocker = await PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch);
    await blocker.enableBlockingInPage(page);
    
    // Navigate to the login page from site root
    await pm.moveTo.siteRoot();
    await pm.moveTo.tabName("Signup / Login", "login");

    // Create a new account and logout straight away
    await pm.signup.beginSignup(user.firstName, user.email);
    await pm.signup.fillSignup(user.password, user.firstName, user.lastName, user.address, user.state, user.city, user.zipcode, user.phoneNumber);
    await pm.moveTo.tabName("Logout", "login");

    // Move to the product page, and search for an item, add it to the cart and verify it successfully added
    await pm.moveTo.tabName("Products", "products");
    await pm.product.searchAndAdd("Soft Stretch Jeans");
    await pm.cart.verifyItemAdded();

    // Attempt to continue to checkout
    await pm.cart.proceedToCheckout();

    // Navigate to the login page and create a new user
    await pm.cart.registerUser();
    await pm.login.loginToAccount(user.email, user.password);

    // Move back to the cart and verify it is still there, and checkout
    await pm.moveTo.tabName("Cart", "view_cart");
    await pm.cart.verifyItemAdded();
    await pm.cart.proceedToCheckout();
    
    //Verify address information, Enter payment details, and place the orde
    await pm.payment.addressCheck(user.address);
    await pm.payment.fillPaymentInfo(card.name, card.cardNumber, card.cvv, card.expiryMonth, card.expiryYear)
    await pm.payment.placeOrder();
});

test('Login - Before checkout', async ({ page }) => 
{
    // Sets up the page manager, generates a test user and credit card information
    const pm = new PageManager(page);
    const user = new TestUser();
    const card = new creditCard();

    // Ad blocking with playwrightblocker, not ideal but the ads were really annoying. :'(
    const blocker = await PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch);
    await blocker.enableBlockingInPage(page);

    // Navigate to the login page from site root
    await pm.moveTo.siteRoot();
    await pm.moveTo.tabName("Signup / Login", "login");

    // Create a new account
    await pm.signup.beginSignup(user.firstName, user.email);
    await pm.signup.fillSignup(user.password, user.firstName, user.lastName, user.address, user.state, user.city, user.zipcode, user.phoneNumber);

    // Move to the product page, and search for an item, add it to the cart and verify it successfully added
    await pm.moveTo.tabName("Products", "products");
    await pm.product.searchAndAdd("Soft Stretch Jeans");
    await pm.cart.verifyItemAdded();

    // Continue to checkout
    await pm.cart.proceedToCheckout();
    
    //Verify address information, Enter payment details, and place the orde
    await pm.payment.addressCheck(user.address);
    await pm.payment.fillPaymentInfo(card.name, card.cardNumber, card.cvv, card.expiryMonth, card.expiryYear)
    await pm.payment.placeOrder();
});