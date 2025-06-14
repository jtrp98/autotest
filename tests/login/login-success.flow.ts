
import { test } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto('https://system.schoolbright.co/');
  await loginPage.login('849','01', '01');
});
