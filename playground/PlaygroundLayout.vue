<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentRoute = computed(() => route.path)
const currentTheme = ref(localStorage.getItem('theme') || 'light')

const components = [
  { name: 'Button', path: '/button' },
  { name: 'Tabs', path: '/tabs' },
  { name: 'Carousel', path: '/carousel' },
  { name: 'SideBar', path: '/sidebar' },
  { name: 'CodeBlock', path: '/codeblock' },
  { name: 'PreviewBlock', path: '/previewblock' }
]

// 应用主题
const applyTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
}

// 初始化主题
applyTheme(currentTheme.value)

// 监听主题变化
watch(currentTheme, (newTheme) => {
  applyTheme(newTheme)
})
</script>

<template>
  <div class="playground-layout" :data-theme="currentTheme">
    <header class="header">
      <h1>组件 Playground</h1>
      <ThemeSwitcher v-model="currentTheme" class="theme-switcher" />
    </header>
    
    <div class="main">
      <aside class="sidebar">
        <nav>
          <h3>组件列表</h3>
          <ul>
            <li v-for="comp in components" :key="comp.path">
              <router-link 
                :to="comp.path"
                :class="{ active: currentRoute === comp.path }"
              >
                {{ comp.name }}
              </router-link>
            </li>
          </ul>
        </nav>
      </aside>
      
      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped>
.playground-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--bg-color);
  color: var(--text-color);
  transition: background 0.3s, color 0.3s;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: var(--header-bg);
  color: var(--header-text);
  border-bottom: 1px solid var(--border-color);
}

.main {
  display: flex;
  flex: 1;
}

.sidebar {
  width: 250px;
  padding: 1rem;
  background: var(--sidebar-bg);
  border-right: 1px solid var(--border-color);
}

.content {
  flex: 1;
  padding: 2rem;
  background: var(--content-bg);
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin: 0.5rem 0;
}

.sidebar a {
  display: block;
  padding: 0.5rem;
  color: var(--link-color);
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.2s;
}

.sidebar a:hover {
  background: var(--link-hover-bg);
}

.sidebar a.active {
  background: var(--primary-color);
  color: white;
}

.theme-switcher {
  margin-left: 1rem;
}
</style>
