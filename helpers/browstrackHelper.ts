import { chromium, Browser, BrowserContext, Page } from 'playwright';

const caps = {
    browser: 'chrome',
    browser_version: 'latest',
    os: 'Windows',
    os_version: '11',
    name: 'My Playwright Test',  // ชื่อเทส
    build: 'Build 1',
    'browserstack.username': process.env.BROWSERSTACK_USERNAME,
    'browserstack.accessKey': process.env.BROWSERSTACK_ACCESS_KEY,
};

export async function launchBrowserStack(): Promise<{ browser: Browser, context: BrowserContext, page: Page }> {
    const wsEndpoint = `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(caps))}`;

    const browser = await chromium.connectOverCDP({ wsEndpoint });
    const context = await browser.newContext();
    const page = await context.newPage();

    return { browser, context, page };
}
