import { inject, type InjectionKey } from 'vue'

export function useContext<T>(injectionKey: string | InjectionKey<unknown>, componentName: string) {
	const context = inject<T>(injectionKey)

	if (!context) {
		throw new Error(`Injection not found. Component must be used within ${componentName} component`)
	}

	return context
}
