import { expect, Locator } from '@playwright/test';

export async function expectErrorMessages(modal: Locator, messages: string[]) {
    for (const message of messages) {
        await expect(modal).toContainText(message);
    }
}