<script setup lang="ts">
/**
 * [x] Copy-paste input - 192837
 * [ ] for utils function use ref/no-ref - look into vueuse
 * [ ] separate component
 * [ ] make it headless and composable
 * [ ] Error handling
 * [ ] Animated border, on error animation and different colors
 * [ ] Document the process
 * [ ] Separate the core utils and more
 * [ ] Make a proper otp page with mock api both success and error
 */
import { computed, onMounted, ref, triggerRef } from 'vue'
import { next, prev, last } from '@/utils/array.js'
import { addTabIndex } from '@/utils/tabs.js'

const PIN_SIZE = 6
const PLACEHOLDER = 'o'
const pinInputs = Array.from({ length: PIN_SIZE }).fill(0)

const pin = ref<string[]>([])
const focusedIndex = ref(0)
const pinRefs = ref<HTMLInputElement[]>([])

const pinString = computed(() => pin.value.join(''))

onMounted(() => {
	pinRefs.value[pin.value.length === 0 ? 0 : pin.value.length - 1].focus()
	addTabIndex(pinRefs.value, pin.value.length === 0 ? 0 : pin.value.length - 1)
	pinRefs.value.forEach((item) => {
		item.setAttribute('role', 'tab')
	})
})

function handleComplete(value: string) {
	if (pinString.value.length !== PIN_SIZE || focusedIndex.value !== PIN_SIZE - 1) return

	console.log(value)
}

function handleInput(e: Event, index: number) {
	e.preventDefault()

	const el = e.target as HTMLInputElement
	if (!el.value) return

	const selectionStart = el.selectionStart ?? 1
	const value = selectionStart > 1 ? el.value.slice(-1) : el.value.slice(0, 1)
	pin.value.splice(index, 1, value)
	triggerRef(pin)

	const { nextEl, nextIndex } = next(pinRefs.value, index)
	addTabIndex(pinRefs.value, nextIndex)
	nextEl.focus()

	handleComplete(pinString.value)
}

function handlePaste(e: ClipboardEvent, index: number) {
	e.preventDefault()

	const clipboardData = e.clipboardData
	if (!clipboardData) return

	const pastedData = clipboardData.getData('text')
	const initialIndex = pastedData.length >= PIN_SIZE ? 0 : index
	const lastIndex = Math.min(initialIndex + pastedData.length, PIN_SIZE)

	for (let i = initialIndex; i < lastIndex; i++) {
		pin.value[i] = pastedData[i - initialIndex]
		triggerRef(pinRefs)
		pinRefs.value[i].focus()
		addTabIndex(pinRefs.value, i)
	}

	pinRefs.value[lastIndex]?.focus()
	addTabIndex(pinRefs.value, lastIndex - 1)
	handleComplete(pinString.value)
}

function handleKeypress(e: KeyboardEvent, index: number) {
	switch (e.key) {
		case 'Backspace': {
			e.preventDefault()

			if (pin.value[index]) {
				pin.value[index] = ''
			} else {
				pin.value[index - 1] = ''
				const { prevEl, prevIndex } = prev(pinRefs.value, index)
				prevEl.focus()
				addTabIndex(pinRefs.value, prevIndex)
			}
			break
		}
		case 'Delete': {
			e.preventDefault()
			pin.value[index] = ''
			break
		}
		case 'ArrowLeft': {
			e.preventDefault()
			const { prevEl, prevIndex } = prev(pinRefs.value, index)
			prevEl.focus()
			addTabIndex(pinRefs.value, prevIndex)
			break
		}
		case 'ArrowRight': {
			e.preventDefault()
			if (index < pin.value.length) {
				const { nextEl, nextIndex } = next(pinRefs.value, index)
				nextEl.focus()
				addTabIndex(pinRefs.value, nextIndex)
			}
			break
		}
		case 'Home': {
			e.preventDefault()
			pinRefs.value[0].focus()
			addTabIndex(pinRefs.value, 0)
			break
		}
		case 'End': {
			e.preventDefault()
			if (pin.value.length !== PIN_SIZE) return
			last(pinRefs.value).focus()
			addTabIndex(pinRefs.value, pinRefs.value.length - 1)
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
	pinRefs.value[index].placeholder = ''
	focusedIndex.value = index
}

function handleBlur(e: FocusEvent, index: number) {
	e.preventDefault()
	pinRefs.value[index].placeholder = PLACEHOLDER
}
</script>

<template>
	<div class="screen">
		<form>
			<label for="pin-input">Enter otp sent to your number:</label>
			<div class="pin-container">
				<input
					v-for="(_, index) in pinInputs"
					class="pin-input"
					type="text"
					:placeholder="PLACEHOLDER"
					:key="index"
					:ref="
						(el) => {
							if (!el || pinRefs[index]) return
							pinRefs[index] = el as HTMLInputElement
						}
					"
					:value="pin[index]"
					@input="(e) => handleInput(e, index)"
					@keyup="(e) => handleKeypress(e, index)"
					@focus="(e) => handleFocus(e, index)"
					@blur="(e) => handleBlur(e, index)"
					@paste="(e) => handlePaste(e, index)"
				/>
			</div>
			<p>{{ pin }}</p>
			<p>{{ pinString || '&nbsp;' }}</p>
			<p>Copy this code: <code class="code">192837</code></p>
		</form>
	</div>
</template>

<style scoped>
.screen {
	display: flex;
	flex-direction: column;
	flex: 1;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
}
.pin-label {
	text-align: start;
	align-self: flex-start;
}
.pin-container {
	display: flex;
	gap: 0.75rem;
	margin-top: 1rem;
}
.pin-input {
	width: 2.5rem;
	height: 2.5rem;
	background-color: transparent;
	color: inherit;
	font-weight: 500;
	border: 1px solid hsl(var(--bc));
	text-align: center;
	border-radius: var(--rounded-btn);
	font-size: 1.125rem;
	line-height: 1.75rem;
}

.pin-input:focus {
	border-color: hsl(var(--p));
	/* outline-offset: 3px; */
	outline-width: 2px;
	outline-style: solid;
	outline-color: hsl(var(--p));
}
</style>
