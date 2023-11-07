<script setup lang="ts">
import { inject, type ComputedRef, type Ref } from 'vue'

const context = inject('pinInputContext') as {
	pinRefs: HTMLInputElement[]
	pin: string[]
	pinSize: Readonly<Ref<number>>
	mask?: boolean
	handleComplete: () => void
	handlePinChange: (value: string, index: number) => void
	handleInputElementChange: (el: HTMLInputElement | null, index: number) => void
	handleFocusIndexChange: (index: number) => void
	labelFor: ComputedRef<string>
}

if (!context) {
	throw new Error('Injection not found. Component must be used within PinRoot component')
}
</script>

<template>
	<label v-bind="$attrs" :for="context.labelFor.value">
		<slot />
	</label>
	<p>{{ context.labelFor }}</p>
</template>
