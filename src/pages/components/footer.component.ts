import { expect } from '@playwright/test';
import { AppPage } from 'pages/abstractClasses';

export class FooterComponent extends AppPage {
    getNewsLetters = this.page.locator('[data-cy="footer-newsletter"]');

    getFooterLinks = async () => this.page.locator('[data-cy="footer-link"]').all();

    getFooterContact = this.page.locator('[data-cy="footer-contact"]');

    getFooterLogosContainer = this.page.locator('[data-cy="footer-logos"]');

    async expectLoaded() {
        await expect(this.getNewsLetters).toBeVisible();
        expect(await this.getFooterLinks()).toHaveLength(22);
        await expect(this.getFooterContact).toBeVisible();
        await expect(this.getFooterLogosContainer).toBeVisible();
    }
}
