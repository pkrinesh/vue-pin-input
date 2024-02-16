<script setup lang="ts">
import { last, next, prev } from '@/utils/array.js'
import { addTabIndex } from '@/utils/tabs.js'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { usePinContext } from './pin-context'

const props = defineProps<{
	index: number
	disabled?: boolean
}>()
const context = usePinContext()
const inputRef = ref<HTMLInputElement | null>(null)
const isMasked = computed(() => context.mask?.value)
const placeholder = computed(() => context.placeholder?.value ?? 'o')

onMounted(() => {
	const el = inputRef.value
	if (!el || context.pinRefs[props.index]) return

	context.handleInputElementChange(el, props.index)
})

onUnmounted(() => {
	context.handleInputElementChange(null, props.index)
})

function handleInput(e: Event, index: number) {
	e.preventDefault()

	const el = e.target as HTMLInputElement
	// no value or not a number
	if (!el.value || !!el.value.match(/\D/g)) {
		el.value = ''
		return
	}

	const selectionStart = el.selectionStart ?? 1
	const value = selectionStart > 1 ? el.value.slice(-1) : el.value.slice(0, 1)
	el.value = value
	context.handlePinChange(value, index)

	const { nextEl } = next(context.pinRefs, index)
	nextEl.focus()
}

function handlePaste(e: ClipboardEvent, index: number) {
	e.preventDefault()

	const clipboardData = e.clipboardData
	if (!clipboardData) return

	const pastedData = clipboardData.getData('text')
	const initialIndex = pastedData.length >= context.pinSize.value ? 0 : index
	const lastIndex = Math.min(initialIndex + pastedData.length, context.pinSize.value)

	for (let i = initialIndex; i < lastIndex; i++) {
		context.handlePinChange(pastedData[i - initialIndex], i)
		context.pinRefs[i].focus()
		context.pinRefs[i].value = pastedData[i - initialIndex]
	}

	context.pinRefs[lastIndex]?.focus()
}

function handleKeydown(e: KeyboardEvent, index: number) {
	switch (e.key) {
		case 'Backspace': {
			e.preventDefault()

			if (context.pin.value[index]) {
				inputRef.value!.value = ''
				context.handlePinChange('', index)
			} else {
				if (index < 0) return
				inputRef.value!.value = ''
				context.handlePinChange('', index - 1)
				const { prevEl } = prev(context.pinRefs, index)
				prevEl.focus()
			}
			break
		}
		case 'Delete': {
			e.preventDefault()
			context.handlePinChange('', index)
			break
		}
		case 'ArrowLeft': {
			e.preventDefault()
			const { prevEl } = prev(context.pinRefs, index)
			prevEl.focus()
			break
		}
		case 'ArrowRight': {
			e.preventDefault()
			const el = e.target as HTMLInputElement

			// only allow focus to move to next when the current element hold the value
			if (el.value) {
				const { nextEl } = next(context.pinRefs, index)
				nextEl.focus()
			}
			break
		}
		case 'Home': {
			e.preventDefault()
			context.pinRefs[0].focus()
			break
		}
		case 'End': {
			e.preventDefault()
			if (!context.pin.value[context.pinSize.value - 1]) return

			last(context.pinRefs).focus()
			break
		}
		default:
			break
	}
}

function handleFocus(e: FocusEvent, index: number) {
	e.preventDefault()
	const el = e.target as HTMLInputElement

	el.setSelectionRange(1, 1)
	if (!inputRef.value) return
	inputRef.value.placeholder = ''

	context.handleFocusIndexChange(index)
	addTabIndex(context.pinRefs, index)
}

function handleBlur(e: FocusEvent) {
	e.preventDefault()
	if (!inputRef.value) return
	inputRef.value.placeholder = placeholder.value
}
</script>

<template>
	<input
		v-bind="$attrs"
		ref="inputRef"
		:id="`pin-input-${index}`"
		:type="isMasked ? 'password' : 'text'"
		:placeholder="placeholder"
		:disabled="disabled ? disabled : false"
		:data-completed="context.dataCompleted.value ? '' : undefined"
		@input="(e) => handleInput(e, props.index)"
		@keydown="(e) => handleKeydown(e, props.index)"
		@focus="(e) => handleFocus(e, props.index)"
		@blur="(e) => handleBlur(e)"
		@paste="(e) => handlePaste(e, props.index)"
		aria-hidden
	/>
</template>
