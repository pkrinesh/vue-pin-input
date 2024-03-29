<script setup lang="ts">
import CheckIcon from '@/components/icons/CheckIcon.vue'
import EyeIcon from '@/components/icons/EyeIcon.vue'
import EyeOffIcon from '@/components/icons/EyeOffIcon.vue'
import CopyIcon from '@/components/icons/CopyIcon.vue'
import PinInput from '@/lib/PinInput.vue'
import PinLabel from '@/lib/PinLabel.vue'
import PinRoot from '@/lib/PinRoot.vue'
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
const [isOtpTrue, setIsOtpTrue] = state(false)
const [isError, setIsError] = state(false)
const isAccessible = ref(true)

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
		class="flex w-full min-w-[22rem] max-w-[28rem] flex-col items-center justify-center rounded-xl border border-border bg-card p-4 text-card-foreground shadow md:h-72"
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
			<div v-confetti="{ duration: 2000, stageWidth: 500, force: 1 }" />
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
