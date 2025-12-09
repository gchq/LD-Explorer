import { configDefaults, defineConfig } from 'vitest/config';
import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import { sveltekit } from '@sveltejs/kit/vite';
import { svelteTesting } from '@testing-library/svelte/vite';
import tailwindcss from '@tailwindcss/vite';

const file = fileURLToPath(new URL('package.json', import.meta.url));
const json = readFileSync(file, 'utf8');
const pkg = JSON.parse(json);

export default defineConfig({
	plugins: [sveltekit(), svelteTesting(), tailwindcss()],
	define: {
		PUBLIC_VERSION: JSON.stringify(pkg.version)
	},
	test: {
		environment: 'jsdom', // we're making a web app, so we want a web-like environment
		globals: true, // avoid having to import things like "describe" and "expect"
		include: ['./src/**/*.{test,spec}.{js,ts}'],
		setupFiles: ['./test/test-setup.ts'],
		reporters: ['default', 'junit'],
		outputFile: 'junit.xml',
		css: false,
		onUnhandledError(error): boolean | void {
			// Ignore all errors with the name "MySpecialError".
			console.log('ERROR ERROR ERROR ERROR ERROR');
			console.log(error.name);
			console.log(error.message);
		},

		coverage: {
			include: ['src/**/*.{js,ts,svelte}'],
			exclude: [
				...(configDefaults.coverage.exclude as string[]),
				'**/types.ts', // No code to test
				'**/index.{js,ts}', // No code to test
				'**/icons/**', // these are svgs/visual - not really testable
				'**/routes/**', // tested via e2e
				'**/lib/components/views/**', // tested via e2e
				'**/lib/components/layout/nav/**' // tested via e2e
			],
			reporter: ['text', 'cobertura']
		}
	},
	build: {
		target: 'es2021',
		commonjsOptions: {
			strictRequires: true
		},
		chunkSizeWarningLimit: 2000
	},
	optimizeDeps: {
		// These do not appear to be compatible with the dependency optimizer.
		exclude: ['@ukic/web-components']
	}
});
