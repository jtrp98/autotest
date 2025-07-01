import { Page } from '@playwright/test';
export class StudentListPage {
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

    async search(year:string , term :string , level:string,classroom:string,seachname:string) {
        await this.selectField("#sltYear",year)
        await this.selectField("#sltTerm",term)
        await this.selectField("#sltLevel",level)
        await this.selectField("#sltClass",classroom)
        await this.selectField("#iptStudentName",seachname)
        await this.clickButton("#btnSearch")
    }

}