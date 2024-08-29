import { expect } from '@playwright/test';
import { AppPage } from './abstractClasses';
import { NavbarComponent } from './components/navbar.component';
import { FooterComponent } from './components/footer.component';
import { LoginModal } from './components/login.modal';

export class OfferDetailsPage extends AppPage {
    getHeaderContainer = this.page.locator('.b-product-detail__header');

    getOfferDetailsContainer = this.page.locator('.b-product-detail__side');

    getGallerySlider = this.page
        .locator('.b-hotel-card [data-controller="gallery thumb-slider"]')
        .first();

    getOfferDescription = this.page.locator('section[data-controller="gtm"]');

    getOfferReview = this.page.locator('section [data-controller*="hotel-review"]');

    public navbar = new NavbarComponent(this.page);

    public footer = new FooterComponent(this.page);

    public loginModal = new LoginModal(this.page);

    async expectLoaded() {
        await expect(this.getHeaderContainer).toBeVisible();
        await expect(this.getOfferDetailsContainer).toBeVisible();
        await expect(this.getGallerySlider).toBeVisible();
        await expect(this.getOfferDescription).toBeVisible();
        await expect(this.getOfferReview).toBeVisible();
    }
}
