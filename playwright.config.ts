import { PlaywrightTestConfig } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Upload variables from local .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

const config: PlaywrightTestConfig = {
    testDir: './src/tests',
    globalSetup: require.resolve('./src/global-setup'),
    outputDir: 'report/playwright-test-results',
    workers: 1,
    fullyParallel: false,
    reporter: [
        ['list'],
        ['junit', { outputFile: 'report/junit/playwright-results.xml' }],
        ['html', { outputFolder: 'report/html', open: 'never' }]
    ],

    use: {
        browserName: 'chromium',
        channel: 'chrome',
        launchOptions: {
            headless: process.env.CI ? true : false,
            // Change this value for debugging purposes
            slowMo: 0
        },
        // trace: 'on-first-retry',
        video: 'on-first-retry',
        screenshot: 'only-on-failure',
        permissions: ['clipboard-read', 'clipboard-write'],
        acceptDownloads: true
    }
};

export default config;
