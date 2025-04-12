<script setup>
import { ref } from 'vue'
import Tabs from './Tabs.vue'
import Tab from './Tab.vue'

defineOptions({
  name: 'TabsDemo'
})

const activeTab = ref('tab1')
</script>

<template>
  <div class="tabs-demo">
    <h3>基础用法</h3>
    <Tabs v-model:active="activeTab">
      <Tab name="tab1" title="标签1">
        <p>这里是标签1的内容</p>
      </Tab>
      <Tab name="tab2" title="标签2">
        <p>这里是标签2的内容</p>
      </Tab>
    </Tabs>

    <h3>禁用标签</h3>
    <Tabs v-model:active="activeTab">
      <Tab name="tab1" title="标签1">
        <p>这里是标签1的内容</p>
      </Tab>
      <Tab name="tab2" title="标签2" disabled>
        <p>这里是禁用的标签2内容</p>
      </Tab>
    </Tabs>
  </div>
</template>

<style scoped>
.tabs-demo {
  padding: 20px;
}

.tabs-demo h3 {
  margin: 20px 0 10px;
  color: #333;
}

.tab-pane {
  padding: 10px;
  border: 1px solid #ddd;
  border-top: none;
}
</style>
