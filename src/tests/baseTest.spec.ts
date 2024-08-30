import { expect, travelTest } from 'fixtures/test';
import { helpers } from 'support/helpers';
import { ProjectsT } from 'types';

// Dictionary with all text assertions for test
export const LOCAL_DICTIONARY: Record<string, Record<ProjectsT, string>> = {
    invalidUserError: {
        'travelplanet-pl': 'Wypełniłeś formularz niepoprawnie. Spróbuj raz jeszcze.',
        'invia-sk': 'Zadali ste nesprávne prihlasovací údaje. Skúste to prosím ešte raz.',
        'invia-hu': 'Hibás felhasznásználói adatokat adott meg. Kérjük próbálja meg újra.',
        'invia-cz': 'Zadali jste nesprávné přihlašovací údaje. Prosím zkuste to znovu.'
    },
    emptyFieldError: {
        'travelplanet-pl': 'Wystąpił błąd',
        'invia-sk': 'Došlo k chybe.',
        'invia-hu': 'Hiba történt',
        'invia-cz': 'Došlo k chybě.'
    },
    flyDestination: {
        'travelplanet-pl': 'Włochy',
        'invia-sk': 'Egypt',
        'invia-hu': 'Egyiptom',
        'invia-cz': 'Řecko'
    },
    flyDeparture: {
        'travelplanet-pl': 'Wrocław',
        'invia-sk': 'Slovenské letiská',
        'invia-hu': 'Magyar repterek',
        'invia-cz': 'Česká letiště'
    }
};

travelTest.describe('Base test cases', () => {
    travelTest.beforeEach('Navigate to home page', async ({ page, app, globalEnv }) => {
        await app.homePage.goto(globalEnv.baseUrl);

        // Handle the cookie acceptance dialog if it appears
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
        async ({ app, globalEnv }) => {
            await app.homePage.navbar.clickOnLogIn();
            await app.homePage.loginModal.expectLoaded();
            await app.homePage.loginModal.fillInLoginForm('test@gmnail.com', 'awesome_password');
            await app.homePage.loginModal.clickOnConfirmLogin();

            await expect(app.homePage.loginModal.getErrorMessage).toHaveText(
                LOCAL_DICTIONARY['invalidUserError'][globalEnv.PROJECT]
            );
        }
    );

    travelTest(
        'user should receive the error message after passing empty fields',
        { tag: ['@regression'] },
        async ({ app, globalEnv }) => {
            await app.homePage.navbar.clickOnLogIn();
            await app.homePage.loginModal.expectLoaded();
            await app.homePage.loginModal.fillInLoginForm('test@gmnail.com', 'awesome_password', {
                modifyInputs: true
            });
            await app.homePage.loginModal.clickOnConfirmLogin();

            await expect(app.homePage.loginModal.getErrorMessage).toContainText(
                LOCAL_DICTIONARY['emptyFieldError'][globalEnv.PROJECT]
            );
        }
    );

    travelTest(
        'search offer feature should work correct',
        { tag: ['@smoke'] },
        async ({ app, globalEnv }) => {
            await app.homePage.expectLoaded(globalEnv.PROJECT);

            const { startDate, finishDate } = helpers.getDateRangeFromNow(5, 10);
            const { flyDestination, flyDeparture } = LOCAL_DICTIONARY;

            await app.homePage.searchForm.selectDestination(flyDestination[globalEnv.PROJECT]);
            await app.homePage.searchForm.selectDate(startDate, finishDate);
            await app.homePage.searchForm.selectDeparturePlace(flyDeparture[globalEnv.PROJECT]);
            await app.homePage.searchForm.clickOnSearch();

            await app.searchPage.expectLoaded();
            await expect(app.searchPage.searchForm.getDestinationField).toHaveValue(
                flyDestination[globalEnv.PROJECT]
            );
            await expect(app.searchPage.searchForm.getDepartureField).toHaveValue(
                new RegExp(flyDeparture[globalEnv.PROJECT])
            );

            // TODO: Currently work only with travelplanet.pl Need to develop advance method to manage different data formats
            // const regExp = new RegExp(
            //     `${String(startDate.getDate()).padStart(2, '0')}.${String(startDate.getMonth() + 1).padStart(2, '0')}. - ${String(finishDate.getDate()).padStart(2, '0')}.${String(finishDate.getMonth() + 1).padStart(2, '0')}.${finishDate.getFullYear()}`
            // );
            // await expect(app.searchPage.searchForm.getDepartureDateInput).toHaveValue(regExp);
        }
    );

    travelTest(
        'offer details should displays correct',
        { tag: ['@smoke'] },
        async ({ app, globalEnv }) => {
            await app.homePage.expectLoaded(globalEnv.PROJECT);
            await app.homePage.searchForm.clickOnSearch();

            await app.searchPage.expectLoaded();
            await app.searchPage.clickOnNextPage();

            await app.searchPage.clickOnOfferByNumber(2);
            await app.offerDetailsPage.expectLoaded();
        }
    );
});
