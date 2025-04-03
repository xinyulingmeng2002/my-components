<template>
    <PreviewBlock title="按钮示例">
      <template #demo>
        <MyButton @click="count++">点击次数：{{ count }}</MyButton>
      </template>
      <template #code>
        <CodeBlock lang="html" :code ="`<MyButton @click='handleClick'>按钮</MyButton>`" />
      </template>
    </PreviewBlock>
    <Carousel 
    :interval="5000"
    indicator-position="bottom"
    transition="fade"
  >
    <CarouselItem v-for="item in 3" :key="item">
      <img :src="`/slides/${item}.jpg`">
    </CarouselItem>
  </Carousel>
</template>
<script setup>
import { ref } from 'vue'
import MyButton from '../src/components/Button/Button.vue'
import PreviewBlock from '../src/components/PreviewBlock/PreviewBlock.vue'
import CodeBlock from '../src/components/CodeBlock/CodeBlock.vue'
const count = ref(0)
</script>
<style scoped>
</style>
<!-- {{ `
    <MyButton @click="handleClick">按钮</MyButton>
  ` }} -->