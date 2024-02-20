export function next<T>(items: T[], index: number): { nextEl: T; nextIndex: number } {
	const nextIndex = index === items.length - 1 ? index : index + 1
	return { nextEl: items[nextIndex], nextIndex }
}

export function prev<T>(items: T[], currentIndex: number): { prevEl: T; prevIndex: number } {
	const prevIndex = currentIndex <= 0 ? 0 : currentIndex - 1
	return { prevEl: items[prevIndex], prevIndex }
}

export function last<T>(items: T[]): T {
	return items[items.length - 1]
}
