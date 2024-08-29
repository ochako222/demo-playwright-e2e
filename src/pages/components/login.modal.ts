import { expect } from '@playwright/test';
import { AppPage } from '../abstractClasses';

export class LoginModal extends AppPage {
    getModalTitle = this.page.locator('[data-cy="login-form-wrapper"] h2');

    getEmailInput = this.page.locator('#login_email');

    getPasswordInput = this.page.locator('#login_password');

    getResetButton = this.page.locator('[data-cy="login-form-wrapper"] a').nth(3);

    getConfirmLoginButton = this.page.locator('[data-cy="login-form-submit"]');

    getSignInLink = this.page.locator('[data-cy="login-form-wrapper"] a').nth(1);

    getErrorMessage = this.page.locator('.message__message');

    getLoader = this.page.locator('.loader');

    async expectLoaded() {
        await expect(this.getModalTitle).toBeVisible();
        await expect(this.getEmailInput).toBeVisible();
        await expect(this.getPasswordInput).toBeVisible();
    }

    async fillInLoginForm(name: string, password: string, options?: { modifyInputs: boolean }) {
        // Remove default HTML5 input validators
        if (options?.modifyInputs) {
            await this.getEmailInput.evaluate((node) =>
                node.setAttribute('form', 'novalidateform')
            );
            await this.getPasswordInput.evaluate((node) =>
                node.setAttribute('form', 'novalidateform')
            );
        }

        await this.getEmailInput.fill(name);
        await this.getPasswordInput.fill(password);
    }

    async clickOnConfirmLogin() {
        await this.getConfirmLoginButton.click();
    }
}
