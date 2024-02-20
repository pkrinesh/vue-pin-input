<script setup lang="ts">
import { usePinContext } from './pin-context.js'

const context = usePinContext()
</script>

<template>
	<label v-bind="$attrs" :for="context.labelFor.value">
		<slot />
	</label>
</template>
