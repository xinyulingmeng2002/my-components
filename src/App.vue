<template>
  <PreviewBlock title="轮播图组件示例">
    <template #demo>
      <ThemeSwitcher />
      <div class="features-section">
        <h3>功能特点</h3>
        <div class="feature-grid">
          <div class="feature-item">
            <div class="feature-icon">✨</div>
            <div class="feature-content">
              <h4>过渡效果</h4>
              <p>支持 Slide/Fade 两种过渡效果</p>
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-icon">📱</div>
            <div class="feature-content">
              <h4>触摸支持</h4>
              <p>支持触摸滑动切换和手势操作</p>
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-icon">⏱️</div>
            <div class="feature-content">
              <h4>自动播放</h4>
              <p>支持自动播放和鼠标悬停暂停</p>
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-icon">🖥️</div>
            <div class="feature-content">
              <h4>响应式设计</h4>
              <p>自适应不同屏幕尺寸</p>
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-icon">⌨️</div>
            <div class="feature-content">
              <h4>键盘导航</h4>
              <p>支持键盘左右键切换</p>
            </div>
          </div>
          <div class="feature-item">
            <div class="feature-icon">📍</div>
            <div class="feature-content">
              <h4>灵活配置</h4>
              <p>可配置指示器位置和切换效果</p>
            </div>
          </div>
        </div>
      </div>
      <div class="demo-section">
        <h2>轮播图过渡效果演示</h2>

        <!-- Slide 效果 -->
        <div class="carousel-container">
          <h3>Slide 效果（水平滑动）</h3>
          <Carousel :interval="3000" indicator-position="bottom" transition="slide" :autoplay="true"
            class="demo-carousel">

            <CarouselItem v-for="item in 25" :key="item">
              <div class="carousel-image-wrapper">
                <img :src="`./slides/${item}.png`" :alt="`Slide ${item}`">
              </div>
            </CarouselItem>

          </Carousel>
        </div>


        <!-- Fade 效果 -->
        <div class="carousel-container">
          <h3>Fade 效果（淡入淡出）</h3>
          <Carousel :interval="3000" indicator-position="bottom" transition="fade" :autoplay="true"
            class="demo-carousel">
            <CarouselItem v-for="item in 25" :key="item">
              <div class="carousel-image-wrapper">
                <img :src="`./slides/${item}.png`" :alt="`Slide ${item}`">
              </div>
            </CarouselItem>
          </Carousel>
        </div>
      </div>
    </template>

    <template #code>
      <div class="code-block-wrapper">
        <CodeBlock 
          lang="html" 
          :code="carouselCode" 
          class="carousel-code-block"
        />
      </div>
    </template>

  </PreviewBlock>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import MyBoutton from './components/common/Button/Button.vue';
import PreviewBlock from './components/layout/PreviewBlock/PreviewBlock.vue';
import CodeBlock from './components/layout/CodeBlock/CodeBlock.vue';
import Carousel from './components/data-display/Carousel/Carousel.vue';
import CarouselItem from './components/data-display/Carousel/CarouselItem.vue';
import './components/data-display/Carousel/styles/base.css';
import './components/data-display/Carousel/styles/transitions.css';

const count = ref(0);

const carouselCode = `
<!-- Slide 效果示例 -->
<Carousel 
  :interval="3000"
  indicator-position="bottom"
  transition="slide"
  :autoplay="true"
>
  <CarouselItem v-for="item in items" :key="item">
    <div class="carousel-image-wrapper">
      <img :src="item.src" :alt="item.alt">
    </div>
  </CarouselItem>
</Carousel>

<!-- Fade 效果示例 -->
<Carousel 
  :interval="3000"
  indicator-position="bottom"
  transition="fade"
  :autoplay="true"
>
  <CarouselItem v-for="item in items" :key="item">
    <div class="carousel-image-wrapper">
      <img :src="item.src" :alt="item.alt">
    </div>
  </CarouselItem>
</Carousel>

<!-- 可用的属性
:interval      - 自动播放间隔，默认 3000ms
:autoplay      - 是否自动播放，默认 true
:showArrows    - 是否显示箭头，默认 true
transition     - 过渡效果，可选 'slide' 或 'fade'
indicatorPosition - 指示器位置，可选 'top'、'bottom'、'left'、'right'
-->`.trim();
</script>
<style scoped>
.features-section {
  padding: 20px 0;
  background-color: var(--mc-bg-color);
}

.features-section h3 {
  text-align: center;
  color: var(--mc-text-primary);
  margin-bottom: 30px;
  font-size: 24px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 0 20px;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  padding: 15px;
  background: var(--mc-bg-color-page);
  border-radius: var(--mc-border-radius-base);
  transition: transform var(--mc-transition-duration), box-shadow var(--mc-transition-duration);
}

.feature-item:hover {
  transform: translateY(-2px);
  box-shadow: var(--mc-shadow-sm);
}

.feature-icon {
  font-size: 24px;
  margin-right: 15px;
  padding: 10px;
  background: var(--mc-bg-color-page);
  border-radius: var(--mc-border-radius-base);
  box-shadow: var(--mc-shadow-sm);
}

.feature-content h4 {
  margin: 0 0 5px;
  color: var(--mc-text-primary);
  font-size: 18px;
}

.feature-content p {
  margin: 0;
  color: var(--mc-text-secondary);
  font-size: 14px;
}

.demo-section {
  padding: 40px 20px;
  background-color: var(--mc-bg-color);
}

.demo-section h3 {
  text-align: center;
  color: var(--mc-text-primary);
  margin-bottom: 30px;
  font-size: 24px;
}

.carousel-container {
  width: 100%;
  max-width: 800px;
  margin: 2rem auto;
  overflow: hidden;
  border-radius: calc(var(--mc-border-radius-base) * 2);
  box-shadow: var(--mc-shadow-lg);
  background: var(--mc-gradient-light);
  border: 1px solid var(--mc-border-color);
  transition: all var(--mc-transition-duration) ease;
  padding: 1.5rem;
}

.code-block-wrapper {
  margin-top: 2rem;
  background: var(--mc-bg-color-page);
  border-radius: var(--mc-border-radius-lg);
  padding: 1rem;
  border: 1px solid var(--mc-border-color);
}

.carousel-code-block {
  --mc-bg-color-page: var(--mc-bg-color);
}

.carousel-container:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
}

.carousel-container h3 {
  color: var(--mc-text-primary);
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  text-align: center;
}

.demo-carousel {
  width: 100%;
  height: 350px;
}

.carousel-image-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: #9e2929; */
}

.carousel-image-wrapper img {
  width: 100% ;
  height: 100%;
  object-fit: contain;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .feature-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
  }

  .feature-item {
    padding: 12px;
  }

  .feature-icon {
    font-size: 20px;
    padding: 8px;
  }

  .feature-content h4 {
    font-size: 16px;
  }

  .feature-content p {
    font-size: 13px;
  }

  .demo-carousel {
    height: 300px;
  }
}

@media (max-width: 480px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }

  .demo-carousel {
    height: 200px;
  }

  .features-section h3,
  .demo-section h3 {
    font-size: 20px;
  }
}
</style>