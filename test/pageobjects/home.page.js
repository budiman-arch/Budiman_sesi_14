class HomePage {
    get productsTitle() {
        return 'android=new UiSelector().text("PRODUCTS")';
    }

    get burgerMenuButton() {
        return "~test-Menu";
    }

    get filterButton() {
        return "~test-Modal Selector Button";
    }

    get productTitles() {
        return "~test-Item title";
    }

    get productPrices() {
        return "~test-Price";
    }

    get sortNameAZ() {
        return 'android=new UiSelector().text("Name (A to Z)")';
    }

    get sortNameZA() {
        return 'android=new UiSelector().text("Name (Z to A)")';
    }

    get sortPriceLowHigh() {
        return 'android=new UiSelector().text("Price (low to high)")';
    }

    get sortPriceHighLow() {
        return 'android=new UiSelector().text("Price (high to low)")';
    }

    get cancelButton() {
        return 'android=new UiSelector().text("Cancel")';
    }

    get addToCartButton() {
        return "~test-ADD TO CART";
    }

    get logoutButton() {
        return "~test-LOGOUT";
    }
}

export default new HomePage();