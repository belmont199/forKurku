const PRODUCT_URL =
    'https://servisebi.ge/ka/product/182/%E1%83%99%E1%83%9D%E1%83%9C%E1%83%93%E1%83%98%E1%83%AA%E1%83%98%E1%83%9D%E1%83%9C%E1%83%94%E1%83%A0%E1%83%98%E1%83%A1-%E1%83%AE%E1%83%94%E1%83%9A%E1%83%9D%E1%83%A1%E1%83%90%E1%83%9C%E1%83%98';

describe('Servisebi.ge product page', () => {
    it('should open the product page and refresh it', async () => {
        await browser.url(PRODUCT_URL);

        await expect(browser).toHaveUrl(expect.stringContaining('/ka/product/182/'));

        const titleBefore = await browser.getTitle();
        console.log(`Page title before refresh: ${titleBefore}`);

        await browser.refresh();

        await expect(browser).toHaveUrl(expect.stringContaining('/ka/product/182/'));

        const titleAfter = await browser.getTitle();
        console.log(`Page title after refresh: ${titleAfter}`);
    });
});
