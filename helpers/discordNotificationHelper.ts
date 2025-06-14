import { test as baseTest } from '@playwright/test';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
if (!webhookUrl) throw new Error('DISCORD_WEBHOOK_URL not defined in .env');

const results: { title: string; status: 'passed' | 'failed' }[] = [];

export const test = baseTest.extend({});

test.afterEach(async ({ }, testInfo) => {
    let status: 'passed' | 'failed';

    if (testInfo.status === 'passed') {
        status = 'passed';
    } else {
        status = 'failed';
    }

    results.push({ title: testInfo.title, status });
});


test.afterAll(async () => {
    const passed = results.filter(r => r.status === 'passed').length;
    const failed = results.filter(r => r.status === 'failed').length;

    let content = `Test results:\nPassed: ${passed}\nFailed: ${failed}\n\nDetails:\n`;
    results.forEach(r => {
        content += `- ${r.title}: ${r.status}\n`;
    });

    await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
    });
});
