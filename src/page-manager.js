// Functionality needed throughout all pages
import { PlaywrightBlocker } from '@ghostery/adblocker-playwright';
import { test, expect } from '@playwright/test'
import fetch from 'cross-fetch';

const { LoginPage } = require('./pages/login.page'); 
const { SignupPage } = require('./pages/signup.page'); 
const { NavBar } = require('./pages/navbar.page');
const { ProductPage } = require('./pages/product.page');
const { CartPage } = require('./pages/cart.page');
const { PaymentPage } = require('./pages/payment.page');
const { ContactPage } = require('./pages/contact.page')

class PageManager
{
    constructor(page)
    {
        this.login = new LoginPage(page);
        this.signup = new SignupPage(page);
        this.moveTo = new NavBar(page);
        this.product = new ProductPage(page);
        this.cart = new CartPage(page);
        this.payment = new PaymentPage(page);
        this.contact = new ContactPage(page);
    }
}

module.exports = { PageManager, PlaywrightBlocker, test, expect, fetch };