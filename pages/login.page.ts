import { Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async fillField(selector: string, value: string) {
        await this.page.fill(selector, value);
    }
    async clickButton(selector: string) {
        await this.page.click(selector);
    }

    async selectField(selector:string,value:string){
        await this.page.selectOption(selector,value)
    }

    async login(school:string,username: string, password: string) {
        await this.selectField('#sltSchool', school);
        await this.fillField('#iptUsername', username);
        await this.fillField('#iptPassword', password);
        await this.clickButton('#btnLogin');
        await this.page.waitForLoadState('networkidle');
    }

}
