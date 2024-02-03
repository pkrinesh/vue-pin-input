import { computed, shallowRef, triggerRef } from 'vue'

type Set<T> = (value: T | ((value: T) => void)) => void
export type State<T> = () => T

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

export function derived<T>(getter: () => T): State<T> {
	const _v = computed(getter)

	return () => _v.value as any
}
