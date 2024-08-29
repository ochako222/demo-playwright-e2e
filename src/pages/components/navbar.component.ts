import { expect } from '@playwright/test';
import { AppPage } from 'pages/abstractClasses';

export class NavbarComponent extends AppPage {
    getHeaderTopMenuContainer = this.page.locator('[data-cy="header-top-menu"]');

    getLoginButton = this.page.locator('[data-cy="header-user-box-toggle-button"]');

    getLogo = this.page.locator('.b-header-logo');

    getNavigationActionsContainer = this.page.locator('[data-cy="menu-main"]');

    async expectLoaded() {
        await expect(this.getHeaderTopMenuContainer).toBeVisible();
        await expect(this.getLoginButton).toBeVisible();
        await expect(this.getLogo).toBeVisible();
        await expect(this.getNavigationActionsContainer).toBeVisible();
    }

    async clickOnLogIn() {
        await this.getLoginButton.click();
    }
}
