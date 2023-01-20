const { test, expect } = require('@playwright/test');
const { Playground } = require('../pages/playground.page');

test('Go to LambdaTest’s and validate your enterd message', async ({ page }) => {
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

})
