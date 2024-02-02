import { shallowRef, triggerRef } from 'vue'

export function signal<T>(value: T) {
	const r = shallowRef(value)

	const get = () => r.value

	const set = (value: T | ((value: T) => void)): void => {
		if (value instanceof Function) {
			value(r.value)
			triggerRef(r)
		} else {
			r.value = value
		}
	}
	return [get, set]
}
