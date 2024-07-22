/* (c) Crown Copyright GCHQ */

import { createLocalStorageJSONStore } from './localStorageJson.store';

interface GeneralSettings {
	general__defaultLimit: number;
	general__showQuads: boolean;
}

export interface TermSettings {
	term__showNodeType: boolean;
	term__abbreviateCommonPrefixes: boolean;
	term__showLanguageTag: boolean;
}

type Settings = GeneralSettings & TermSettings;

const defaultSettings: Settings = {
	general__defaultLimit: 1000,
	general__showQuads: false,
	term__showNodeType: true,
	term__abbreviateCommonPrefixes: false,
	term__showLanguageTag: true
};

export const settings = createLocalStorageJSONStore('settings', defaultSettings);
