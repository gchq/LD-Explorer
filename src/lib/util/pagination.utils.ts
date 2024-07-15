/* (c) Crown Copyright GCHQ */

export function getTotalPages<T>(perPage: number, items: ArrayLike<T>) {
	return Math.ceil(items.length / perPage);
}

export function getItemsForPage<T>(currentPage: number, perPage: number, items: Array<T>) {
	return items.slice(perPage * currentPage, perPage * (currentPage + 1));
}
