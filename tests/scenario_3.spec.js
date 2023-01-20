const { test, expect } = require('@playwright/test');
const { Playground } = require('../pages/playground.page');

test('Go to LambdaTest’s submit empty form and validate error message', async ({ page }) => {
    const playground = new Playground(page);
    await playground.goto();
    await playground.inputFormSbmt.click();
    await page.waitForLoadState('networkidle');
    await playground.sbmtBtn.click();
    await page.waitForTimeout(1000)

    const errorMsg = "Please fill in this field.";
 
    const message = await page.evaluate(()=>{
        const name = document.querySelector("#name").validationMessage;
        return name;
    })

    console.log("message", message)
    expect(message).toEqual(errorMsg)
})

test.only('Go to LambdaTest’s submit form and validate success message', async({page})=>{
    const playground = new Playground(page);
    await playground.goto();
    await playground.inputFormSbmt.click();
    await page.waitForLoadState('networkidle');

    await playground.fillForm()
    await playground.sbmtBtn.click()
    await page.waitForTimeout(2000)

    const successMsg = "Thanks for contacting us, we will get back to you shortly.";
    const outputMsg = await page.locator('p.success-msg').textContent();
    expect(successMsg).toEqual(outputMsg)
})
