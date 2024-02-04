<script setup lang="ts">
/**
 * - [x] Managing focus and tab-index is hardest part.
 * - [x] Type '123' and click outside and again click the tab. You will find the focus exactly where you left it.
 * - [x] Even when you navigate via keyboard focus will work just the fine.
 * - [x] Now type '123456', you will see inputs are disabled and some action is fired. You will get the error but here you will find all the inputs are reset and focus is on the first input. This is all managed on ui page buy the method expose via component.
 * - [x] Now please copy the code. You will focused back to where the previous focused was even if few inputs are filled.
 */

import CheckIcon from '@/components/icons/CheckIcon.vue'
import CopyIcon from '@/components/icons/CopyIcon.vue'
import PinInput from '@/components/pin/PinInput.vue'
import PinLabel from '@/components/pin/PinLabel.vue'
import PinRoot from '@/components/pin/PinRoot.vue'
import { vConfetti } from '@neoconfetti/vue'
import { useClipboard } from '@vueuse/core'
import { ref } from 'vue'
import { state } from './utils/signal'

const TRUE_OTP = '192837'
const PIN_SIZE = 6

const otpRef = ref<InstanceType<typeof PinRoot> | null>(null)
const { copy, copied } = useClipboard({ source: TRUE_OTP, legacy: true })

const [isDisabled, setIsDisabled] = state(false)
const [isOtpTrue, setIsOtpTrue] = state(false)
const [isError, setIsError] = state(false)

async function handleComplete(value: string) {
	setIsDisabled(true)
	await new Promise((reject) => setTimeout(reject, 1000))
	if (value === TRUE_OTP) {
		setIsOtpTrue(true)
		setIsError(false)
		setIsDisabled(false)
		return
	}

	setIsError(true)
	setIsOtpTrue(false)
	setIsDisabled(false)
	otpRef.value?.reset()
}

function handleCopy() {
	copy(TRUE_OTP)
	setIsError(false)
	otpRef.value?.focus()
}
</script>

<template>
	<div class="h-full flex flex-col flex-1 justify-center items-center overflow-hidden">
		<div
			class="w-md h-70 flex flex-col rounded-xl border border-border bg-card text-card-foreground shadow p-4 justify-center items-center"
		>
			<div v-if="!isOtpTrue()" class="space-y-4">
				<form class="flex flex-col gap-2">
					<PinRoot
						ref="otpRef"
						class="space-y-4"
						@complete="handleComplete"
						@valueChange="() => setIsError(false)"
					>
						<PinLabel>Please Enter otp sent to your number</PinLabel>
						<div class="flex gap-3">
							<PinInput
								v-for="(_, index) in PIN_SIZE"
								class="h-10 w-10 text-center text-lg bg-transparent rounded-md border font-medium border-input shadow-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
								:class="[
									isError()
										? 'border-destructive ring ring-destructive focus-visible:ring-2'
										: 'focus-visible:ring-2 focus-visible:ring-ring',
								]"
								:disabled="isDisabled()"
								:key="index"
								:index="index"
							/>
						</div>
					</PinRoot>
				</form>

				<div class="relative w-75 p-3 bg-muted text-muted-foreground rounded-lg">
					<p class="font-medium">192837</p>
					<button
						@click="handleCopy"
						class="group absolute flex justify-center items-center top-0 right-2 h-8 w-8 translate-y-2 transition"
					>
						<CheckIcon v-if="copied" class="text-primary" />
						<CopyIcon v-else class="group-hover:text-primary" />
					</button>
				</div>
			</div>

			<div v-else class="flex flex-col justify-center items-center gap-2">
				<div v-confetti="{ duration: 2000, stageHeight: 500, stageWidth: 500, force: 1 }" />
				<h1 class="text-4xl font-bold">Congratulations!</h1>
				<p>Thank you for playing along. I hope you had fun.</p>
				<button
					@click="setIsOtpTrue(false)"
					class="mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm shadow-lg font-medium transition hover:opacity-90"
				>
					Start Over
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
