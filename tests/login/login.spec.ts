import { test } from '../../helpers/discordNotificationHelper';
import { expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { expectErrorMessages } from '../../helpers/assertion.helper';

test.describe('Login', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://system.schoolbright.co/');
    });

    test('เข้าสู่ระบบด้วยข้อมูลที่ถูกต้อง', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('849', 'sb01', '01');
        await expect(page).toHaveURL(/.*AdminMain.aspx/);
    });

    const testCases = [
        {
            user: '011',
            pass: '01',
            desc: 'username ผิด',
            expectedMessages: ['ไม่สามารถเข้าสู่ระบบได้', 'กรุณาตรวจสอบชื่อผู้ใช้หรือรหัสผ่านของท่านอีกครั้ง']
        },
        {
            user: '01',
            pass: '011',
            desc: 'password ผิด',
            expectedMessages: ['ไม่สามารถเข้าสู่ระบบได้', 'กรุณาตรวจสอบชื่อผู้ใช้หรือรหัสผ่านของท่านอีกครั้ง']
        }
    ];

    for (const { user, pass, desc, expectedMessages } of testCases) {
        test(desc, async ({ page }) => {
            const loginPage = new LoginPage(page);
            await loginPage.login('849', user, pass);

            await expectErrorMessages(page.locator('#modal-content'), expectedMessages);
        });
    }
});
