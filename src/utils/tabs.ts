export function addTabIndex<T extends HTMLElement>(items: T[], index: number): void {
	console.log('addIndex', index)
	removeTabIndex(items)
	return items[index].setAttribute('tabindex', '0')
}

export function removeTabIndex<T extends HTMLElement>(items: T[]): void {
	console.log('removeIndex')
	return items.forEach((item) => item.setAttribute('tabindex', '-1'))
}
