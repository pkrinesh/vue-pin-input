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
import { computed, ref, toValue, readonly, toRefs } from 'vue'
import { definePinContext } from './pin-context'

const props = defineProps<{
	mask?: boolean
	placeholder?: string
}>()

const emit = defineEmits<{
	complete: [value: string]
	valueChange: [value: string, index?: number]
}>()

const { mask, placeholder } = toRefs(props)

const pinRefs = ref<Array<HTMLInputElement>>([])
const pin = ref<string[]>([])
const dataCompleted = ref(false)
const focusedIndex = ref(0)
const pinString = computed(() => pin.value.join(''))
const pinSize = computed(() => pinRefs.value.length)
const labelFor = computed(() => `pin-input-${focusedIndex.value}`)

function handlePinChange(value: string, index: number) {
	pin.value[index] = value
	emit('valueChange', pinString.value, index)
	handleComplete()
}

function handleComplete() {
	if (pinString.value.length !== pinSize.value || focusedIndex.value !== pinSize.value - 1) {
		dataCompleted.value = false
	} else {
		dataCompleted.value = true
		emit('complete', pinString.value)
	}
}

function focusInput() {
	const el = pinRefs.value[focusedIndex.value] as HTMLInputElement
	el.focus()
}

function blurInput() {
	const el = pinRefs.value[focusedIndex.value] as HTMLInputElement
	el.blur()
}

function handleInputElementChange(el: HTMLInputElement | null, index: number) {
	pinRefs.value[index] = el as HTMLInputElement
}

function handleFocusIndexChange(index: number) {
	focusedIndex.value = index
}

defineExpose({
	focus: focusInput,
	blur: blurInput,
})

definePinContext({
	pinRefs: toValue(pinRefs),
	pin: toValue(pin),
	pinSize: readonly(pinSize),
	handlePinChange,
	handleInputElementChange,
	handleFocusIndexChange,
	mask,
	labelFor,
	placeholder,
	dataCompleted: dataCompleted,
	handleComplete,
})
</script>

<template>
	<div v-bind="$attrs">
		<slot />
	</div>
</template>
