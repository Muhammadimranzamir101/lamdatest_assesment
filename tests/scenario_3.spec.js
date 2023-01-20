const { chromium, test, expect, webkit, firefox } = require('@playwright/test');
const { Playground } = require('../pages/playground.page');

test('Go to LambdaTest’s submit empty form and validate error message', async () => {

    const capabilities = {
        'browserName': 'Chrome',
        'browserVersion': 'latest',
        'LT:Options': {
            'platform': 'Windows 10',
            'build': 'Playwright Lamda Test Assesment Build',
            'name': 'Scenario_3 Windows 10 - Chrome',
            'user': process.env.LT_USERNAME,
            'accessKey': process.env.LT_ACCESS_KEY,
            'network': true,
            'video': true,
            'console': true
        }
    }

    const browser = await chromium.connect({
        wsEndpoint: `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(JSON.stringify(capabilities))}`
    })

    const page = await browser.newPage();

    const playground = new Playground(page);
    await playground.goto();
    await playground.inputFormSbmt.click();
    await page.waitForLoadState('networkidle');
    await playground.sbmtBtn.click();
    await page.waitForTimeout(1000)

    const errorMsg = "Please fill out this field.";

    const message = await page.evaluate(() => {
        const name = document.querySelector("#name").validationMessage;
        return name;
    })

    try {
        expect(message).toEqual(errorMsg)
        await page.evaluate(_ => { }, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Error message found' } })}`)
    } catch {
        await page.evaluate(_ => { }, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: 'Error message not found' } })}`)
    }

    await browser.close()

})

test('Go to LambdaTest’s submit form and validate success message', async () => {

    const capabilities = {
        'browserName': 'pw-firefox',
        'browserVersion': 'latest',
        'LT:Options': {
            'platform': 'MacOS Monterey',
            'build': 'Playwright Lamda Test Assesment Build',
            'name': 'Scenario_3 MacOs Monterey - firefox',
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
    await playground.inputFormSbmt.click();
    await page.waitForLoadState('networkidle');

    await playground.fillForm()
    await playground.sbmtBtn.click()
    await page.waitForTimeout(2000)

    const successMsg = "Thanks for contacting us, we will get back to you shortly.";
    const outputMsg = await page.locator('p.success-msg').textContent();


    try {
        expect(successMsg).toEqual(outputMsg)

        await page.evaluate(_ => { }, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Success message found' } })}`)
    } catch {
        await page.evaluate(_ => { }, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: 'Succes message not found' } })}`)
    }

    await browser.close()
})
