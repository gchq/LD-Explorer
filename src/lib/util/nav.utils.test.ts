/* (c) Crown Copyright GCHQ */

import { shouldHighlightSideNav, shouldHighlightSubNav } from './nav.utils';

describe(shouldHighlightSubNav, () => {
	const basePath = 'http://www.example.com/my-app';

	test.each([
		[{ navHref: '/foo', actualPath: `${basePath}/foo`, match: undefined, expected: true }],
		[{ navHref: '/foo', actualPath: `${basePath}/foo/`, match: undefined, expected: true }],
		[{ navHref: '/foo', actualPath: `${basePath}/bar`, match: undefined, expected: false }],
		[{ navHref: '/bar', actualPath: `${basePath}/foo`, match: undefined, expected: false }],
		[{ navHref: '/bar', actualPath: `${basePath}/foo/bar`, match: undefined, expected: true }],
		[{ navHref: '/bar', actualPath: `${basePath}/foo/bang`, match: undefined, expected: false }],
		[{ navHref: '/bar', actualPath: `${basePath}/foo/bang`, match: /(?:)/, expected: true }],
		[{ navHref: '/bar', actualPath: `${basePath}/foo/bang`, match: /.^/, expected: false }],
		[{ navHref: '/foo', actualPath: `${basePath}/foo`, match: /foo$/, expected: true }],
		[{ navHref: '/foo', actualPath: `${basePath}/foo`, match: /bar$/, expected: false }],
		[{ navHref: '/foo', actualPath: `${basePath}/foo/bar`, match: /foo$/, expected: false }],
		[{ navHref: '/foo', actualPath: `${basePath}/foo/bar`, match: /foo\/bar$/, expected: true }]
	])(
		'shouldHighlightSubNav($navHref, $actualPath, $match) => $expected',
		({ navHref, actualPath, match, expected }) => {
			expect(shouldHighlightSubNav(navHref, actualPath, match)).toEqual(expected);
		}
	);
});

describe(shouldHighlightSideNav, () => {
	test.each([
		[{ navItemPath: '/', currentPath: '/', expected: true }],
		[{ navItemPath: '/foobar', currentPath: `/foobar`, expected: true }],
		[{ navItemPath: '/foobar', currentPath: `/foobar/baz`, expected: true }],
		[{ navItemPath: '/foobar/baz', currentPath: `/foobar/baz/bar`, expected: true }]
	])(
		'shouldHighlightSideNav($navItemPath, $currentPath) => $expected',
		({ navItemPath, currentPath, expected }) => {
			expect(shouldHighlightSideNav(navItemPath, currentPath)).toEqual(expected);
		}
	);
});
