import { shallowRef, triggerRef } from 'vue'

type Set<T> = (value: T | ((value: T) => void)) => void

export function state<T>(value: T): [() => T, Set<T>] {
	const r = shallowRef(value)

	const get = () => r.value

	const set: Set<T> = (value) => {
		if (value instanceof Function) {
			value(r.value)
			triggerRef(r)
		} else {
			r.value = value
		}
	}

	return [get, set]
}
