import { expect, travelTest } from 'fixtures/test';

travelTest.describe('Home page test cases', () => {
    travelTest(
        'home page should displays correct',
        { tag: ['@smoke'] },
        async ({ app, globalEnv }) => {
            await app.homePage.goto(globalEnv.baseUrl);

            await app.homePage.dialog.clickOnConfirmDialog();
            await expect(app.homePage.dialog.getDialogContainer).not.toBeVisible();

            await app.homePage.expectLoaded();
            await app.homePage.navbar.expectLoaded();
            await app.homePage.footer.expectLoaded();
        }
    );
});
