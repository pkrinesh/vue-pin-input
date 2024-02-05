<script setup lang="ts">
// TODO: Finish working on content
import PinBlog from '@/components/PinBlog.vue'
import PinExample from '@/components/PinExample.vue'
import ToggleTheme from '@/components/ToggleTheme.vue'
</script>

<template>
	<ToggleTheme class="absolute right-2 top-2" />
	<div class="grid h-full grid-cols-2 place-items-center overflow-hidden">
		<div class="size-full border-r border-r-border bg-muted p-8">
			<PinBlog />
		</div>
		<div class="grid size-full place-items-center">
			<PinExample />
		</div>
	</div>
</template>
