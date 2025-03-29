<template>
  <div class="airline-partners-container">
    <h2 class="carousel-title">A DOOR TO DOOR TRAVEL EXPERIENCE | OUR AIRLINE PARTNERS</h2>

    <div class="carousel-wrapper">
      <div class="carousel-track" :style="carouselStyle">
        <div
            v-for="(logo, index) in doubledLogos"
            :key="index"
            class="carousel-item"
        >
          <div class="logo-wrapper">
            <img
                :src="logo"
                :alt="getLogo(logo)"
                class="airline-logo"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      airlineLogos: [
        '/assets/airlines/air-asia.svg',
        '/assets/airlines/bangkok.svg',
        '/assets/airlines/batik.svg',
        '/assets/airlines/emirates.svg',
        '/assets/airlines/air-arabia.svg',
        '/assets/airlines/azerbaijan.svg',
        '/assets/airlines/ethihad.svg',
        '/assets/airlines/flydubai.svg',
        '/assets/airlines/indigo.svg',
        '/assets/airlines/malaysia.svg',
        '/assets/airlines/maldivian.svg',
        '/assets/airlines/qatar.svg',
        '/assets/airlines/singapore.svg',
        '/assets/airlines/srilankan.svg',
        '/assets/airlines/turkish.svg',
        '/assets/airlines/us-bangla.svg',
        '/assets/airlines/wizz.svg'
      ],
      currentTranslate: 0,
      animationFrame: null
    }
  },
  computed: {
    doubledLogos() {
      // Duplicate logos to create seamless infinite scroll
      return [...this.airlineLogos, ...this.airlineLogos]
    },
    carouselStyle() {
      return {
        transform: `translateX(${this.currentTranslate}px)`,
        transition: 'transform linear'
      }
    }
  },
  mounted() {
    this.startInfiniteScroll()
  },
  beforeDestroy() {
    this.stopInfiniteScroll()
  },
  methods: {
    getLogo(path) {
      return path.split('/').pop().replace('.svg', '')
    },
    startInfiniteScroll() {
      const itemWidth = 220
      const totalWidth = this.airlineLogos.length * itemWidth

      const animate = () => {
        // Decrement translate to move left (slower speed)
        this.currentTranslate -= 0.5

        // Reset position when we've scrolled a full set of logos
        if (Math.abs(this.currentTranslate) >= totalWidth) {
          this.currentTranslate = 0
        }

        // Continue animation
        this.animationFrame = requestAnimationFrame(animate)
      }

      // Start the animation
      this.animationFrame = requestAnimationFrame(animate)
    },
    stopInfiniteScroll() {
      if (this.animationFrame) {
        cancelAnimationFrame(this.animationFrame)
      }
    }
  }
}
</script>

<style scoped>
.airline-partners-container {
  margin: 0 auto;
  padding: 2rem 0rem;
  text-align: center;
  position: relative;
}

.carousel-title {
  font-family: Arial, sans-serif;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.carousel-wrapper {
  position: relative;
  width: 100%;
  overflow: visible;
}

.carousel-track {
  display: flex;
  width: max-content;
  overflow: visible;
}

.carousel-item {
  flex: 0 0 200px;
  margin: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: visible;
}

.logo-wrapper {
  position: relative;
  width: 150px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;
}

.airline-logo {
  max-width: 150px;
  max-height: 100px;
  object-fit: contain;
  filter: grayscale(100%);
  transition: all 0.3s ease;
}

.carousel-item:hover .airline-logo {
  filter: grayscale(0%);
  transform: scale(1.1);
  z-index: 10;
  position: relative;
}

@media (max-width: 768px) {
  .carousel-title {
    font-size: 1.2rem;
  }

  .carousel-item {
    flex: 0 0 150px;
    margin: 0 5px;
  }

  .logo-wrapper {
    width: 100px;
    height: 80px;
  }

  .airline-logo {
    max-width: 100px;
    max-height: 80px;
  }
}

@media (max-width: 480px) {
  .carousel-title {
    font-size: 1rem;
  }

  .carousel-item {
    flex: 0 0 120px;
    margin: 0 3px;
  }

  .logo-wrapper {
    width: 80px;
    height: 60px;
  }

  .airline-logo {
    max-width: 80px;
    max-height: 60px;
  }
}
</style>