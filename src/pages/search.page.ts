import { expect } from '@playwright/test';
import { AppPage } from './abstractClasses';
import { NavbarComponent } from './components/navbar.component';
import { FooterComponent } from './components/footer.component';
import { LoginModal } from './components/login.modal';
import { SearchFormComponent } from './components/searchForm.component';

export class SearchPage extends AppPage {
    getAdvertisingBanner = this.page.locator('picture img');

    getSearchActionsContainer = this.page.locator('.f-main-search');

    getSearchResultsContainer = this.page.locator('#search-form-result-boxes');

    getSearchFilterContainer = this.page.locator('.f-search-filter');

    getMapElement = this.page.locator('[class*=map] img');

    getPaginationContainer = this.page.locator('#search-results-pagination');

    getNextPageButton = this.page.locator('nav.pagination button.pagination__link--next');

    public navbar = new NavbarComponent(this.page);

    public footer = new FooterComponent(this.page);

    public loginModal = new LoginModal(this.page);

    public searchForm = new SearchFormComponent(this.page);

    async expectLoaded(options?: { isDirectSearch: boolean }) {
        if (options?.isDirectSearch) await expect.soft(this.getAdvertisingBanner).toBeVisible();
        await expect.soft(this.getSearchActionsContainer).toBeVisible();
        await expect.soft(this.getSearchResultsContainer).toBeVisible();
        await expect.soft(this.getSearchFilterContainer).toBeVisible();
        await expect.soft(this.getMapElement).toBeVisible();
        await expect.soft(this.getPaginationContainer).toBeVisible();
    }

    async clickOnNextPage() {
        await this.getNextPageButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async clickOnOfferByNumber(number: number) {
        await this.page
            .locator('article [data-serp-aapc-target="buttonLabel"]')
            .nth(number)
            .click();
    }
}
