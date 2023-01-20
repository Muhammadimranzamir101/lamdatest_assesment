const {expect } = require('@playwright/test');
import data from '../test_data/form.json';

exports.Playground =  class Playground{

    constructor(page){
        this.page = page;
        this.formDemo = page.locator('a[href*="simple-form-demo"]')
        this.messageBox = page.locator('input#user-message')
        this.checkMsgBtn = page.locator('#showInput')
        this.dndSlider = page.locator('//a[text()="Drag & Drop Sliders"]')
        this.inputFormSbmt = page.getByText("Input Form Submit")
        this.sbmtBtn = page.locator('button[type="submit"]').nth(1)
        this.name = page.locator("#name");
        this.email = page.locator('#inputEmail4')
        this.pwd = page.locator('#inputPassword4')
        this.company = page.locator('#company')
        this.web = page.locator('#websitename')
        this.country = page.locator('select[name="country"]')
        this.city = page.locator('#inputCity')
        this.add1 = page.locator('#inputAddress1')
        this.add2 = page.locator('#inputAddress2')
        this.state = page.locator('#inputState')
        this.zip = page.locator('#inputZip')
    }

    async goto(){
        await this.page.goto('selenium-playground/')
        await this.page.waitForLoadState('networkidle');
    }

    async fillForm(){
        await this.name.type(data.name);
        await this.email.type(data.email);
        await this.pwd.type(data.password);
        await this.company.type(data.company);
        await this.web.type(data.website);
        await this.country.selectOption({ label: 'United States' })
        await this.city.type(data.city);
        await this.add1.type(data.address1);
        await this.add2.type(data.address2);
        await this.state.type(data.state);
        await this.zip.type(data.zipCode);
    }

}