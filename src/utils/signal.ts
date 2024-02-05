import { computed, shallowRef, triggerRef } from 'vue'

type Set<T> = (value: T | ((value: T | undefined) => void)) => void
export type State<T> = () => T | undefined

export function state<T>(value?: T | undefined) {
	const r = shallowRef(value)

	const get: State<T> = () => r.value

	const set: Set<T> = (value) => {
		if (value instanceof Function) {
			value(r.value)
			triggerRef(r)
		} else {
			r.value = value
		}
	}

	return [get, set] as const
}

export function derived<T>(getter: () => T): State<T> {
	const _v = computed(getter)

	return () => _v.value as any
}
