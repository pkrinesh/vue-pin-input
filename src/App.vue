<script setup lang="ts">
import PinBlog from '@/components/PinBlog.vue'
import PinExample from '@/components/PinExample.vue'
import ToggleTheme from '@/components/ToggleTheme.vue'
import GitHub from '@/components/icons/GitHub.vue'
</script>

<template>
	<div class="relative h-full max-w-screen-2xl">
		<div class="absolute right-2 top-1 flex items-center justify-center gap-1 p-2">
			<a
				href="https://github.com/pkrinesh/vue-pin-input"
				class="inline-flex size-10 items-center justify-center rounded-md bg-background text-xl transition hover:bg-accent"
				target="_blank"
			>
				<GitHub class="text-foreground" />
			</a>
			<ToggleTheme />
		</div>
		<div class="grid h-full place-items-center lg:grid-cols-2 lg:overflow-hidden">
			<div class="size-full border-r border-r-border bg-muted/10 py-8 lg:overflow-y-auto">
				<PinBlog />
			</div>
			<div class="order-first grid size-full place-items-center space-y-4 px-4 py-8 lg:order-1">
				<h1 class="mt-4 w-full max-w-2xl text-4xl font-semibold lg:hidden">Accessible Pin Input</h1>
				<PinExample />
			</div>
		</div>
	</div>
</template>
