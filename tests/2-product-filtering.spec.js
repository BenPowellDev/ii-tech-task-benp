import { PageManager, PlaywrightBlocker, fetch, test, expect } from '../src/page-manager';

test('Ensure products sort by brand correctly for all unique API brands', async ({ page, request }) => 
{
    // Sets up the page manager
    const pm = new PageManager(page);
  
    // Ad blocking with playwrightblocker, not ideal but the ads were really annoying. :'(
    const blocker = await PlaywrightBlocker.fromPrebuiltAdsAndTracking(fetch);
    await blocker.enableBlockingInPage(page);
  
    // Navigate to site root
    await pm.moveTo.siteRoot();
  
    // Fetch the list of brands from the API
    const response = await request.get('https://automationexercise.com/api/brandsList');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    const brandsData = responseBody.brands;
  
    // Extract unique brand names using a Set
    const uniqueBrands = new Set(brandsData.map(brandObject => brandObject.brand));
  
    // Converts the Set back to an array for iteration
    const uniqueBrandList = Array.from(uniqueBrands);
  
    // Ensure the API returned at least one unique brand
    expect(uniqueBrandList.length).toBeGreaterThan(0);
  
    // Iterate through the unique brands fetched from the API
    for (const brandName of uniqueBrandList) {
      const encodedBrand = brandName.replace(/ /g, '%20');
  
      console.log(`Testing brand from API: ${brandName}`);
      await pm.product.sortByBrand(brandName);
  
      // Wait for the correct URL after sorting
      await page.waitForURL(`**/brand_products/${encodedBrand}`);
    }
});