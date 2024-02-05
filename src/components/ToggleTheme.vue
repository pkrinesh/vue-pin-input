<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { onMounted, watchEffect } from 'vue'
import MoonIcon from './icons/MoonIcon.vue'
import SunIcon from './icons/SunIcon.vue'

function useTheme() {
	const theme = useLocalStorage<'light' | 'dark'>('theme', null)

	onMounted(() => {
		if (!theme.value) {
			theme.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
		}
	})

	watchEffect(() => {
		document.documentElement.classList[theme.value === 'dark' ? 'add' : 'remove']('dark')
	})

	function toggleTheme() {
		const isDark = document.documentElement.classList.contains('dark')
		theme.value = isDark ? 'light' : 'dark'
	}

	return { theme: () => theme.value, toggleTheme }
}

const { theme, toggleTheme } = useTheme()
</script>
<template>
	<div>
		<button
			class="inline-flex size-10 items-center justify-center rounded-md bg-background text-xl transition hover:bg-accent"
			@click="toggleTheme"
		>
			<MoonIcon v-if="theme() === 'light'" />
			<SunIcon v-else />
		</button>
	</div>
</template>
