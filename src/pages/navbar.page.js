import { expect, Page, locator } from '@playwright/test';
require('dotenv').config();

export class NavBar
{
    constructor(page)
    {
        this.page = page;
    }
    
    siteRoot()
    {
        // Sends browser to the root/home page
        const rooturl = process.env.BASE_URL;
        return this.page.goto(rooturl);
    }

    async tabName(tab, url)
    {
        // Sends browser to the requested tab and waits for the URL to update
        // This is ugly, BUT it did fix a locator error with webkit so.... B)
        await this.page.getByRole('link', { name: tab }).first().click();
        await this.page.waitForURL(`**/${url}`);
    }
}