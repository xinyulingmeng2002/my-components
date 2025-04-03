<!-- components/Tabs/Tab.vue -->
<script setup>
import { inject } from 'vue'

const props = defineProps({
  name: String
})

const { activeTab } = inject('tabsContext')
const isActive = computed(() => activeTab.value === props.name)
</script>

<template>
  <div v-show="isActive" class="tab-pane">
    <slot></slot>
  </div>
</template>