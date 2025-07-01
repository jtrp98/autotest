import { test } from '../../helpers/discordNotificationHelper';
import { expect } from '@playwright/test';
import { ensureLoggedIn } from '../../helpers/login-session.helper';
import { StudentListPage } from '../../pages/StudentInfo/studentlist.page';

test.describe('ข้อมูลนักเรียน', () => {
    test.beforeAll(async () => {
        await ensureLoggedIn();
    });

    test.beforeEach(async ({ page }) => {
        await page.goto('https://system.schoolbright.co/StudentInfo/StudentList.aspx');
    });

    test('ค้นหา1', async ({ page }) => {
        const studentListPage = new StudentListPage(page);
        await expect(page).toHaveURL(/.*StudentList.aspx/);
    });
});
