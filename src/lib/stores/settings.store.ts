/* (c) Crown Copyright GCHQ */

import { createLocalStorageJSONStore } from './localStorageJson.store';

interface GeneralSettings {
	general__darkMode: boolean;
	general__defaultLimit: number;
	general__showRDFSLabels: boolean;
}


interface GraphSettings {
	graph__showQuads: boolean;
	graph__unionDefaultGraph: boolean;
	graph__queryForNamedGraphs: boolean;
}

export interface TermSettings {
	term__showNodeType: boolean;
	term__abbreviateCommonPrefixes: boolean;
	term__squashRdfTypeInGraph: boolean;
	term__showLanguageTag: boolean;
}

export type Settings = GeneralSettings & TermSettings & GraphSettings;

const defaultSettings: Settings = {
	general__darkMode: !!(
		window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
	),
	general__defaultLimit: 1000,
	general__showRDFSLabels: false,
	graph__showQuads: false,
	graph__queryForNamedGraphs: false,
	graph__unionDefaultGraph: false,
	term__showNodeType: true,
	term__abbreviateCommonPrefixes: false,
	term__squashRdfTypeInGraph: false,
	term__showLanguageTag: true
};

export const settings = createLocalStorageJSONStore('settings', defaultSettings);
