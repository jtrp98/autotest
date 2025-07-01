import { defineConfig } from '@playwright/test';

export default defineConfig({
  globalSetup: require.resolve('./tests/globalSetup'),
  use: {
    storageState: 'storageState.json',
    headless: false,
  },
});
