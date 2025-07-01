import { chromium } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import fs from 'fs';

export async function ensureLoggedIn() {
    if (fs.existsSync('storageState.json')) {
        console.log('Session file exists, no need to login');
        return;
    }

    console.log('Session file missing, performing login');
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    const loginPage = new LoginPage(page);
    await page.goto('https://system.schoolbright.co/');
    await loginPage.login('849', 'sb01', '01');

    await context.storageState({ path: 'storageState.json' });
    await browser.close();
}
