const {expect } = require('@playwright/test');

exports.Playground =  class Playground{

    constructor(page){
        this.page = page;
        this.formDemo = page.locator('a[href*="simple-form-demo"]')
        this.messageBox = page.locator('input#user-message')
        this.checkMsgBtn = page.locator('#showInput')
        this.dndSlider = page.locator('//a[text()="Drag & Drop Sliders"]')
    }

    async goto(){
        await this.page.goto('selenium-playground/')
        await this.page.waitForLoadState('networkidle');
    }

}