import { expect, travelTest } from 'fixtures/test';
import { helpers } from 'support/helpers';

travelTest.describe('Base test cases', () => {
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

    travelTest(
        'user should receive the error message after passing incorrect credentials',
        { tag: ['@smoke'] },
        async ({ app }) => {
            await app.homePage.navbar.clickOnLogIn();
            await app.homePage.loginModal.expectLoaded();
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
            await app.homePage.navbar.clickOnLogIn();
            await app.homePage.loginModal.expectLoaded();
            await app.homePage.loginModal.fillInLoginForm('test@gmnail.com', 'awesome_password', {
                modifyInputs: true
            });
            await app.homePage.loginModal.clickOnConfirmLogin();

            await expect(app.homePage.loginModal.getErrorMessage).toContainText('Wystąpił błąd');
        }
    );

    travelTest('foo', async ({ app, globalEnv }) => {
        await app.homePage.expectLoaded(globalEnv.PROJECT);

        const { startDate, finishDate } = helpers.getDateRangeFromNow(5, 10);
        await app.homePage.searchForm.selectDestination('Włochy');
        await app.homePage.searchForm.selectDate(startDate, finishDate);
        await app.homePage.searchForm.selectTransport('Wrocław');
        await app.homePage.searchForm.clickOnSearch();

        await app.searchPage.expectLoaded();
        await expect(app.searchPage.searchForm.getDestinationInput).toHaveValue('Włochy');
        await expect(app.searchPage.searchForm.getTransportationInput).toHaveValue('Wrocław');

        const regExp = new RegExp(
            `${String(startDate.getDate()).padStart(2, '0')}.${String(startDate.getMonth() + 1).padStart(2, '0')}. - ${String(finishDate.getDate()).padStart(2, '0')}.${String(finishDate.getMonth() + 1).padStart(2, '0')}.${finishDate.getFullYear()}`
        );
        await expect(app.searchPage.searchForm.getDepartureDateInput).toHaveValue(regExp);
    });

    travelTest('foo2', async ({ app, globalEnv }) => {
        await app.homePage.expectLoaded(globalEnv.PROJECT);
        await app.homePage.searchForm.clickOnSearch();

        await app.searchPage.expectLoaded();
        await app.searchPage.clickOnNextPage();

        await app.searchPage.clickOnOfferByNumber(2);
        await app.offerDetailsPage.expectLoaded();
    });
});
