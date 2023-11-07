<script setup lang="ts">
import { last, next, prev } from '@/utils/array.js'
import { addTabIndex } from '@/utils/tabs.js'
import { inject, onMounted, ref } from 'vue'

const prop = defineProps<{
	index: number
	pinSize: number
}>()

const context = inject('pinInputContext') as {
	pinRefs: HTMLInputElement[]
	pin: string[]
	handleComplete: () => void
	handlePinChange: (value: string, index: number) => void
	handleInputElementChange: (el: HTMLInputElement, index: number) => void
	handleFocusIndexChange: (index: number) => void
}

if (!context) {
	throw new Error('Injection not found. Component must be used within PinRoot component')
}

const PLACEHOLDER = 'o'
const inputRef = ref<HTMLInputElement | null>(null)

onMounted(() => {
	const el = inputRef.value
	if (!el || context.pinRefs[prop.index]) return

	context.handleInputElementChange(el, prop.index)
})

onMounted(() => {
	const pinEl = context.pinRefs[context.pin.length === 0 ? 0 : context.pin.length - 1]
	if (!pinEl) return

	pinEl.focus()
	addTabIndex(context.pinRefs, context.pin.length === 0 ? 0 : context.pin.length - 1)
	context.pinRefs.forEach((item) => {
		item.setAttribute('role', 'tab')
	})
})

function handleInput(e: Event, index: number) {
	e.preventDefault()

	const el = e.target as HTMLInputElement
	if (!el.value) return

	const selectionStart = el.selectionStart ?? 1
	const value = selectionStart > 1 ? el.value.slice(-1) : el.value.slice(0, 1)
	el.value = value
	context.handlePinChange(value, index)

	const { nextEl, nextIndex } = next(context.pinRefs, index)
	addTabIndex(context.pinRefs, nextIndex)
	nextEl.focus()

	context.handleComplete()
}

function handlePaste(e: ClipboardEvent, index: number) {
	e.preventDefault()

	const clipboardData = e.clipboardData
	if (!clipboardData) return

	const pastedData = clipboardData.getData('text')
	const initialIndex = pastedData.length >= prop.pinSize ? 0 : index
	const lastIndex = Math.min(initialIndex + pastedData.length, prop.pinSize)

	for (let i = initialIndex; i < lastIndex; i++) {
		context.handlePinChange(pastedData[i - initialIndex], i)
		context.pinRefs[i].focus()
		addTabIndex(context.pinRefs, i)
	}

	context.pinRefs[lastIndex]?.focus()
	addTabIndex(context.pinRefs, lastIndex - 1)
	context.handleComplete()
}

function handleKeypress(e: KeyboardEvent, index: number) {
	switch (e.key) {
		case 'Backspace': {
			e.preventDefault()

			if (context.pin[index]) {
				inputRef.value!.value = ''
				context.handlePinChange('', index)
			} else {
				if (index === 0) return
				inputRef.value!.value = ''
				context.handlePinChange('', index - 1)
				const { prevEl, prevIndex } = prev(context.pinRefs, index)
				prevEl.focus()
				addTabIndex(context.pinRefs, prevIndex)
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
			const { prevEl, prevIndex } = prev(context.pinRefs, index)
			prevEl.focus()
			addTabIndex(context.pinRefs, prevIndex)
			break
		}
		case 'ArrowRight': {
			e.preventDefault()
			const el = e.target as HTMLInputElement

			// only allow focus to move to next when the current element hold the value
			if (el.value) {
				const { nextEl, nextIndex } = next(context.pinRefs, index)
				nextEl.focus()
				addTabIndex(context.pinRefs, nextIndex)
			}
			break
		}
		case 'Home': {
			e.preventDefault()
			context.pinRefs[0].focus()
			addTabIndex(context.pinRefs, 0)
			break
		}
		case 'End': {
			e.preventDefault()
			if (!context.pin[prop.pinSize - 1]) return

			last(context.pinRefs).focus()
			addTabIndex(context.pinRefs, context.pinRefs.length - 1)
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
}

function handleBlur(e: FocusEvent) {
	e.preventDefault()
	if (!inputRef.value) return
	inputRef.value.placeholder = PLACEHOLDER
}
</script>

<template>
	<input
		type="text"
		id="pin-input"
		ref="inputRef"
		:placeholder="PLACEHOLDER"
		:value="context.pin[prop.index]"
		@input="(e) => handleInput(e, prop.index)"
		@keyup="(e) => handleKeypress(e, prop.index)"
		@focus="(e) => handleFocus(e, prop.index)"
		@blur="(e) => handleBlur(e)"
		@paste="(e) => handlePaste(e, prop.index)"
	/>
</template>
