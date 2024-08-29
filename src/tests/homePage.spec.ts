import { travelTest } from 'fixtures/test';

travelTest.describe('Home page test cases', () => {
    travelTest.beforeEach('Navigate to home page', async ({ page, app, globalEnv }) => {
        // Handle the cookie acceptance dialog if it appears
        await app.homePage.goto(globalEnv.baseUrl);

        await page.addLocatorHandler(app.homePage.dialog.getDialogContainer, async () => {
            console.log('cookie popup found');
            await app.homePage.dialog.clickOnConfirmDialog();
        });
    });

    travelTest(
        'home page basic functionalities check',
        { tag: ['@smoke'] },
        async ({ app, globalEnv }) => {
            await app.homePage.expectLoaded(globalEnv.PROJECT);
            await app.homePage.navbar.expectLoaded();
            await app.homePage.footer.expectLoaded(globalEnv.PROJECT);
        }
    );

    travelTest('foo', async ({ app, globalEnv }) => {
        await app.homePage.expectLoaded(globalEnv.PROJECT);
        await app.homePage.selectDestination('Włochy');
        await app.homePage.selectDate();

        await app.homePage.selectTransport('Wrocław');
    });
});
