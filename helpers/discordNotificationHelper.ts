import { test as baseTest } from '@playwright/test';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
if (!webhookUrl) throw new Error('DISCORD_WEBHOOK_URL not defined in .env');

const results: { title: string; status: 'passed' | 'failed' }[] = [];

export const test = baseTest.extend({});
const resultsByDescribe: Record<string, { title: string; status: 'passed' | 'failed' }[]> = {};

test.afterEach(async ({ }, testInfo) => {
    const status = testInfo.status === 'passed' ? 'passed' : 'failed';
    const describeName = testInfo.titlePath.length > 1 ? testInfo.titlePath[0] : 'No Describe';
    const testTitle = testInfo.title;

    if (!resultsByDescribe[describeName]) {
        resultsByDescribe[describeName] = [];
    }
    resultsByDescribe[describeName].push({ title: testTitle, status });
});

test.afterAll(async () => {
    for (const describeName in resultsByDescribe) {
        const results = resultsByDescribe[describeName];
        const passed = results.filter(r => r.status === 'passed').length;
        const failed = results.filter(r => r.status === 'failed').length;

        let content = `Test results: - ${describeName} -\n\nPassed: ${passed}\nFailed: ${failed}\n\nDetails:\n`;
        results.forEach(r => {
            content += ` ${r.title}: ${r.status}\n`;
        });

        await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content }),
        });
    }
});
