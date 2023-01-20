// @ts-check
const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  testMatch:'*spec.js',
  timeout: 60 * 1000,
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
};

module.exports = config;
