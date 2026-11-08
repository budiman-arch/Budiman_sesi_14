import { expect } from '@wdio/globals'
import fs from 'fs'
import loginAction from '../actions/login.action.js'
import { HomeAction } from '../actions/home.action.js'
import appHelper from '../utilities/helpers/app.helper.js'
import credentials from '../test_data/credentials.js'

describe('Swag Labs App', () => {
    const homeAction = new HomeAction();

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

    it('should sort products by Price (high to low)', async () => {
        await loginAction.isOnLoginPage()
        await loginAction.login(credentials.standard.username, credentials.standard.password)
        await loginAction.waitForProducts()

        await homeAction.tapSortPriceHighLow()
        const prices = await homeAction.getProductPrices()
        await expect(prices).toEqual([...prices].sort((a, b) => b - a))

        await homeAction.tapBurgerMenu()     // ← logout ikut di sini
        await homeAction.tapLogout()
    })
})