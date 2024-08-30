## Architecture:

-   `src/tests` - folder with all tests

-   `configs` - folder with settings for test entities.

-   `spec/fixtures` - playwright fixtures folder. All test entities store here

-   `spec/pages` - main folder for Page Object Models

-   `spec/support` - helpers and hooks for all projects

Other folder contain technical code, that isn't important during setup and launching this repository

## Prerequisites

-   Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
-   Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

_You can combine different tags to got necessary suite, or just specify them manually in UI tool_

## Global Variables

To start, create a `.env` file with global variables, which should be stored in the root of the project. This file should contain the global variables required for tests, specifying which user to use, the environment for launching tests, and other configurations. Here's an example of a `.env` file:

```bash
ENVIRONMENT=prod
PROJECT=travelplanet-pl
```

> Possible values of PROJECT: travelplanet-pl, invia-hu, invia-sk, invia-cz

Also it's possible to define or override variable with playwright CLI, for more info take a look on predefined scripts in package.json

> If CI=true dined tests will run in headless mode

All variables are required, and if any are missing, you will encounter errors during launch.

Now we can launch first test:

1.  Install the required dependencies:

```bash
npm ci

npx playwright install

npx playwright install chrome
```

_It's highly recommended to use npm ci instead of npm install_

2. Running tests

```bash
# Launch playwright with UI tool
ENVIRONMENT=prod PROJECT=travelplanet-pl playwright test --ui

# launch only test cases for invia.hu with @smoke tag
CI=true ENVIRONMENT=prod PROJECT=travelplanet-pl playwright test --grep '(?=.*@smoke)'
```

When you launch tests, the first step occurs inside the `global-setup.ts` file. Here, tests retrieve your global variables from the `.env` file, select the appropriate settings file from the `configs` folder, load all data from them, and store it in a new global variable: `globalEnv`. This variable will be accessible inside the spec files.

The next step is to launch all defined fixtures. Essentially, a fixture is like a context for a test, specifying which pages, APIs, or hooks a particular test suite will have access to.

Finally, the tests execute the logic defined in the specific spec files.

## Husky install

It's a good approach to use pre-installed Git hooks to automatically check code before commits. To install Husky, run these commands:

```bash
npm run prepare

npx husky add .husky/pre-commit "npx lint-staged"

git add .husky/pre-commit
```

Now every time due commit you'll execute prettier and lint checks

## Page Objects

In this project, we employ a standard Page Object Model (POM) pattern. We encapsulate all selectors and logic for each page within individual files. For reusable components, such as navigation bars or modals, we create separate component classes rather than object classes. These components are then imported into the relevant page classes. This approach ensures that components are not directly accessed by tests; instead, tests interact exclusively with page objects, which in turn manage the components. For example:

```ts
travelTest.describe('Describe part', () => {
    travelTest(
        'First test',
        { tag: ['@smoke'] },
        async ({ app }) => {
            await app.homePage.expectLoaded();
            await app.homePage.navbar.navigateByLink('');
```

With this approach, we maintain clear context awareness, allowing us to know precisely which page the test is interacting with at any given moment.
