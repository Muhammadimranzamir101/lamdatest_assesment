const { test, expect, chromium, firefox } = require('@playwright/test');
const { Playground } = require('../pages/playground.page');

test('Go to LambdaTest’s and validate your enterd message', async () => {

    const capabilities = {
        'browserName': 'pw-firefox',
        'browserVersion': 'latest',
        'LT:Options': {
            'platform': 'Windows 10',
            'build': 'Playwright Lamda Test Assesment Build',
            'name': 'Scenario_1 Windows 10 - Firefox',
            'user': process.env.LT_USERNAME,
            'accessKey': process.env.LT_ACCESS_KEY,
            'network': true,
            'video': true,
            'console': true
        }
    }

    const browser = await firefox.connect({
        wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
    })

    const page = await browser.newPage();

    const playground = new Playground(page);
    await playground.goto();
    await playground.formDemo.click();
    expect(page.url()).toContain("simple-form-demo")

    const msg = "Welcome to LambdaTest"
    await playground.messageBox.type(msg);
    await playground.checkMsgBtn.click();
    const msgResponse = await page.locator('#message').textContent()


    try {
        expect(msgResponse).toEqual(msg);
        await page.evaluate(_ => { }, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Message matched' } })}`)
    } catch {
        await page.evaluate(_ => { }, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: 'Message not matched' } })}`)
    }

    await browser.close()

})
