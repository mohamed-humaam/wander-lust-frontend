<!-- components/Hero.vue -->
<template>
  <div class="hero-section">
    <!-- Background Image Carousel -->
    <div class="hero-background">
      <div
          v-for="(image, index) in images"
          :key="index"
          class="hero-image"
          :class="{ active: currentImage === index }"
          :style="{ backgroundImage: `url(${image})` }"
      ></div>

      <!-- Image Controls -->
      <div class="image-controls">
        <button @click="prevImage" class="control-btn">❮</button>
        <div class="image-indicators">
          <span
              v-for="(image, index) in images"
              :key="index"
              :class="{ active: currentImage === index }"
              @click="setImage(index)"
          ></span>
        </div>
        <button @click="nextImage" class="control-btn">❯</button>
      </div>
    </div>

    <!-- Hero Content -->
    <div class="hero-content">
      <!-- Search Form Component -->
      <SearchForm @search="handleSearch" />
    </div>
  </div>
</template>

<script>
import SearchForm from './SearchForm.vue'

export default {
  components: {
    SearchForm
  },
  data() {
    return {
      images: [
        '/assets/images/hero/banner-1.jpg',
        '/assets/images/hero/banner-2.jpg',
        '/assets/images/hero/banner-3.jpg',
        '/assets/images/hero/banner-4.jpg',
        '/assets/images/hero/banner-5.jpg',
        '/assets/images/hero/banner-6.jpg',
        '/assets/images/hero/banner-7.jpg',
        '/assets/images/hero/banner-8.jpg',
        '/assets/images/hero/banner-9.jpg',
        '/assets/images/hero/banner-10.jpg',
      ],
      currentImage: 0,
      interval: null
    }
  },
  mounted() {
    this.startCarousel()
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  methods: {
    startCarousel() {
      this.interval = setInterval(() => {
        this.nextImage()
      }, 5000)
    },
    nextImage() {
      this.currentImage = (this.currentImage + 1) % this.images.length
    },
    prevImage() {
      this.currentImage = (this.currentImage - 1 + this.images.length) % this.images.length
    },
    setImage(index) {
      this.currentImage = index
      // Reset the interval when manually changing image
      clearInterval(this.interval)
      this.startCarousel()
    },
    handleSearch(searchData) {
      // Handle search logic or emit to parent component
      console.log('Search performed in Hero component:', searchData)
      // You can add further logic here, like navigating to search results
    }
  }
}
</script>

<style scoped>
/* Reset default margins and paddings */
html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.hero-section {
  position: relative;
  width: 100vw;
  height: 100vh;
  min-height: 600px;
  max-height: 800px;
  overflow: hidden;
  color: white;
  margin: 0;
  padding: 0;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.hero-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  z-index: 1;
}

.hero-image.active {
  opacity: 1;
}

.hero-image.active::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 125, 0, 0.3); /* Orange overlay with 30% transparency */
  z-index: 2;
}

.hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.4);
}

.image-controls {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 3;
}

.control-btn {
  background: rgba(255, 255, 255, 0.3);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.5);
}

.image-indicators {
  display: flex;
  gap: 8px;
}

.image-indicators span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: background 0.3s;
}

.image-indicators span.active {
  background: white;
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }

  .subheading {
    font-size: 1.2rem;
  }
}
</style>