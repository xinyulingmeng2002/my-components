<script setup>
import { ref } from 'vue'
import SideBar from './SideBar.vue'

defineOptions({
  name: 'SideBarDemo'
})

const collapsed = ref(false)
const position = ref('left')
const width = ref(250)
</script>

<template>
  <div class="sidebar-demo">
    <h3>基础侧边栏</h3>
    <div class="demo-container">
      <SideBar :width="width" :position="position" :collapsible="true" @toggle="val => collapsed = val">
        <template #header>
          <h4>侧边栏标题</h4>
        </template>
        <div class="sidebar-content">
          <p>菜单项1</p>
          <p>菜单项2</p>
          <p>菜单项3</p>
        </div>
      </SideBar>
      <div class="main-content">
        <button @click="collapsed = !collapsed">
          {{ collapsed ? '展开' : '折叠' }}
        </button>
        <p>主内容区域</p>
      </div>
    </div>

    <h3>不同位置</h3>
    <div class="controls">
      <label>
        <input type="radio" v-model="position" value="left"> 左侧
      </label>
      <label>
        <input type="radio" v-model="position" value="right"> 右侧
      </label>
    </div>
  </div>
</template>

<style scoped>
.sidebar-demo {
  padding: 20px;
}

.demo-container {
  display: flex;
  height: 300px;
  border: 1px solid #eee;
  margin-bottom: 20px;
}

.sidebar-content {
  padding: 10px;
}

.main-content {
  flex: 1;
  padding: 20px;
}

.controls {
  margin: 10px 0;
  display: flex;
  gap: 15px;
}

.controls label {
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>
