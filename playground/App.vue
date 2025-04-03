<!-- playground/App.vue -->
<template>
    <div class="playground">
      <h1>组件测试沙盒</h1>
      <section>
        <h2>按钮组件</h2>
        <MyButton @click="log('点击')">默认按钮</MyButton>
      </section>
    </div>
  </template>
  
  <script setup>
  const log = (msg) => console.log(msg)
  </script>
  
  <style>
  .playground {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  section {
    margin: 20px 0;
    padding: 20px;
    border: 1px solid #eee;
  }
  </style>