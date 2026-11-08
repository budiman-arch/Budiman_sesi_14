import { expect } from '@wdio/globals'
import fs from 'fs'
import loginAction from '../actions/login.action.js'
import appHelper from '../utilities/helpers/app.helper.js'
import credentials from '../test_data/credentials.js'

describe('Swag Labs App', () => {
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

    it('should login successfully with standard user', async () => {
        const isLoginPage = await loginAction.isOnLoginPage()
        await expect(isLoginPage).toBe(true)
        await loginAction.login(credentials.standard.username, credentials.standard.password)
        const isProductsVisible = await loginAction.waitForProducts()
        await expect(isProductsVisible).toBe(true)
    })

    it('should display an error message when logging in with a locked out user', async () => {
        const isLoginPage = await loginAction.isOnLoginPage()
        await expect(isLoginPage).toBe(true)
        await loginAction.login(credentials.locked.username, credentials.locked.password)
        const isErrorMessageDisplayed = await loginAction.isErrorMessageDisplayed()
        await expect(isErrorMessageDisplayed).toBe(true)
    })
})
