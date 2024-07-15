/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		screens: {
			xs: '0',
			sm: '576px',
			md: '768px',
			lg: '992px',
			xl: '1200px',
			'2xl': '1536px'
		},
		extend: {
			colors: {
				black: 'var(--ic-architectural-900)',
				icds: {
					personality: 'var(--ic-theme-primary)',
					hyperlink: 'var(--ic-hyperlink)',
					'hyperlink-hover': 'var(--ic-hyperlink-hover)',
					warning: 'var(--ic-status-warning)',
					'warning-bg': 'var(--ic-status-error-background)',
					error: 'var(--ic-status-error)',
					'error-bg': 'var(--ic-status-error-background)',
					action: 'var(--ic-action-default)',
					'action-bg-hover': 'var(--ic-action-default-bg-hover)',
					'action-bg-hover-no-alpha': 'var(--ic-action-default-bg-hover-no-alpha)'
				},
				gray: {
					100: 'var(--ic-architectural-100)',
					200: 'var(--ic-architectural-200)',
					300: 'var(--ic-architectural-300)',
					400: 'var(--ic-architectural-400)',
					500: 'var(--ic-architectural-500)',
					600: 'var(--ic-architectural-600)',
					700: 'var(--ic-architectural-700)',
					800: 'var(--ic-architectural-800)',
					900: 'var(--ic-architectural-900)'
				}
			},
			spacing: {
				0.5: 'var(--ic-space-xxxs)',
				1: 'var(--ic-space-xxs)',
				2: 'var(--ic-space-xs)',
				3: 'var(--ic-space-sm)',
				4: 'var(--ic-space-md)',
				6: 'var(--ic-space-lg)',
				8: 'var(--ic-space-xl)',
				12: 'var(--ic-space-xxl)'
			},
			fontFamily: {
				sans: 'var(--ic-font-body-family)'
			}
		}
	},
	plugins: []
};
