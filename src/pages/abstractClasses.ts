import { Page } from 'playwright';
import { ProjectsT } from 'types';

export abstract class PageHolder {
    constructor(protected page: Page) {}
}

export abstract class Component extends PageHolder {
    abstract expectLoaded(project: ProjectsT): Promise<void>;
}

export abstract class AppPage extends Component {
    async goto(url: string): Promise<void> {
        console.info(`Navigating to URL: ${url}`);

        await this.page.goto(url);
    }
}
