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

    public navbar = new NavbarComponent(this.page);

    public footer = new FooterComponent(this.page);

    public loginModal = new LoginModal(this.page);

    public searchForm = new SearchFormComponent(this.page);

    async expectLoaded(options?: { isDirectSearch: boolean }) {
        if (options?.isDirectSearch) await expect(this.getAdvertisingBanner).toBeVisible();
        await expect(this.getSearchActionsContainer).toBeVisible();
        await expect(this.getSearchResultsContainer).toBeVisible();
        await expect(this.getSearchFilterContainer).toBeVisible();
        await expect(this.getMapElement).toBeVisible();
        await expect(this.getPaginationContainer).toBeVisible();
    }

    async clickOnNextPage() {
        await this.page.locator('nav.pagination button.pagination__link--next');
        await this.page.waitForLoadState('networkidle');
    }

    async clickOnOfferByNumber(number: number) {
        await this.page.locator('article').nth(number).click();
    }
}
