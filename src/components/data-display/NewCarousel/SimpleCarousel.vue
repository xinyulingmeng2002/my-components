<template>
  <div 
    class="multi-item-carousel-container" 
    ref="carousel"
    role="region"
    aria-label="多图轮播"
    @mouseenter="showArrows = true"
    @mouseleave="showArrows = false"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <!-- 图片轨道 -->
    <div
      class="multi-item-carousel-track"
      :style="{
        transform: `translate3d(${currentTranslate}px, 0, 0)`,
        transition: isTransitioning ? 'transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)' : 'none'
      }"
    >
      <!-- 轮播图片循环渲染 -->
      <div
        v-for="(image, index) in images"
        :key="index"
        class="multi-item-carousel-item"
        role="group"
        :aria-label="`第${index + 1}张，共${images.length}张图片`"
      >
        <img 
          :src="image" 
          :alt="`轮播图片 ${index + 1}`"
          class="carousel-image"
        />
      </div>
    </div>

    <!-- 导航箭头 -->
    <button 
      class="carousel-arrow left" 
      @click="prevSlide"
      aria-label="上一张"
      :disabled="isAtStart"
      :style="{ opacity: (showArrows || autoPlayActive) ? '1' : '0', visibility: (showArrows || autoPlayActive) ? 'visible' : 'hidden' }"
    >
      &lt;
    </button>
    <button 
      class="carousel-arrow right" 
      @click="nextSlide"
      aria-label="下一张"
      :disabled="isAtEnd"
      :style="{ opacity: (showArrows || autoPlayActive) ? '1' : '0', visibility: (showArrows || autoPlayActive) ? 'visible' : 'hidden' }"
    >
      &gt;
    </button>

    <!-- 指示器 -->
    <div class="multi-item-indicators">
      <span 
        v-for="(_, index) in totalSlides" 
        :key="index"
        class="indicator-dot"
        :class="{ active: currentSlide === index }"
        @click="goToSlide(index)"
        role="button"
        :aria-label="`跳转到第${index + 1}页，共${totalSlides}页`"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MultiItemCarousel',
  props: {
    images: {
      type: Array,
      required: true,
      default: () => []
    },
    visibleItems: {
      type: Number,
      default: 3,
      validator: value => value > 0
    },
    autoPlay: {    // 是否自动播放
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3000
    }
  },
  data() {
    return {
      currentTranslate: 0,
      currentSlide: 0, // 当前页索引
      itemWidth: 0,
      autoPlayTimer: null,
      isTransitioning: false, // 是否正在过渡
      showArrows: false, // 控制箭头显示隐藏的标志
      autoPlayActive: false,
      touchStartX: 0,
      touchDelta: 0
    };
  },
  computed: {
    totalSlides() {
      // 总页数 = 图片总数 - 可视数量 + 1
      return Math.max(1, this.images.length - this.visibleItems + 1);
    },
    isAtStart() {
      return this.currentSlide === 0;
    },
    isAtEnd() {
      return this.currentSlide >= this.totalSlides - 1;
    }
  },
  watch: {
    images() {
      this.currentSlide = 0;
      this.updateDimensions(); // 重新计算尺寸
      this.startAutoPlay();
    },
    visibleItems() {
      this.currentSlide = 0;
      this.updateDimensions();
    }
  },
  mounted() {
    this.updateDimensions();
    if (this.autoPlay) {
      this.startAutoPlay();
    }
    window.addEventListener('resize', this.updateDimensions);
  },
  beforeUnmount() {
    this.stopAutoPlay();
    window.removeEventListener('resize', this.updateDimensions);
  },
  methods: {
    updateDimensions() {
      this.$nextTick(() => {
        if (this.$refs.carousel) {
          this.itemWidth = this.$refs.carousel.offsetWidth / this.visibleItems;
          this.currentTranslate = - this.currentSlide * this.itemWidth;  // 更新当前偏移量
          const carousel = this.$refs.carousel;
          carousel.style.setProperty('--visible-items', this.visibleItems);
        }
      });
    },
    startAutoPlay() {
      console.log('startAutoPlay called');
      if (!this.autoPlay || this.totalSlides === 1) return; // 单页时不自动播放
      this.autoPlayActive = true;
      this.stopAutoPlay();
      this.autoPlayTimer = setInterval(() => {
        console.log('Auto-playing...');
        // 到达末尾时循环回第一页
        this.currentSlide >= this.totalSlides - 1 
          ? this.goToSlide(0) 
          : this.nextSlide();
      }, this.interval);
    },
    stopAutoPlay() {
      if (this.autoPlayTimer) {
        clearInterval(this.autoPlayTimer);
        this.autoPlayTimer = null;
        this.autoPlayActive = false;
      }
    },
    goToSlide(slideIndex) {
      if (this.isTransitioning || slideIndex === this.currentSlide) return;
      
      this.isTransitioning = true;
      this.currentSlide = slideIndex;
      this.currentTranslate = -this.currentSlide * this.itemWidth;
      
      setTimeout(() => {
        this.isTransitioning = false;
      }, 500);
    },
    nextSlide() {
      if (this.isTransitioning || this.isAtEnd) return;
      this.goToSlide(this.currentSlide + 1);
    },
    prevSlide() {
      if (this.isTransitioning || this.isAtStart) return;
      this.goToSlide(this.currentSlide - 1);
    },
    handleTouchStart(e) {
      this.touchStartX = e.touches[0].clientX;
      this.touchDelta = 0;
    },
    handleTouchMove(e) {
      if (this.touchStartX === 0) return;
      this.touchDelta = e.touches[0].clientX - this.touchStartX;
    },
    handleTouchEnd(e) {
      if (this.touchStartX === 0) return;
      const delta = e.changedTouches[0].clientX - this.touchStartX;
      if (Math.abs(delta) > 50) { // 滑动阈值
        delta > 0 ? this.prevSlide() : this.nextSlide();
      }
      this.touchStartX = 0;
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

.multi-item-carousel-container {
  max-width: 80%;
  height: 350px;
  margin: auto;
  display: flex;
  overflow: hidden;
  position: relative;
  font-family: 'Roboto', sans-serif;

}

.multi-item-carousel-track {
  display: flex;
  height: 90%;
  will-change: transform;

}

.multi-item-carousel-item {
  flex: 0 0 calc(100% / var(--visible-items));
  padding: 0 10px;
  box-sizing: border-box;
  transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);

}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: opacity 0.3s ease;
}

.carousel-arrow {
  position: absolute;
  top: 45%;
  transform: translateY(-50%);
  width: 45px;
  height: 45px;
  background: rgba(0, 0, 0, 0.2);
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.3s ease, visibility 0.3s ease; /* 添加过渡效果 */
}

.carousel-arrow:hover:not(:disabled) {
  background: rgba(0, 0, 0, 0.6);
  transform: scale(1.1) translateY(-50%);
}

.carousel-arrow:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.carousel-arrow.left {
  left: 15px;
}

.carousel-arrow.right {
  right: 15px;
}

.multi-item-indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
}

.indicator-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: rgba(83, 82, 82, 0.2);
  cursor: pointer;
  transition: all 0.3s;
}

.indicator-dot.active {
  background: rgb(122, 106, 189);
  transform: scale(1.3);
}
</style> 