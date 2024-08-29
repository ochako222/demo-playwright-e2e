import { PageHolder } from './abstractClasses';
import { HomePage } from './home.page';
import { OfferDetailsPage } from './offerDetails';
import { SearchPage } from './search.page';

export class App extends PageHolder {
    public homePage = new HomePage(this.page);
    public searchPage = new SearchPage(this.page);
    public offerDetailsPage = new OfferDetailsPage(this.page);
}
