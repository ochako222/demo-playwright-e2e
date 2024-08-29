import { expect } from '@playwright/test';
import { AppPage } from './abstractClasses';
import { NavbarComponent } from './components/navbar.component';
import { FooterComponent } from './components/footer.component';
import { DialogComponent } from './components/dialog.component';
import { ProjectsT } from 'types';
import { LoginModal } from './components/login.modal';
import { SearchFormComponent } from './components/searchForm.component';

export class HomePage extends AppPage {
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

    public loginModal = new LoginModal(this.page);

    public searchForm = new SearchFormComponent(this.page);

    async expectLoaded(project?: ProjectsT) {
        await expect(this.getCommerceCarousel).toBeVisible();
        await expect(this.getTopOffers).toBeVisible();
        await expect(this.getBestDestinationsContainer).toBeVisible();
        await expect(this.getAdvertising).toBeVisible();
        await expect(this.getOffers).toBeVisible();
        await expect(this.getPlanes).toBeVisible();

        if (project == 'travelplanet-pl') {
            await expect(this.getHelpline).toBeVisible();
        }
    }
}
