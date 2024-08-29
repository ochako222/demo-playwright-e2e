import { expect } from '@playwright/test';
import { AppPage } from 'pages/abstractClasses';
import { ProjectsT } from 'types';

export class FooterComponent extends AppPage {
    getNewsLetters = this.page.locator('[data-cy="footer-newsletter"]');

    getFooterLinks = async () => this.page.locator('[data-cy="footer-link"]').all();

    getFooterContact = this.page.locator('[data-cy="footer-contact"]');

    getFooterLogosContainer = this.page.locator('[data-cy="footer-logos"]');

    async expectLoaded(project?: ProjectsT) {
        await expect(this.getNewsLetters).toBeVisible();

        if (project == 'invia-hu') {
            expect(await this.getFooterLinks()).toHaveLength(28);
        } else {
            expect(await this.getFooterLinks()).toHaveLength(22);
        }

        await expect(this.getFooterContact).toBeVisible();
        await expect(this.getFooterLogosContainer).toBeVisible();
    }
}
