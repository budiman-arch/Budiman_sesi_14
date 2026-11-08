import homePage from '../pageobjects/home.page.js'

export class HomeAction {
    async verifyHomePage () {
        const filterButton = await $(homePage.filterButton)
        const burgerMenuButton = await $(homePage.burgerMenuButton)
        const addToCartButton = await $$(homePage.addToCartButton)[0]

        // Make sure all elements are displayed
        await filterButton.waitForExist({ timeout: 5000 })
        return filterButton.isDisplayed()

        await burgerMenuButton.waitForExist ({ timeout: 5000 })
        return burgerMenuButton.isDisplayed()

        await addToCartButton.waitForExist({ timeout: 5000 })
        return addToCartButton.isDisplayed()
    }

    async tapBurgerMenu () {
        const burgerMenuButton = $(homePage.burgerMenuButton);
        await burgerMenuButton.click()
    }

    async tapLogout () {
        const logoutButton = $(homePage.logoutButton);
        await logoutButton.click()
    }

    async tapFilter () {
        const filterButton = $(homePage.filterButton);
        await filterButton.click()
    }

    async tapSortPriceHighLow () {
        await this.tapFilter()
        const option = await $(homePage.sortPriceHighLow)
        await option.waitForDisplayed({ timeout: 10000 })
        await option.click()
    }

    async getProductPrices () {
        await driver.waitUntil(async () => (await $$(homePage.productPrices)).length > 0, { timeout: 10000 })
        const priceElements = await $$(homePage.productPrices)
        const prices = []
        for (const priceElement of priceElements) {
            const text = await priceElement.getText()
            prices.push(parseFloat(text.replace('$', '')))
        }
        return prices
    }

    async tapCancel () {
        const cancelButton = $(homePage.cancelButton);
        await cancelButton.click()
    }

    async tapAddToCart () {
        const addToCartButton = $$(homePage.addToCartButton)[0];
        await addToCartButton.click()
    }

    async scroll() {
        // Scroll Down
        await driverConfig.touchAction([
            { action: 'press', x: 500, y: 1500},
            { action: 'moveTo', x: 500, y: 500},
            'release'
        ]);

        // Scroll Up
        await driverConfig.touchAction([
            { action: 'press', x: 500, y: 500},
            { action: 'moveTo', x: 1500, y: 500},
            'release'
        ])
    }

    async scrollToElement(selector, maxSwipes = 10) {
        for (let i = 0; i < maxSwipes; i++) {
            const element = await $(selector);
            const isDisplayed = await element.isDisplayed();
            if (isDisplayed) return true;

            await this.scroll('up');
        }
        return false;
    }

    async scroll(direction = 'down') {
        const { height, width } = await driver.getWindowSize();
        const startY = direction === 'down' ? height * 0.8 : height * 0.2;
        const endY = direction === 'down' ? height * 0.2 : height * 0.8;

        await driver.performActions([
            {
                type: 'pointer',
                id: 'pointer1',
                actions: [
                    { type: 'pointerMove', x: width / 2, y: startY, duration: 100 },
                    { type: 'pointerDown', duration: 100 },
                    { type: 'pointerMove', x: width / 2, y: endY, duration: 500 },
                    { type: 'pointerUp', duration: 100 }
                ]
            }
        ]);
    }

    async swipe(direction = 'down') {
        const { height, width } = await driver.getWindowSize();
        const startY = direction === 'down' ? height * 0.8 : height * 0.2;
        const endY = direction === 'down' ? height * 0.2 : height * 0.8;

        await driver.performActions([
            {
                type: 'pointer',
                id: 'pointer1',
                actions: [
                    { type: 'pointerMove', x: width / 2, y: startY, duration: 100 },
                    { type: 'pointerDown', duration: 100 },
                    { type: 'pointerMove', x: width / 2, y: endY, duration: 500 },
                    { type: 'pointerUp', duration: 100 }
                ]
            }
        ]);
    }
}