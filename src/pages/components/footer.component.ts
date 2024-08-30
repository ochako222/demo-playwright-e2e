import { expect } from '@playwright/test';
import { AppPage } from 'pages/abstractClasses';
import { ProjectsT } from 'types';

export class FooterComponent extends AppPage {
    getNewsLetters = this.page.locator('[data-cy="footer-newsletter"]');

    getFooterLinks = async () => this.page.locator('[data-cy="footer-link"]').all();

    getFooterContact = this.page.locator('[data-cy="footer-contact"]');

    getFooterLogosContainer = this.page.locator('[data-cy="footer-logos"]');

    async expectLoaded(project?: ProjectsT) {
        if (project == 'invia-hu') {
            expect.soft(await this.getFooterLinks()).toHaveLength(28);
        } else {
            expect.soft(await this.getFooterLinks()).toHaveLength(22);
        }

        await expect.soft(this.getNewsLetters).toBeVisible();
        await expect.soft(this.getFooterContact).toBeVisible();
        await expect.soft(this.getFooterLogosContainer).toBeVisible();
    }
}
