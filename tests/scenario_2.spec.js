const { test, expect, chromium } = require('@playwright/test');
const { Playground } = require('../pages/playground.page');

test('Go to LambdaTest’s, move slider and validate its value', async () => {

    const capabilities = {
        'browserName': 'MicrosoftEdge',
        'browserVersion': 'latest',
        'LT:Options': {
            'platform': 'macOS Mojave',
            'build': 'Playwright Lamda Test Assesment Build',
            'name': 'Scenario_2 macOS Mojave - MicrosoftEdge',
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
    await playground.dndSlider.click();
    await page.waitForLoadState('networkidle');
    const targetValue = "95";

    const slider = page.locator('input.sp__range').nth(2)
    const sliderBoundingBox = await slider.boundingBox();
    await slider.dragTo(slider, {
        force: true,
        targetPosition: {
            //as the slider header has width so when passing 0.95 the slider is moving to 97 hence passing 0.93...
            x: sliderBoundingBox.width * 0.93, 
            y: 0,
        },
    });


    const value = await page.locator("#rangeSuccess").textContent();
    console.log("Value",value)
    expect(value).toEqual(targetValue);

    try {
        expect(value).toEqual(targetValue);

        await page.evaluate(_ => { }, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'passed', remark: 'Slider value validated' } })}`)
    } catch {
        await page.evaluate(_ => { }, `lambdatest_action: ${JSON.stringify({ action: 'setTestStatus', arguments: { status: 'failed', remark: 'Slider value not validated' } })}`)
    }

    await browser.close()

})
