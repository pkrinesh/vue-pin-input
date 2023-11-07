<script setup lang="ts">
/**
 * [x] Copy-paste input - 192837
 * [x] separate component
 * [x] make it headless and composable
 * [x] Separate the core utils and more
 * [ ] Masked input
 * [ ] for utils function use ref/no-ref - look into vueuse
 * [ ] Error handling
 * [ ] Animated border, on error animation and different colors
 * [ ] Document the process
 * [ ] Make a proper otp page with mock api both success and error
 */
import { computed, ref, provide, toValue, useAttrs } from 'vue'

const PIN_SIZE = 6
const pinRefs = ref<HTMLInputElement[]>([])
const pin = ref<string[]>([])
const focusedIndex = ref(0)
const pinString = computed(() => pin.value.join(''))

const attrs = useAttrs()

function handlePinChange(value: string, index: number) {
	pin.value[index] = value
}

function handleComplete() {
	if (pinString.value.length !== PIN_SIZE || focusedIndex.value !== PIN_SIZE - 1) return

	console.log(pinString.value)
}

function handleInputElementChange(el: HTMLInputElement, index: number) {
	pinRefs.value[index] = el
}

function handleFocusIndexChange(index: number) {
	focusedIndex.value = index
}

provide('pinInputContext', {
	pinRefs: toValue(pinRefs),
	pin: toValue(pin),
	handleComplete,
	handlePinChange,
	handleInputElementChange,
	handleFocusIndexChange,
})
</script>

<template>
	<div v-bind="attrs">
		<slot />
	</div>
	<!-- <p>{{ pin }}</p>
	<p>{{ pinString || '&nbsp;' }}</p>
	<p>Copy this code: <code class="code">192837</code></p> -->
</template>
