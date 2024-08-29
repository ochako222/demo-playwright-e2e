import { expect } from '@playwright/test';
import { AppPage } from 'pages/abstractClasses';
import { helpers } from 'support/helpers';

export class SearchFormComponent extends AppPage {
    getDestinationField = this.page.locator('#main-search [name="destination_picker"]');

    getDestinationInput = this.page.locator(
        '[data-cy="sf-destination-picker-popup-search-textbox"]'
    );

    getDestinationByName = (destination: string) =>
        this.page
            .locator('[data-cy="sf-destination-picker-popup-tags"] ul li')
            .getByText(destination);

    getConfirmDestinationButton = this.page.locator(
        '[data-cy="sf-destination-picker-popup-save-button"]'
    );

    getCalendarElement = this.page.locator(
        '[class="i-calendar__months i-calendar__months--horizontal"]'
    );

    getConfirmDateButton = this.page.locator('[data-cy="sf-datepicker-popup-save-button"]');

    getDestinationsList = this.page.locator('.b-destinations__virtualized-list');

    getDepartureDateField = this.page.locator('#main-search [name="date_picker"]');

    getDepartureField = this.page.locator('#main-search [name="transportation_picker"]');

    getDepartureDropdown = this.page.locator(
        '[data-cy="sf-transportation-picker-popup-content"]>div'
    );

    getDeparturePlaceByName = (name: string) =>
        this.page.locator('[role="presentation"] ul li').getByText(name, { exact: true });

    getConfirmDepartureButton = this.page.locator(
        '[data-cy="sf-transportation-picker-popup-save-button"]'
    );

    getSearchOfferButton = this.page.locator('[data-cy="sf-submit-button"]');

    async expectLoaded() {
        await expect(this.getDestinationField).toBeVisible();
        await expect(this.getDepartureDateField).toBeVisible();
        await expect(this.getDepartureField).toBeVisible();
    }

    async selectDestination(destination: string) {
        await this.getDestinationField.click();
        await this.getDestinationInput.fill(destination);

        await expect(this.getDestinationsList).toBeVisible();

        await this.page.locator(`[aria-label="${destination}"]`).click();

        await expect(this.getDestinationByName(destination)).toBeVisible();

        await this.getConfirmDestinationButton.click();
    }

    async selectDate(startDate: Date, finishDate: Date) {
        const currentMonth = helpers.getCurrentMonth();

        await this.getDepartureDateField.click();
        await expect(this.getCalendarElement).toBeVisible();

        const currentMonthContainer = await this.page.locator('.i-calendar__month--left');
        const nextMonthContainer = await this.page.locator('.i-calendar__month--right');

        const startMonth = startDate.toLocaleString('default', { month: 'long' });
        const finishMonth = finishDate.toLocaleString('default', { month: 'long' });

        const startDateContainer =
            currentMonth == startMonth ? currentMonthContainer : nextMonthContainer;

        const finishDateContainer =
            currentMonth == finishMonth ? currentMonthContainer : nextMonthContainer;

        await startDateContainer
            .locator('button[id*=datepicker-calendar]')
            .getByText(`${startDate.getDate()}`, { exact: true })
            .click();

        await finishDateContainer
            .locator('button[id*=datepicker-calendar]')
            .getByText(`${finishDate.getDate()}`, { exact: true })
            .click();

        await this.getConfirmDateButton.click();
    }

    async selectDeparturePlace(place: string) {
        await this.getDepartureField.click();

        await expect(this.getDepartureDropdown).toBeVisible();

        const departure = this.getDeparturePlaceByName(place);

        const isSelected = await departure
            .locator('..')
            .locator('..')
            .locator('..')
            .locator('[type="checkbox"]')
            .isChecked();

        if (isSelected) {
            console.log(`${place} already selected`);
        } else {
            console.log(`select ${place} option`);
            await departure.click({ force: true });
        }

        await this.getConfirmDepartureButton.click();
    }

    async clickOnSearch() {
        await this.getSearchOfferButton.click();
        await this.page.waitForLoadState('networkidle');
    }
}
