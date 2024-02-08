<script setup lang="ts">
/**
 * - [x] Managing focus and tabindex is hardest part.
 * - [x] Type '123' and click outside and again click the tab. You will find the focus exactly where you left it.
 * - [x] Even when you navigate via keyboard focus will work just the fine.
 * - [x] Now type '123456', you will see inputs are disabled and some action is fired. You will get the error but here you will find all the inputs are reset and focus is on the first input. This is all managed on ui page buy the method expose via component.
 * - [x] Now please copy the code. You will focused back to where the previous focused was even if few inputs are filled.
 */

import CheckIcon from '@/components/icons/CheckIcon.vue'
import EyeIcon from '@/components/icons/EyeIcon.vue'
import EyeOffIcon from '@/components/icons/EyeOffIcon.vue'
import CopyIcon from '@/components/icons/CopyIcon.vue'
import PinInput from '@/components/pin/PinInput.vue'
import PinLabel from '@/components/pin/PinLabel.vue'
import PinRoot from '@/components/pin/PinRoot.vue'
import { vConfetti } from '@neoconfetti/vue'
import { useClipboard } from '@vueuse/core'
import { ref } from 'vue'
import { state } from '@/utils/signal'

const TRUE_OTP = '192837'
const PIN_SIZE = 6

const otpRef = ref<InstanceType<typeof PinRoot> | null>(null)
const { copy, copied } = useClipboard({ source: TRUE_OTP, legacy: true })

const [isDisabled, setIsDisabled] = state(false)
const [isMasked, setIsMasked] = state(false)
// const [accessible, setAccessible] = state(true)
const isAccessible = ref(true)
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
	isAccessible.value && otpRef.value?.reset()
}

function handleCopy() {
	copy(TRUE_OTP)
	setIsError(false)
	isAccessible.value && otpRef.value?.focus()
}

function handleMasking() {
	setIsMasked(!isMasked())
	isAccessible.value && otpRef.value?.focus()
}

function handleResending() {
	setIsMasked(!isMasked())
	isAccessible.value && otpRef.value?.reset()
}
</script>

<template>
	<div
		class="flex flex-col items-center justify-center rounded-xl border border-border bg-card p-4 text-card-foreground shadow md:h-72 md:w-[28rem]"
	>
		<div v-if="!isOtpTrue()" class="space-y-4">
			<form class="flex flex-col gap-2">
				<label class="ml-auto">
					<input tabindex="-1" type="checkbox" v-model="isAccessible" />
					Accessible
				</label>
				<PinRoot
					ref="otpRef"
					class="space-y-4"
					:mask="isMasked()"
					@complete="handleComplete"
					@valueChange="() => setIsError(false)"
				>
					<div class="flex items-center justify-between">
						<PinLabel class="text-sm font-medium">Please Enter otp sent to your number</PinLabel>
					</div>
					<div class="flex gap-3">
						<PinInput
							v-for="(_, index) in PIN_SIZE"
							class="size-10 rounded-md border border-input bg-transparent text-center text-lg font-medium shadow-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
							:class="[
								isError()
									? 'ring-1 ring-destructive focus-visible:ring'
									: 'focus-visible:ring focus-visible:ring-ring',
							]"
							:disabled="isDisabled()"
							:key="index"
							:index="index"
						/>
					</div>

					<div>
						<p v-if="isError()" class="text-sm text-destructive">
							Oops! Looks like you got it wrong. Try again!
						</p>
						<div v-else class="flex items-center justify-between">
							<p class="text-sm text-foreground/80">Do not share your otp with anyone</p>
							<button class="text-lg" @click.prevent="handleMasking">
								<EyeIcon v-if="!isMasked()" />
								<EyeOffIcon v-else />
							</button>
						</div>
					</div>
				</PinRoot>
			</form>

			<button
				class="-mx-2 rounded-sm px-2 py-1 text-sm font-medium text-primary transition-all hover:bg-muted/20"
				@click.prevent="handleResending"
			>
				Resend Otp
			</button>

			<div class="relative w-full rounded-lg bg-muted p-3 text-muted-foreground">
				<p class="font-medium">192837</p>
				<button
					@click="handleCopy"
					class="group absolute right-2 top-0 flex size-8 translate-y-2 items-center justify-center transition"
				>
					<CheckIcon v-if="copied" class="text-primary" />
					<CopyIcon v-else class="group-hover:text-primary" />
				</button>
			</div>
		</div>

		<div v-else class="flex flex-col items-center justify-center gap-2">
			<div v-confetti="{ duration: 2000, stageHeight: 500, stageWidth: 500, force: 1 }" />
			<h1 class="text-4xl font-bold">Congratulations!</h1>
			<p>Thank you for playing along. I hope you had fun.</p>
			<button
				@click="setIsOtpTrue(false)"
				class="mt-6 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg transition hover:opacity-90"
			>
				Start Over
			</button>
		</div>
	</div>
</template>
