import { test } from '../../helpers/discordNotificationHelper';
import { expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';

test.describe('ทดสอบระบบ Login', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://system.schoolbright.co/');
    });

    test('เข้าสู่ระบบด้วยข้อมูลที่ถูกต้อง', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('849', '01', '01');

        await expect(page).toHaveURL(/.*AdminMain.aspx/);
    });

    test('username ผิด password ถูก', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('849', '011', '01');

        await expect(page.locator('#modal-content')).toContainText('ไม่สามารถเข้าสู่ระบบได้');
        await expect(page.locator('#modal-content')).toContainText('กรุณาตรวจสอบชื่อผู้ใช้หรือรหัสผ่าน');

    });

    test('username ถูก password ผิด', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('849', '01', '02');

        await expect(page.locator('#modal-content')).toContainText('ไม่สามารถเข้าสู่ระบบได้');
        await expect(page.locator('#modal-content')).toContainText('กรุณาตรวจสอบชื่อผู้ใช้หรือรหัสผ่าน');

    });

    test('username และ password ผิดทั้งคู่', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.login('849', '011', '011');

        await expect(page.locator('#modal-content')).toContainText('ไม่สามารถเข้าสู่ระบบได้');
        await expect(page.locator('#modal-content')).toContainText('กรุณาตรวจสอบชื่อผู้ใช้หรือรหัสผ่าน');

    });
});
