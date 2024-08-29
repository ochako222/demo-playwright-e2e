import { expect } from '@playwright/test';
import { AppPage } from './abstractClasses';
import { NavbarComponent } from './components/navbar.component';
import { FooterComponent } from './components/footer.component';
import { DialogComponent } from './components/dialog.component';
import { ProjectsT } from 'types';
import { LoginModal } from './components/login.modal';

export class HomePage extends AppPage {
    getDestinationInput = this.page.locator('#main-search [name="destination_picker"]');

    getDepartureDateInput = this.page.locator('#main-search [name="date_picker"]');

    getTransportationInput = this.page.locator('#main-search [name="transportation_picker"]');

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

    async expectLoaded(project: ProjectsT) {
        await expect(this.getDestinationInput).toBeVisible();
        await expect(this.getDepartureDateInput).toBeVisible();
        await expect(this.getTransportationInput).toBeVisible();
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

    async selectDestination(destination: string) {
        await this.getDestinationInput.click();

        await this.page
            .locator('[data-cy="sf-destination-picker-popup-search-textbox"]')
            .fill(destination);

        await expect(this.page.locator('.b-destinations__virtualized-list')).toBeVisible();

        await this.page.locator(`[aria-label="${destination}"]`).click();

        await expect(
            this.page
                .locator('[data-cy="sf-destination-picker-popup-tags"] ul li')
                .getByText(destination)
        ).toBeVisible();

        await this.page.locator('[data-cy="sf-destination-picker-popup-save-button"]').click();
    }

    async selectDate() {
        await this.getDepartureDateInput.click();
        await expect(
            this.page.locator('[class="i-calendar__months i-calendar__months--horizontal"]')
        ).toBeVisible();

        const nextMonthLabel = await this.page
            .locator(
                '[class="i-calendar__month i-calendar__month--horizontal i-calendar__month--right "]'
            )
            .first();

        await nextMonthLabel
            .locator('button[id*=datepicker-calendar]')
            .getByText('5', { exact: true })
            .click();
        await nextMonthLabel
            .locator('button[id*=datepicker-calendar]')
            .getByText('10', { exact: true })
            .click();

        await this.page.locator('[data-cy="sf-datepicker-popup-save-button"]').click();
    }

    async selectTransport(transport: 'Wrocław') {
        await this.getTransportationInput.click();

        await expect(
            this.page.locator('[data-cy="sf-transportation-picker-popup-content"]>div')
        ).toBeVisible();

        await this.page
            .locator('[role="presentation"] ul li')
            .getByText(transport, { exact: true })
            .click({ force: true });

        await this.page.locator('[data-cy="sf-transportation-picker-popup-save-button"]').click();
    }
}
