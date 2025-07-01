import { LoginPage } from '../../pages/login.page';

import { Page } from '@playwright/test';

export async function loginSuccess(page: Page) {
    const loginPage = new LoginPage(page);
    await page.goto('https://system.schoolbright.co/');
    await loginPage.login('849', 'sb01', '01');
}