import { chromium } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

async function globalSetup() {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    const loginPage = new LoginPage(page);
    await page.goto('https://system.schoolbright.co/');
    await loginPage.login('849', 'sb01', '01');

    await context.storageState({ path: 'storageState.json' });

    await browser.close();
}

export default globalSetup;
