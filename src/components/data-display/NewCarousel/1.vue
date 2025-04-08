<template>
    <div 
      class="multi-item-carousel-container" 
      ref="carousel"
      role="region"
      aria-label="多图轮播"
      @mouseenter="showArrows = true"
      @mouseleave="showArrows = false"
    >
      <!-- 图片轨道 -->
      <div
        class="multi-item-carousel-track"
        :style="{
          transform: `translateX(${currentTranslate}px)`,
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
        :style="{ opacity: showArrows ? '1' : '0', visibility: showArrows ? 'visible' : 'hidden' }"
      >
        &lt;
      </button>
      <button 
        class="carousel-arrow right" 
        @click="nextSlide"
        aria-label="下一张"
        :disabled="isAtEnd"
        :style="{ opacity: showArrows ? '1' : '0', visibility: showArrows ? 'visible' : 'hidden' }"
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
        isTransitioning: false, // 是否正在过渡
        showArrows: false // 控制箭头显示隐藏的标志
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
    mounted() {
      this.updateDimensions();
      this.updateOffset(); // 初始化偏移量
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
          this.currentTranslate = - this.currentSlide * this.itemWidth;  // 更新当前偏移量
          this.updateOffset(); // 尺寸改变时更新偏移量
        }
      },
      startAutoPlay() {
        if (!this.autoPlay) return;
        this.stopAutoPlay();
        this.autoPlayTimer = setInterval(() => {
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
        }
      },
      goToSlide(slideIndex) {
        if (this.isTransitioning || slideIndex === this.currentSlide) return;
        
        this.isTransitioning = true;
        this.currentSlide = slideIndex;
        this.currentTranslate = -this.currentSlide * this.itemWidth;
        this.updateOffset(); // 切换页面时更新偏移量
        
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
      updateOffset() {
        const items = this.$refs.carousel.querySelectorAll('.carousel-image');
        const centerIndex = Math.floor(this.visibleItems / 2);
        items.forEach((item, index) => {
          const offset = index - (this.currentSlide * this.visibleItems) - centerIndex;
          item.style.setProperty('--offset', offset);
        });
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
    perspective: 1500px; /* 设置透视效果，模拟曲面屏的景深 */
  }
  
  .multi-item-carousel-track {
    display: flex;
    height: 90%;
    will-change: transform;
    transform-style: preserve-3d; /* 保持子元素的3D变换 */
  }
  
  .multi-item-carousel-item {
    flex: 0 0 calc(100% / var(--visible-items, 4));
    padding: 0 10px;
    box-sizing: border-box;
    transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
    transform-origin: center; /* 设置变换的原点为中心 */
  }
  
  .carousel-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transition: opacity 0.3s ease;
    transform: rotateY(calc(var(--offset) * 15deg)) translateZ(50px); /* 根据偏移量旋转和位移 */
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