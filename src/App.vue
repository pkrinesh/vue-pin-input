<script setup lang="ts">
import { computed, onMounted, ref, triggerRef } from 'vue'
const PIN_SIZE = 6
const PLACEHOLDER = 'o'
const pinInputs = Array.from({ length: PIN_SIZE }).fill(0)

const pin = ref<string[]>([])
const focusedIndex = ref(0)
const pinRefs = ref<HTMLInputElement[]>([])

const pinString = computed(() => pin.value.join(''))

onMounted(() => {
	pinRefs.value[pin.value.length === 0 ? 0 : pin.value.length - 1].focus()
})

function handleComplete(value: string) {
	console.log(value)
}

function handleChange(e: Event, index: number) {
	const el = e.target as HTMLInputElement

	if (!el.value) return

	const selectionStart = el.selectionStart ?? 1
	const value = selectionStart > 1 ? el.value.slice(-1) : el.value.slice(0, 1)
	pin.value.splice(index, 1, value)
	triggerRef(pin)

	const nextEl = next(pinRefs.value, index)
	nextEl.focus()

	if (pinString.value.length === PIN_SIZE && focusedIndex.value === PIN_SIZE - 1) {
		handleComplete(pinString.value)
	}
}

function handleKeypress(e: KeyboardEvent, index: number) {
	const prevEl = prev(pinRefs.value, index)
	const nextEl = next(pinRefs.value, index)

	switch (e.key) {
		case 'Backspace':
			e.preventDefault()
			if (pin.value[index]) {
				pin.value[index] = ''
			} else {
				pin.value[index - 1] = ''
				pinRefs.value[index === 0 ? index : index - 1].focus()
			}
			break
		case 'Delete':
			e.preventDefault()
			pin.value[index] = ''
			break
		case 'ArrowLeft':
			e.preventDefault()
			prevEl.focus()
			break
		case 'ArrowRight':
			e.preventDefault()
			if (index < pin.value.length) {
				nextEl.focus()
			}
			break
		case 'Home':
			e.preventDefault()
			pinRefs.value[0].focus()
			break
		case 'End':
			e.preventDefault()
			if (pin.value.length !== PIN_SIZE) return
			last(pinRefs.value).focus()
			break
		default:
			break
	}
}

function handleFocus(e: Event, index: number) {
	e.preventDefault()
	const el = e.target as HTMLInputElement

	el.setSelectionRange(1, 1)
	pinRefs.value[index].placeholder = ''
	focusedIndex.value = index
}

function handleBlur(e: Event, index: number) {
	e.preventDefault()
	pinRefs.value[index].placeholder = PLACEHOLDER
}

function next<T>(array: T[], index: number): T {
	if (index === array.length - 1) {
		return array[index]
	}
	return array[index + 1]
}

function prev<T>(array: T[], currentIndex: number): T {
	if (currentIndex <= 0) {
		return array[0]
	}
	return array[currentIndex - 1]
}

function last<T>(array: T[]): T {
	return array[array.length - 1]
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
					@input="(e) => handleChange(e, index)"
					@keyup="(e) => handleKeypress(e, index)"
					@focus="(e) => handleFocus(e, index)"
					@blur="(e) => handleBlur(e, index)"
				/>
			</div>
			<p>{{ pin }}</p>
			<p>{{ pinString || '&nbsp;' }}</p>
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
