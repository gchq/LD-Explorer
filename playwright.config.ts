import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	testDir: 'e2e',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,

	// Opt out of parallel tests on CI (prioritize stability and reproducability).
	workers: process.env.CI ? 1 : undefined
};

export default config;
