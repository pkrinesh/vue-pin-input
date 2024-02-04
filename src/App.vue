<script setup lang="ts">
import PinExample from '@/components/PinExample.vue'
import PinBlog from '@/components/PinBlog.vue'
</script>

<template>
	<div class="grid h-full grid-cols-2 place-items-center overflow-hidden">
		<div class="size-full border-r border-r-border bg-muted p-8">
			<PinBlog />
		</div>
		<div class="grid size-full place-items-center">
			<PinExample />
		</div>
	</div>
</template>
