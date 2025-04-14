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

    <!-- New WhatsApp Contact Section -->
    <div class="whatsapp-contact-section">
      <h3 class="booking-title">Want to book a flight?</h3>
      <a :href="whatsappLink" target="_blank" class="whatsapp-button">
        <span class="whatsapp-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
        </span>
        Contact Now
      </a>
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
      animationFrame: null,
      whatsappNumber: '+9607213030', // Replace with your actual WhatsApp number
      whatsappMessage: 'Hello! I would like to book a flight.'
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
    },
    whatsappLink() {
      const encodedMessage = encodeURIComponent(this.whatsappMessage);
      return `https://wa.me/${this.whatsappNumber}?text=${encodedMessage}`;
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
  padding: 2rem 0rem 0rem 0rem;
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
  margin-bottom: 3rem;
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

/* WhatsApp Contact Section Styles */
.whatsapp-contact-section {
  margin-top: 1rem;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.booking-title {
  font-family: Arial, sans-serif;
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #333;
}

.whatsapp-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: #25D366;
  color: white;
  padding: 12px 24px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(37, 211, 102, 0.3);
}

.whatsapp-button:hover {
  background-color: #128C7E;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(37, 211, 102, 0.4);
}

.whatsapp-icon {
  display: inline-flex;
  margin-right: 8px;
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

  .booking-title {
    font-size: 1.5rem;
  }

  .whatsapp-contact-section {
    padding: 1.5rem;
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

  .booking-title {
    font-size: 1.3rem;
  }

  .whatsapp-button {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
}
</style>