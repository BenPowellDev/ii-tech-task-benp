import { expect } from '@playwright/test';

export class ProductPage
{
    constructor(page)
    {
        this.page = page;

        // Page Elements
        this.pageTitle = page.locator("//div[@class='features_items']");
        
        // Input Fields
        this.searchBox = page.locator("//input[@id='search_product']");

        // Butons
        this.searchButton = page.locator("//button[@id='submit_search']");
        this.addToCartButton = page.locator("//div[@class='productinfo text-center']//a[@class='btn btn-default add-to-cart'][normalize-space()='Add to cart']");
        this.viewCartButton = page.locator("//u[normalize-space()='View Cart']");
    }

    async searchAndAdd(item)
    {
        // Ensures the search box and button are visible
        await expect(this.searchBox).toBeVisible();
        await expect(this.searchButton).toBeVisible();

        // Fills the search text box with 'item' and clicks the search button
        await this.searchBox.fill(item);
        await this.searchButton.click();

        // Ensures the searched product is visible on the page
        await expect(this.page.getByText(item).nth(1)).toBeVisible();
        await expect(this.addToCartButton).toBeVisible();
        
        // Add the product to the cart
        await this.addToCartButton.click();

        // Check the view cart button is visible and go to the cart
        await expect(this.viewCartButton).toBeVisible();
        await this.viewCartButton.click();
    }

    async sortByBrand(brand) 
    {
        // Selects the brand button to the left of the page
        await this.page.locator('ul.nav-pills.nav-stacked > li').filter({ hasText: brand }).click();
    
        // Checks that the page title has updated correctly
        await expect(this.pageTitle).toContainText(brand);
    }
}