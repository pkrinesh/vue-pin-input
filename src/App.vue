<script setup lang="ts">
import PinInput from '@/components/pin/PinInput.vue'
import PinRoot from '@/components/pin/PinRoot.vue'
import PinLabel from '@/components/pin/PinLabel.vue'
import { ref } from 'vue'

const PIN_SIZE = 6
const pinValue = ref('')
</script>

<template>
	<div class="screen">
		<form>
			<PinRoot @complete="(value) => console.log(value)" @valueChange="(val) => (pinValue = val)">
				<PinLabel>Enter otp sent to your number:</PinLabel>
				<div class="pin-container">
					<PinInput v-for="(_, index) in PIN_SIZE" class="pin-input" :key="index" :index="index" />
				</div>
			</PinRoot>
		</form>
		<p>{{ pinValue || '&nbsp;' }}</p>
		<p>Copy this code: <code class="code">192837</code></p>
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
