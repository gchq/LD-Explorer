import { type PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	testDir: 'e2e',

	testMatch: /(.+\.)?(test|spec)\.[jt]s/,

	// Opt out of parallel tests on CI (prioritize stability and reproducability).
	workers: process.env.CI ? 1 : undefined,

	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] }
		}
	],

	expect: {
		toMatchSnapshot: {
			// Accomodate slight font kerning differences
			maxDiffPixelRatio: 0.015
		}
	}
};

export default config;
