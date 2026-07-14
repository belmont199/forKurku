const CATEGORY_URL =
    'https://servisebi.ge/ka/product/182/%E1%83%99%E1%83%9D%E1%83%9C%E1%83%93%E1%83%98%E1%83%AA%E1%83%98%E1%83%9D%E1%83%9C%E1%83%94%E1%83%A0%E1%83%98%E1%83%A1-%E1%83%AE%E1%83%94%E1%83%9A%E1%83%9D%E1%83%A1%E1%83%90%E1%83%9C%E1%83%98';

// The banner to push out of first place: "კონდენციონერის ხელოსანი" card
// (client name "კონდიციონერის ხელოსანი", phone 511-13-**-**)
const TARGET_PRODUCT_ID = '32663';

const MAX_REFRESHES = 30;

async function getFirstCardProductId() {
    const firstCardImage = browser.$('.products-list-container img[data-product-card-id]');
    await firstCardImage.waitForExist();
    return firstCardImage.getAttribute('data-product-card-id');
}

describe('Servisebi.ge category listing', () => {
    it(`should refresh until banner ${TARGET_PRODUCT_ID} is not first in the list`, async () => {
        await browser.url(CATEGORY_URL);

        let firstId = await getFirstCardProductId();
        let refreshes = 0;

        while (firstId === TARGET_PRODUCT_ID && refreshes < MAX_REFRESHES) {
            refreshes++;
            console.log(`Refresh #${refreshes}: banner ${TARGET_PRODUCT_ID} is still first`);
            await browser.refresh();
            firstId = await getFirstCardProductId();
        }

        console.log(`First card after ${refreshes} refresh(es): product ${firstId}`);
        expect(firstId).not.toBe(TARGET_PRODUCT_ID);
    });
});
