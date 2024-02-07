<script setup lang="ts">
// TODO: Finish working on content
import PinBlog from '@/components/PinBlog.vue'
import PinExample from '@/components/PinExample.vue'
import ToggleTheme from '@/components/ToggleTheme.vue'
</script>

<template>
	<div class="relative h-full max-w-screen-2xl">
		<ToggleTheme class="absolute right-2 top-2" />
		<div class="grid h-full place-items-center lg:grid-cols-2 lg:overflow-hidden">
			<div class="size-full border-r border-r-border bg-muted/10 py-8 lg:overflow-y-auto">
				<PinBlog />
			</div>
			<div class="order-first grid size-full place-items-center space-y-4 px-4 py-8 lg:order-1">
				<h1 class="mt-4 w-full max-w-2xl text-4xl font-semibold text-primary lg:hidden">
					Accessible Pin Input
				</h1>
				<PinExample />
			</div>
		</div>
	</div>
</template>
