/* (c) Crown Copyright GCHQ */

import * as fs from 'fs';
import * as path from 'path';

export function readExampleData(fileName: string): string {
	const filePath = path.join(path.resolve(), 'e2e/fixtures/exampleData', fileName);
	return fs.readFileSync(filePath, 'utf-8');
}
