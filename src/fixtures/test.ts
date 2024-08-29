import test, { expect } from '@playwright/test';
import { App } from 'pages';
import { GlobalEnvironmentT } from 'types';

const travelTest = test.extend<{
    globalEnv: GlobalEnvironmentT;
    app: App;
}>({
    globalEnv: async ({}, use) => {
        const globalEnvStr = process.env.globalEnv;
        if (!globalEnvStr) {
            throw new Error('Global environment variable "globalEnv" is not set');
        }
        const globalEnv = JSON.parse(globalEnvStr) as GlobalEnvironmentT;
        await use(globalEnv);
    },

    app: async ({ page }, use) => {
        await use(new App(page));
    }
});

export { travelTest, expect };
