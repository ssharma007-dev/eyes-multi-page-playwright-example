import type { FileLogHandlerPlain } from '@applitools/eyes-playwright';
import type { EyesFixture } from '@applitools/eyes-playwright/fixture';
import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig<EyesFixture>({
  testDir: './tests',
  reporter: '@applitools/eyes-playwright/reporter',
  use: {

     trace: 'on',
    eyesConfig: {
    type: 'classic',
    appName: 'Multiple Tab/Window/Popup',
      // failTestsOnDiff: false,
      // matchLevel: 'Strict',
    batch: { name: 'Classic Playwright With Fixtures' },
      // proxy: {url: 'http://127.0.0.1:8888'},
      // matchTimeout: 0,
      // waitBeforeScreenshots: 50,
      // saveNewTests: true,
      logConfig: {
        type: 'file',
        filename: 'applitools.log',
      } satisfies FileLogHandlerPlain,
      failTestsOnDiff: 'afterAll'
    },
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

  ],
});