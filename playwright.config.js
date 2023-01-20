// @ts-check
const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },

  fullyParallel: true,
  reporter: 'html',

  use: {
    baseURL: 'https://www.lambdatest.com/',
    browserName: 'webkit',
    ignoreHTTPSErrors: true,
    trace: 'on-first-retry',
    launchOptions: {
      slowMo: 20,
      logger: {
        isEnabled: (name) => name === 'api',
        log: (name, severity, message) => console.log(`${name} ${message}`)
      }
    },
  },

  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
      },
    },

    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
      },
    },

    {
      name: 'webkit',
      use: {
        browserName: 'webkit',
      },
    },
  ]
};

module.exports = config;
