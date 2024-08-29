import { expect } from '@playwright/test';
import { AppPage } from './abstractClasses';
import { NavbarComponent } from './components/navbar.component';
import { FooterComponent } from './components/footer.component';
import { DialogComponent } from './components/dialog.component';

export class HomePage extends AppPage {
    getSearchContainer = this.page.locator('#main-search');

    getCommerceCarousel = this.page.locator('[data-cy="carousel"]');

    getTopOffers = this.page.locator('[data-cy="hp-top-offers"]');

    getBestDestinationsContainer = this.page.locator('[data-controller="attractive-destination"]');

    getInspirations = this.getBestDestinationsContainer.locator('+ section');

    getOffers = this.page.locator('[data-cy="unique-selling-propositions"]').first();

    getHelpline = this.page.locator('[aria-labelledby="helpline-title"]');

    getPlanes = this.page.getByText('Wybierz lotnisko i wyrusz w podróż!').locator('..');

    public navbar = new NavbarComponent(this.page);

    public footer = new FooterComponent(this.page);

    public dialog = new DialogComponent(this.page);

    async expectLoaded() {
        await expect(this.getSearchContainer).toBeVisible();
        await expect(this.getCommerceCarousel).toBeVisible();
        await expect(this.getTopOffers).toBeVisible();
        await expect(this.getBestDestinationsContainer).toBeVisible();

        await expect(this.getInspirations).toBeVisible();
        await expect(this.getOffers).toBeVisible();
        await expect(this.getHelpline).toBeVisible();
        await expect(this.getPlanes).toBeVisible();
    }
}
