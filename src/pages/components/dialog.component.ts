import { expect } from '@playwright/test';
import { AppPage } from 'pages/abstractClasses';

export class DialogComponent extends AppPage {
    getDialogContainer = this.page.locator('#CybotCookiebotDialog');

    getDialogConfirmButton = this.page.locator(
        '#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll'
    );

    async expectLoaded() {
        await expect.soft(this.getDialogContainer).toBeVisible();
    }

    async clickOnConfirmDialog() {
        await this.getDialogConfirmButton.click();
    }
}
