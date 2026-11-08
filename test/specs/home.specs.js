import { expect } from '@wdio/globals';
import { HomeAction } from '../actions/home.action.js';
import { LoginAction } from '../actions/login.action.js';

describe('Home Page', () => {
    const homeAction = new HomeAction();
    const loginAction = new LoginAction();

    it('verify homepage, scroll down/up, filter and logout', async () => {
        // Login
        await loginAction.isOnLoginPage();
        await loginAction.login('standard_user', 'secret_sauce');

        // Verify homepage
        await homeAction.verifyHomePage();

        await homeAction.scroll('down');
        await homeAction.swipe('up');

        await homeAction.tapFilter();
        await homeAction.tapCancel();

        await homeAction.tapBurgerMenu();
        await homeAction.tapLogout();
    });
});