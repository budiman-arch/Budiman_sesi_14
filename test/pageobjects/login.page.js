export class LoginPage {
    get loginButton() {
        return 'android=new UiSelector().text("LOGIN")'
    }

    get productsTitle() {
        return 'android=new UiSelector().text("PRODUCTS")'
    }

    get usernameInput() {
        return 'android.widget.EditText'
    }

    get errorMessage() {
        return 'android=new UiSelector().text("Sorry, this user has been locked out.")'
    }
}

export default new LoginPage()