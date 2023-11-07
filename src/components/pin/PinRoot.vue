<script setup lang="ts">
/**
 * [x] Copy-paste input - 192837
 * [x] separate component
 * [x] make it headless and composable
 * [x] Separate the core utils and more
 * [x] Masked input
 * [ ] for utils function use ref/no-ref - look into vueuse
 * [ ] Error handling
 * [ ] Animated border, on error animation and different colors
 * [ ] Document the process
 * [ ] Make a proper otp page with mock api both success and error
 */
import { computed, ref, provide, toValue, readonly, toRefs } from 'vue'

const props = defineProps<{
	mask?: boolean
}>()

const emit = defineEmits<{
	complete: [value: string]
	valueChange: [value: string]
}>()

const { mask } = toRefs(props)

const pinRefs = ref<HTMLInputElement[]>([])
const pin = ref<string[]>([])
const focusedIndex = ref(0)
const pinString = computed(() => pin.value.join(''))
const pinSize = computed(() => pinRefs.value.length)
const labelFor = computed(() => `pin-input-${focusedIndex.value}`)

function handlePinChange(value: string, index: number) {
	pin.value[index] = value
	emit('valueChange', pinString.value)
}

function handleComplete() {
	if (pinString.value.length !== pinSize.value || focusedIndex.value !== pinSize.value - 1) return
	emit('complete', pinString.value)
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
	pinSize: readonly(pinSize),
	handleComplete,
	handlePinChange,
	handleInputElementChange,
	handleFocusIndexChange,
	mask,
	labelFor,
})
</script>

<template>
	<p>{{ props.mask }}</p>
	<div v-bind="$attrs">
		<slot />
	</div>
</template>
