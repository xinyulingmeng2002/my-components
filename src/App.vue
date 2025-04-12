<script setup>
import { RouterView } from 'vue-router'
import { computed, provide } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// 确保路由正确注入
const route = useRoute()
const router = useRouter()
provide('router', router)

const isPlayground = computed(() => route.path.startsWith('/playground'))

// 错误处理
const handleNavigationError = (error) => {
  if (error.name === 'NavigationDuplicated') {
    return
  }
  console.error('路由导航错误:', error)
}
</script>

<template>
  <div :class="{ 'app-container': true, 'playground-mode': isPlayground }">
    <!-- 主应用导航 -->
    <nav v-if="!isPlayground" class="main-nav">
      <router-link 
        to="/"
        custom
        v-slot="{ navigate, isActive }"
      >
        <button 
          @click="navigate"
          :class="{ active: isActive }"
          class="nav-button"
        >
          组件演示
        </button>
      </router-link>
      <router-link 
        to="/playground"
        custom
        v-slot="{ navigate, isActive }"
      >
        <button 
          @click="navigate"
          :class="{ active: isActive }"
          class="nav-button"
        >
          交互式 Playground
        </button>
      </router-link>
    </nav>

    <!-- 路由视图 -->
    <RouterView v-slot="{ Component }">
      <component 
        :is="Component" 
        @error="handleNavigationError"
      />
    </RouterView>
  </div>
</template>

<style scoped>
.app-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-color);
  color: var(--text-color);
}

.playground-mode {
  --header-height: 60px;
  --sidebar-width: 250px;
}

.main-nav {
  padding: 1rem;
  background: var(--header-bg);
  display: flex;
  gap: 1rem;
}

.nav-button {
  color: var(--nav-text);
  background: var(--nav-bg);
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-button:hover {
  background: var(--nav-hover);
}

.nav-button.active {
  background: var(--primary-color);
  color: white;
  font-weight: bold;
}
</style>

<style>
/* 全局样式 */
:root {
  --bg-color: #ffffff;
  --text-color: #2c3e50;
  --header-bg: #2c3e50;
  --nav-text: #ffffff;
  --nav-bg: transparent;
  --nav-hover: rgba(255, 255, 255, 0.1);
  --primary-color: #42b983;
}

[data-theme="dark"] {
  --bg-color: #1a1a1a;
  --text-color: #f0f0f0;
  --header-bg: #2c3e50;
  --nav-text: #f0f0f0;
  --nav-bg: transparent;
  --nav-hover: rgba(255, 255, 255, 0.1);
  --primary-color: #42b983;
}
</style>
