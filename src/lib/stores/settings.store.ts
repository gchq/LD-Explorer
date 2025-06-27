/* (c) Crown Copyright GCHQ */

import { createLocalStorageJSONStore } from './localStorageJson.store';

interface GeneralSettings {
	general__darkMode: boolean;
	general__defaultLimit: number;
	general__showQuads: boolean;
	general__showRDFSLabels: boolean;
}

export interface TermSettings {
	term__showNodeType: boolean;
	term__abbreviateCommonPrefixes: boolean;
	term__showLanguageTag: boolean;
}

export type Settings = GeneralSettings & TermSettings;

const defaultSettings: Settings = {
	general__darkMode: !!(
		window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
	),
	general__defaultLimit: 1000,
	general__showQuads: false,
	general__showRDFSLabels: false,
	term__showNodeType: true,
	term__abbreviateCommonPrefixes: false,
	term__showLanguageTag: true
};

export const settings = createLocalStorageJSONStore('settings', defaultSettings);

// On dark mode toggle, update the document element to add the 'dark' class, allowing the
// TailwindCSS custom variant to apply :dark styles.
settings.subscribe(({ general__darkMode }) => {
	document.documentElement.classList.toggle('dark', general__darkMode);
});
