export function addTabIndex<T extends HTMLElement>(items: T[], index: number): void {
	removeTabIndex(items)
	return items[index].setAttribute('tabindex', '0')
}

function removeTabIndex<T extends HTMLElement>(items: T[]): void {
	return items.forEach((item) => item.setAttribute('tabindex', '-1'))
}
