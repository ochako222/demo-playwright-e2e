import { expect } from '@playwright/test';
import { AppPage } from 'pages/abstractClasses';
import { helpers } from 'support/helpers';

export class SearchFormComponent extends AppPage {
    getDestinationInput = this.page.locator('#main-search [name="destination_picker"]');

    getDepartureDateInput = this.page.locator('#main-search [name="date_picker"]');

    getTransportationInput = this.page.locator('#main-search [name="transportation_picker"]');

    async expectLoaded() {
        await expect(this.getDestinationInput).toBeVisible();
        await expect(this.getDepartureDateInput).toBeVisible();
        await expect(this.getTransportationInput).toBeVisible();
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

    async selectDate(startDate: Date, finishDate: Date) {
        const current = helpers.getCurrentMonth();

        await this.getDepartureDateInput.click();
        await expect(
            this.page.locator('[class="i-calendar__months i-calendar__months--horizontal"]')
        ).toBeVisible();

        const currentMonthContainer = await this.page.locator('.i-calendar__month--left');
        const nextMonthContainer = await this.page.locator('.i-calendar__month--right');

        const startMonth = startDate.toLocaleString('default', { month: 'long' });
        const finishMonth = finishDate.toLocaleString('default', { month: 'long' });

        const startDateContainer =
            current == startMonth ? currentMonthContainer : nextMonthContainer;

        const finishDateContainer =
            current == finishMonth ? currentMonthContainer : nextMonthContainer;

        await startDateContainer
            .locator('button[id*=datepicker-calendar]')
            .getByText(`${startDate.getDate()}`, { exact: true })
            .click();

        await finishDateContainer
            .locator('button[id*=datepicker-calendar]')
            .getByText(`${finishDate.getDate()}`, { exact: true })
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

    async clickOnSearch() {
        await this.page.locator('[data-cy="sf-submit-button"]').click();
        await this.page.waitForLoadState('networkidle');
    }
}
