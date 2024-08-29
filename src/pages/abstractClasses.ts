import { Page } from 'playwright';

export abstract class PageHolder {
    constructor(protected page: Page) {}
}

export abstract class Component extends PageHolder {
    abstract expectLoaded(): Promise<void>;
}

export abstract class AppPage extends Component {
    async goto(url: string): Promise<void> {
        console.info(`Navigating to URL: ${url}`);

        await this.page.goto(url);
    }
}
