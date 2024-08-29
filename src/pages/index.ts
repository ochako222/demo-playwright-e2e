import { PageHolder } from './abstractClasses';
import { HomePage } from './home.page';

export class App extends PageHolder {
    public homePage = new HomePage(this.page);
}
