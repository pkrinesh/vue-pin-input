<script setup lang="ts">
import PinInput from '@/components/pin/PinInput.vue'
import PinLabel from '@/components/pin/PinLabel.vue'
import PinRoot from '@/components/pin/PinRoot.vue'
import CopyIcon from '@/components/icons/CopyIcon.vue'
import CopyCheck from '@/components/icons/CopyCheck.vue'
import { nextTick, ref } from 'vue'
import { vConfetti } from '@neoconfetti/vue'
import { useClipboard } from '@vueuse/core'
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
	<div class="min-h-100vh overflow-hidden" flex="~ col 1 justify-center items-center">
		<div class="bg-card p4 w-md h-70 rounded-xl shadow-xl" flex="~ col justify-center items-center">
			<div v-if="!isOtpTrue()" class="space-y-4">
				<form flex="~ col gap-2">
					<PinRoot
						ref="otpRef"
						class="space-y-4"
						@complete="handleComplete"
						@valueChange="(val) => setIsError(false)"
					>
						<PinLabel>Please Enter otp sent to your number</PinLabel>
						<div class="" flex="~ gap-3">
							<PinInput
								v-for="(_, index) in PIN_SIZE"
								:disabled="isDisabled()"
								class="h10 w10 bg-transparent placeholder-foreground/70 outline-none"
								:class="[
									isError()
										? 'border-destructive ring ring-destructive focus:ring-destructive'
										: 'border-border focus:ring focus:ring-ring',
								]"
								border="~ 1 rounded"
								text="center lg muted-foreground"
								font="medium"
								:key="index"
								:index="index"
							/>
						</div>
					</PinRoot>
				</form>

				<div class="relative w-75 p3 bg-muted" border="~ card rounded">
					<p class="font-semibold">192837</p>
					<button
						@click="handleCopy"
						class="absolute top-0 right-2 h-8 w-8 translate-y-2 rounded hover:opacity-85"
						:class="[copied ? 'bg-secondary/60' : 'bg-card']"
						flex="~ justify-center items-center"
					>
						<CopyCheck v-if="copied" class="text-success" />
						<CopyIcon v-else />
					</button>
				</div>
			</div>

			<div v-else class="" flex="~ col justify-center items-center gap-2">
				<div v-confetti="{ duration: 2000, stageHeight: 500, stageWidth: 500, force: 1 }" />
				<h1 class="text-4xl font-bold">Congratulations!</h1>
				<p>Thank you for playing along. I hope you had fun.</p>
				<button
					@click="setIsOtpTrue(false)"
					class="mt6 px4 py3 bg-secondary/80 rounded font-semibold transition hover:bg-secondary"
					text=" accent primary-foreground"
				>
					Start Over
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
