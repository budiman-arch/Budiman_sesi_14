class AppHelper {
    async launchApp() {
        await driver.activateApp('com.swaglabsmobileapp');
    }

    async closeApp() {
        await driver.closeApp('com.swaglabsmobileapp');
    }

    async resetApp() {
        await driver.execute('mobile: clearApp', { appId: 'com.swaglabsmobileapp' });
    }
}

export default new AppHelper();