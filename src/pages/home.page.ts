import { expect } from '@playwright/test';
import { AppPage } from './abstractClasses';
import { NavbarComponent } from './components/navbar.component';
import { FooterComponent } from './components/footer.component';
import { DialogComponent } from './components/dialog.component';
import { EnvironmentsT } from 'types';

export class HomePage extends AppPage {
    getSearchContainer = this.page.locator('#main-search');

    getCommerceCarousel = this.page.locator('[data-cy="carousel"]');

    getTopOffers = this.page.locator('[data-cy="hp-top-offers"]');

    getBestDestinationsContainer = this.page.locator('[data-controller="attractive-destination"]');

    getAdvertising = this.getBestDestinationsContainer.locator('+ section');

    getOffers = this.page.locator('[data-cy="unique-selling-propositions"]').first();

    getHelpline = this.page.locator('[aria-labelledby="helpline-title"]');

    getPlanes = this.page.locator('section ul');

    public navbar = new NavbarComponent(this.page);

    public footer = new FooterComponent(this.page);

    public dialog = new DialogComponent(this.page);

    async expectLoaded(project: EnvironmentsT) {
        await expect(this.getSearchContainer).toBeVisible();
        await expect(this.getCommerceCarousel).toBeVisible();
        await expect(this.getTopOffers).toBeVisible();
        await expect(this.getBestDestinationsContainer).toBeVisible();
        await expect(this.getAdvertising).toBeVisible();
        await expect(this.getOffers).toBeVisible();
        if (project == 'travelplanet-pl') {
            await expect(this.getHelpline).toBeVisible();
        }
        await expect(this.getPlanes).toBeVisible();
    }
}
