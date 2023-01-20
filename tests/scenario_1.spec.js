const {test, expect} = require('@playwright/test');
const { Playground } = require('../pages/playground.page');

test('Go to LambdaTest’s and validate your enterd message',async({page})=>{
    const playground = new Playground(page);
    await playground.goto();
    await playground.formDemo.click();
    expect(page.url()).toContain("simple-form-demo") 

    const msg = "Welcome to LambdaTest"
    await playground.messageBox.type(msg);
    await playground.checkMsgBtn.click();
    const msgResponse = await page.locator('#message').textContent()
    expect(msgResponse).toEqual(msg);

})
