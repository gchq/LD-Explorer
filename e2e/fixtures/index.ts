/* (c) Crown Copyright GCHQ */

import { test as dataFixtures } from './dataFixtures';
import { mergeTests } from '@playwright/test';
import { test as pageFixtures } from './pageFixtures';

export const test = mergeTests(dataFixtures, pageFixtures);
export { expect } from '@playwright/test';
