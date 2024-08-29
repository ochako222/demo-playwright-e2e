import { expect, travelTest } from 'fixtures/test';

travelTest.describe('Home page test cases', () => {
    travelTest.beforeEach('Navigate to home page', async ({ page, app, globalEnv }) => {
        // Handle the cookie acceptance dialog if it appears
        await page.addLocatorHandler(app.homePage.dialog.getDialogContainer, async () => {
            console.log('cookie popup found');
            await app.homePage.dialog.clickOnConfirmDialog();
        });

        await app.homePage.goto(globalEnv.baseUrl);
        await app.homePage.navbar.clickOnLogIn();
        await app.homePage.loginModal.expectLoaded();
    });

    travelTest(
        'user should receive the error message after passing incorrect credentials',
        { tag: ['@smoke'] },
        async ({ app }) => {
            await app.homePage.loginModal.fillInLoginForm('test@gmnail.com', 'awesome_password');
            await app.homePage.loginModal.clickOnConfirmLogin();

            await expect(app.homePage.loginModal.getErrorMessage).toHaveText(
                'Wypełniłeś formularz niepoprawnie. Spróbuj raz jeszcze.'
            );
        }
    );

    travelTest(
        'user should receive the error message after passing empty fields',
        { tag: ['@regression'] },
        async ({ app }) => {
            await app.homePage.loginModal.fillInLoginForm('test@gmnail.com', 'awesome_password', {
                modifyInputs: true
            });
            await app.homePage.loginModal.clickOnConfirmLogin();

            await expect(app.homePage.loginModal.getErrorMessage).toContainText('Wystąpił błąd');
        }
    );
});
