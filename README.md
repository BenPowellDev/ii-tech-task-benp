
# ii - Technical Task - Ben Powell

My submission for the ii technical task. I've aimed to mimic the standard user flow with my test selection:

Create Account -> Look for products -> Purchase -> Realise you've wasted all your money and submit a contact us form for a refund :D

Also worth noting, the ammount of times I was hit with a 'This website is under heavy load' message is tragic :(, thought all my tests were broken.

#### README Sections:
- [Task Questions](#task-questions)
- [Tests Outline](#tests-outline)
- [Running Tests](#running-tests)

## Task Questions (And Answers)

### 1. Can you review the website and pick six most important user journeys from the site?

- New user registration and login
- Filtering products by brand and category
- Adding and managing items in the basket
- Placing an order
- Leaving a review on a product
- Contacting customer services via 'Contact Us'

### 2. Out of the six user journeys proceed to pick four journeys to script against and explain why you picked these journeys?

#### Chosen Journeys:

- New user registration and login
- Filtering products
- Placing an order
- Sending a contact us form

#### Reasoning:

I chose these four user journeys due to their representation of core website functionality: user account creation/access, product discovery, shopping basket management, checkout initiation, and site feedback/contact. These flows are fundamental to the user experience and directly impact the website's usability and value. Prioritizing their automation allows for early detection of critical issues and establishes a solid foundation for future, more detailed testing efforts.


### 3. Proceed to choose the framework and programming language you intend on using and explain why you choose them?

For this task I will be using playwright with JavaScript.

I have chosen Playwright as it has:
- Cross browser support
- Auto waiting
- Parralel excecution
- Insanely fast test excecution

I chose JavaScript over TypeScript/Python as I have the most experience with the language, and wanted to showcase myself with the language I am most confident with.

## Tests Outline

### 1. New user registration and login

Goal: Ensure the user registration and login logic is functional

##### Register and check credentials, delete account and retry login - Steps (Simplified):

```
  1. Navigate to the login page from the sites root
  2. Create a new account
  3. Logout after successful account creation.
  4. Attempt to log back in.
  5. Verify successful login
  6. Verify that username matches test user's name.
  7. Delete fresh account
  8. Attempt to login with deleted user credentials
  9. Verify login was unsuccessful
```

### 2. Filtering products

Goal: Ensure that products filtered by brand are sorted correctly.

##### Ensure products sort by brand correctly for all unique API brands - Steps (Simplified):

```
  1. Navigate to the site root
  2. Fetch the list of brand from the API
  3. Extract all unique brand names
  4. Iterate through the unique brands from the API
  5. Ensure each page loads correctly
```

### 3. Placing an order, at different stages of login

Goal: Ensure that a user can successfully place an order independent of their current login status.

##### Test 1 - Register during checkout - Steps (Simplified):

```
  1. Navigate to the products page from home
  2. Search for an item
  3. Add it to the cart
  4. Verify that it has been added
  5. Attempt to checkout, and handle the login prompt
  6. Create a new user account
  7. Navigate back to the cart, and verify the item is still there
  8. Check that the address(s) match that of the user account.
  9. Fill the payment info form with card details
  10. Place order and verify that the invoice and continue button are present.
```

##### Test 2 - Login during checkout - Steps (Simplified):

```
  1. Create a new user account and logout straight away (Can be mitigated with dedicated test accounts)
  2. Search for an item
  3. Add it to the cart
  4. Verify that it has been added
  5. Enter Checkout
  8. Check that the address(s) match that of the user account.
  9. Fill the payment info form with card details
  10. Place order and verify that the invoice and continue button are present.
```

##### Test 3 - Login Before checkout - Steps (Simplified):

```
  1. Navigate to the register page and create a user account
  2. Navigate to the products page and search for an item
  3. Add the item to the cart, and verify its addition
  4. Enter Checkout
  5. Check that the address(s) match that of the user account.
  6. Fill the payment info form with card details
  7. Place order and verify that the invoice and continue button are present.
```

### 4. Disgruntled customer submits a 'Contact Us' form

Goal: Ensure that the 'Contact us / Get in touch' form is working correctly. ( I also really wanted to write a angry review in the eyes of a customer :D)

##### Write a message, and attach a file to the contact us form before submitting - Steps (Simplified):

```
  1. Fills Name, Email, Subject, Message 
  2. Adds an attachment image 
  3. Check image has been attached successfully
  3. Submit the form
  4. Handle submission dialog
  5. Verify successful submission
```
## Running Tests

### Dependencies

```bash
"@faker-js/faker": "^9.7.0"
"@ghostery/adblocker-playwright": "^2.5.2"
"cross-fetch": "^4.1.0"
"dotenv": "^16.5.0"
```

### Locally

Install project dependencies with:

```bash
  npm install
```

To run single tests use:

```bash
  npx playwright test 'testname'.spec.js
```

To run all tests at once:

```bash
  npx playwright test
```

By default, these tests will run fully parrallel with 8 workers, to disable this you can either edit the playwright.config.js:

```bash
  fullyParallel: true/false
```

or by appending the test command with the ammount of workers you want to use.

```bash
  npx playwright test --workers 1/2/3 etc
```

### Github Actions

Github Actions Steps

```bash
  npm run test
```