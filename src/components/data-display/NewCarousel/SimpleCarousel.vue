<template>
  <div 
    class="multi-item-carousel-container" 
    ref="carousel"
    role="region"
    aria-label="多图轮播"
  >
    <!-- 图片轨道 -->
    <div
      class="multi-item-carousel-track"
      :style="{
        transform: `translateX(${currentTranslate}px)`,
        transition: isTransitioning ? 'transform 0.3s ease' : 'none'
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
        />
      </div>
    </div>

    <!-- 导航箭头 -->
    <button 
      class="carousel-arrow left" 
      @click="prevSlide"
      aria-label="上一张"
      :disabled="isAtStart"
    >
      &lt;
    </button>
    <button 
      class="carousel-arrow right" 
      @click="nextSlide"
      aria-label="下一张"
      :disabled="isAtEnd"
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
        :aria-label="`跳转到第${index + 1}页`"
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
    autoPlay: {
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
      isTransitioning: false
    };
  },
  computed: {
    totalSlides() {
      // 总页数 = 图片总数 - 可视数量 + 1
      return Math.max(1, this.images.length - this.visibleItems + 2);
    },
    isAtStart() {
      return this.currentSlide === 0;
    },
    isAtEnd() {
      return this.currentSlide >= this.totalSlides - 1;
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
      if (this.$refs.carousel) {
        this.itemWidth = this.$refs.carousel.offsetWidth / this.visibleItems;
        this.currentTranslate = -this.currentSlide * this.itemWidth;
      }
    },
    startAutoPlay() {
      if (!this.autoPlay) return;
      this.stopAutoPlay();
      this.autoPlayTimer = setInterval(() => {
        if (!this.isAtEnd) {
          this.nextSlide();
        } else {
          this.goToSlide(0); // 循环回到第一页
        }
      }, this.interval);
    },
    stopAutoPlay() {
      if (this.autoPlayTimer) {
        clearInterval(this.autoPlayTimer);
        this.autoPlayTimer = null;
      }
    },
    goToSlide(slideIndex) {
      if (this.isTransitioning || slideIndex === this.currentSlide) return;
      
      this.isTransitioning = true;
      this.currentSlide = slideIndex;
      this.currentTranslate = -this.currentSlide * this.itemWidth;
      
      setTimeout(() => {
        this.isTransitioning = false;
      }, 300);
    },
    nextSlide() {
      if (this.isTransitioning || this.isAtEnd) return;
      this.goToSlide(this.currentSlide + 1);
    },
    prevSlide() {
      if (this.isTransitioning || this.isAtStart) return;
      this.goToSlide(this.currentSlide - 1);
    }
  }
};
</script>

<style scoped>
.multi-item-carousel-container {
  max-width: 80%;
  height: 400px;
  margin: auto;
  display: flex;
  overflow: hidden;
  position: relative;
}

.multi-item-carousel-track {
  display: flex;
  height: 100%;
  will-change: transform;
}

.multi-item-carousel-item {
  flex: 0 0 calc(100% / var(--visible-items, 3));
  padding: 0 10px;
  box-sizing: border-box;
  transition: transform 0.3s ease;
}

.multi-item-carousel-item img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.carousel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  font-size: 18px;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s;
}

.carousel-arrow:hover:not(:disabled) {
  background: rgba(0, 0, 0, 0.8);
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
  gap: 8px;
}

.indicator-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: all 0.3s;
}

.indicator-dot.active {
  background: white;
  transform: scale(1.2);
}
</style>
