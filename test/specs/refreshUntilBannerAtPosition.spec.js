const CATEGORY_URL =
    'https://servisebi.ge/ka/product/182/%E1%83%99%E1%83%9D%E1%83%9C%E1%83%93%E1%83%98%E1%83%AA%E1%83%98%E1%83%9D%E1%83%9C%E1%83%94%E1%83%A0%E1%83%98%E1%83%A1-%E1%83%AE%E1%83%94%E1%83%9A%E1%83%9D%E1%83%A1%E1%83%90%E1%83%9C%E1%83%98';

// The banner we are waiting for: "კონდენციონერის ხელოსანი" card
// (client name "კონდიციონერის ხელოსანი", phone 511-13-**-**)
const TARGET_PRODUCT_ID = '32663';

// 1-based position in the list the banner must reach.
const TARGET_POSITION = 3;

// Premium banners rotate on every page load, so landing a specific one
// on a specific position can take many refreshes.
const MAX_REFRESHES = 100;

async function getProductIdAtPosition(position) {
    await browser.$('.products-list-container img[data-product-card-id]').waitForExist();
    const cardImages = await browser.$$('.products-list-container img[data-product-card-id]');
    if (cardImages.length < position) {
        return null;
    }
    return cardImages[position - 1].getAttribute('data-product-card-id');
}

describe('Servisebi.ge category listing', () => {
    it(`should refresh until banner ${TARGET_PRODUCT_ID} is at position ${TARGET_POSITION}`, async () => {
        await browser.url(CATEGORY_URL);

        let idAtPosition = await getProductIdAtPosition(TARGET_POSITION);
        let refreshes = 0;

        while (idAtPosition !== TARGET_PRODUCT_ID && refreshes < MAX_REFRESHES) {
            refreshes++;
            console.log(`Refresh #${refreshes}: position ${TARGET_POSITION} is ${idAtPosition}, waiting for ${TARGET_PRODUCT_ID}`);
            await browser.refresh();
            idAtPosition = await getProductIdAtPosition(TARGET_POSITION);
        }

        console.log(`Position ${TARGET_POSITION} after ${refreshes} refresh(es): product ${idAtPosition}`);
        expect(idAtPosition).toBe(TARGET_PRODUCT_ID);
    });
});
