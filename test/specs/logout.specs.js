import { expect } from '@wdio/globals'
import fs from 'fs'
import loginAction from '../actions/login.action.js'
import { HomeAction } from '../actions/home.action.js'
import appHelper from '../utilities/helpers/app.helper.js'
import credentials from '../test_data/credentials.js'

describe('Swag Labs App - Logout', () => {
    const homeAction = new HomeAction()

    beforeEach(async () => {
        await appHelper.resetApp()
        await appHelper.launchApp()
    })
    
    afterEach(async function () {
        if (this.currentTest.state === "failed") {
            const screenshot = await browser.takeScreenshot()
            fs.mkdirSync('./reports/screenshots', { recursive: true })
            fs.writeFileSync(`./reports/screenshots/${this.currentTest.title}.png`, screenshot, 'base64')
        }
    })

    after(async () => {
        await appHelper.closeApp()
    })

    it('should logout successfully', async () => {
        const isLoginPage = await loginAction.isOnLoginPage()
        await expect(isLoginPage).toBe(true)
        await loginAction.login(credentials.problem.username, credentials.problem.password)
        const isProductsVisible = await loginAction.waitForProducts()
        await expect(isProductsVisible).toBe(true)
        await homeAction.tapBurgerMenu()
        await homeAction.tapLogout()
        const isBackToLoginPage = await loginAction.isOnLoginPage()
        await expect(isBackToLoginPage).toBe(true)
    })
})